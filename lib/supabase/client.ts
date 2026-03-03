import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database"; // Path to your types file

export const createClient = () => {
  // Pass the <Database> generic here
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
};
