import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.supabaseUrl || "no key";
const supabaseKey: string = process.env.supabaseKey || "no key";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getEmail(user_id: string) {
  const { data, error } = await supabase.auth.admin.getUserById(user_id);
  if (error) {
    return { status: 200, email: undefined };
  }
  return { status: 200, email: data.user?.email };
}
