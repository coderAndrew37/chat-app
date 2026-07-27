-- Safe trigger function to prevent 500 error on duplicate username/id
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, phone, country, is_activated)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'country',
    false
  )
  ON CONFLICT (id) DO UPDATE SET
    username = EXCLUDED.username,
    phone = EXCLUDED.phone,
    country = EXCLUDED.country;
  RETURN new;
EXCEPTION WHEN OTHERS THEN
  -- Catch error silently so auth.signUp doesn't return 500
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Ensure the 'phone' column exists on the profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone TEXT;

-- 2. Add a UNIQUE constraint on the phone column (if not already added)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'profiles_phone_key'
  ) THEN
    ALTER TABLE public.profiles 
    ADD CONSTRAINT profiles_phone_key UNIQUE (phone);
  END IF;
END $$;

-- 3. Reload the PostgREST schema cache immediately
NOTIFY pgrst, 'reload schema';