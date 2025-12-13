import { createClient } from "@supabase/supabase-js";

export async function loginUser(
  supabaseUrl: string,
  supabaseKey: string,
  email: string,
  password: string,
) {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  const _dump = error;
  return {
    user: data.user,
    token: data.session?.access_token,
  };
}
// wronng {"user":null,"session":null}
// right user.full
