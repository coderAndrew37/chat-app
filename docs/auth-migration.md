npm install @supabase/supabase-js @supabase/ssr date-fns

```

---

## 🚀 Setup Steps

**1. Run the SQL migration** — paste `supabase-migration.sql` into your Supabase SQL Editor. It creates:
- `profiles`, `conversations`, `messages` tables with proper constraints
- Row Level Security policies (users can only read/write their own conversations)
- Realtime enabled on `messages` and `conversations`
- Auto-bumps `conversations.updated_at` via trigger on every new message

**2. Add env vars** — copy `.env.local.example` → `.env.local` and fill in your Supabase URL + anon key from your project dashboard.

**3. Drop the files into your project** alongside the existing homepage components from v1.

---

## 🔁 User Flow
```

Guest clicks "Chat Now" on a profile
→ Not logged in → Register modal opens (with redirectTo="/chat")
→ After signup → automatically pushed to /chat

Already logged in → "Chat Now" → directly to /chat

/chat is protected by middleware.ts → redirects to / if no session

## 🔁 User Flow

```
Guest clicks "Chat Now" on a profile
  → Not logged in → Register modal opens (with redirectTo="/chat")
  → After signup → automatically pushed to /chat

Already logged in → "Chat Now" → directly to /chat

/chat is protected by middleware.ts → redirects to / if no session
```

🏗️ Architecture
FilePurposelib/supabase/client.tsBrowser-side Supabase client (singleton)lib/supabase/server.tsServer-side client (for Server Components/Actions)middleware.tsSession refresh + protects /chat/\* routescontext/AuthContext.tsxGlobal auth state: user, session, profilehooks/useConversations.tsFetches conversations list + realtime updateshooks/useMessages.tsFetches messages for a convo + realtime subscriptionutils/getOrCreateConversation.tsIdempotent "start a chat" helperapp/chat/page.tsxResponsive split-view: sidebar + chat window
