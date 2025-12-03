import { createClient } from "@supabase/supabase-js";
import { type User } from "../types/user.ts";

export async function createUser(
  supabaseKey: string,
  supabaseUrl: string,
  userData: User,
) {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  });
  if (error) {
    throw error;
  }
  return data;
}
