import { Database } from "@/database.types";
import { type SupabaseClient } from "@supabase/supabase-js";

export async function submitReport(
  supabase: SupabaseClient<Database>,
  user_id: string,
  title: string,
  description: string,
) {
  try {
    const { data } = await supabase
      .from("reports")
      .insert({ title, description, created_by: user_id })
      .select();
    return data;
  } catch (error) {
    console.log(error);
  }
}
