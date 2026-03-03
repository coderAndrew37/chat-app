-- ============================================================
-- Chat254 — Supabase Database Setup (Updated & Fixed)
-- ============================================================

-- 1. ENUM for gender
DO $$ BEGIN
    CREATE TYPE gender AS ENUM ('male', 'female', 'other');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  age         INT NOT NULL CHECK (age >= 18 AND age <= 99),
  gender      gender NOT NULL,
  city        TEXT,
  avatar_url  TEXT,
  bio         TEXT,
  is_online   BOOLEAN NOT NULL DEFAULT FALSE,
  last_seen   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for last_seen
CREATE OR REPLACE FUNCTION update_last_seen()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_online = FALSE AND OLD.is_online = TRUE THEN
    NEW.last_seen = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_profile_online_change ON public.profiles;
CREATE TRIGGER on_profile_online_change
  BEFORE UPDATE OF is_online ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_last_seen();

-- 3. CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS public.conversations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_one UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  participant_two UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- THE FIX: Unique Index instead of Constraint
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_conversation_pair 
ON public.conversations (
  (LEAST(participant_one, participant_two)), 
  (GREATEST(participant_one, participant_two))
);

CREATE INDEX IF NOT EXISTS idx_conversations_participant_one ON public.conversations (participant_one);
CREATE INDEX IF NOT EXISTS idx_conversations_participant_two ON public.conversations (participant_two);

-- 4. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id  UUID NOT NULL REFERENCES public.conversations (id) ON DELETE CASCADE,
  sender_id        UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  content          TEXT NOT NULL CHECK (char_length(content) >= 1 AND char_length(content) <= 2000),
  is_read          BOOLEAN NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages (conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages (sender_id);

-- 5. AUTO-UPDATE updated_at
CREATE OR REPLACE FUNCTION bump_conversation_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.conversations
  SET updated_at = NOW()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_message_insert ON public.messages;
CREATE TRIGGER on_message_insert
  AFTER INSERT ON public.messages
  FOR EACH ROW EXECUTE FUNCTION bump_conversation_updated_at();

-- 6. RLS POLICIES (Simplified for clarity)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, private write
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Conversations: Viewable only by participants
CREATE POLICY "Participants can view conversations" ON public.conversations 
FOR SELECT USING (auth.uid() = participant_one OR auth.uid() = participant_two);

CREATE POLICY "Participants can create conversations" ON public.conversations 
FOR INSERT WITH CHECK (auth.uid() = participant_one OR auth.uid() = participant_two);

-- Messages: Only participants can read/write
CREATE POLICY "Participants can view messages" ON public.messages 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.conversations 
    WHERE id = conversation_id AND (participant_one = auth.uid() OR participant_two = auth.uid())
  )
);

CREATE POLICY "Participants can send messages" ON public.messages 
FOR INSERT WITH CHECK (
  auth.uid() = sender_id AND
  EXISTS (
    SELECT 1 FROM public.conversations 
    WHERE id = conversation_id AND (participant_one = auth.uid() OR participant_two = auth.uid())
  )
);

-- 7. ENABLE REALTIME
-- Check if publication exists before adding tables
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    CREATE PUBLICATION supabase_realtime;
  END IF;
END $$;

ALTER PUBLICATION supabase_realtime ADD TABLE public.messages, public.conversations;

-- 8. HELPER FUNCTION: Get or Create
CREATE OR REPLACE FUNCTION get_or_create_conversation(user_a UUID, user_b UUID)
RETURNS UUID AS $$
DECLARE
  conv_id UUID;
BEGIN
  -- Try to find existing
  SELECT id INTO conv_id
  FROM public.conversations
  WHERE (participant_one = user_a AND participant_two = user_b)
     OR (participant_one = user_b AND participant_two = user_a)
  LIMIT 1;

  -- If not found, insert with conflict handling
  IF conv_id IS NULL THEN
    INSERT INTO public.conversations (participant_one, participant_two)
    VALUES (user_a, user_b)
    ON CONFLICT ((LEAST(participant_one, participant_two)), (GREATEST(participant_one, participant_two)))
    DO UPDATE SET updated_at = NOW()
    RETURNING id INTO conv_id;
  END IF;

  RETURN conv_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;