import { createClient } from "@supabase/supabase-js";

export async function loginUser(
  supabaseUrl: string,
  supabaseKey: string,
  email: string,
  password: string,
) {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (!error) {
    return { status: "valid" };
  }
  return { status: "invalid" };
}
