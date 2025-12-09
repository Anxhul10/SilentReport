import { createClient } from "@supabase/supabase-js";

export async function signUp(
  supabaseUrl: string,
  supabaseKey: string,
  email: string,
  password: string,
) {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  const _dump = data;
  if (error) {
    return { status: 400 };
  }
  return { status: 200 };
}
// 429 rate limit
// 422 weak password
// 400 invalid email
// null account already there
// user == null email dont exist
// user != null email created go to verify
