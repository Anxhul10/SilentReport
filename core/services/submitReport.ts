import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.supabaseUrl || "no key";
const supabaseKey: string = process.env.supabaseKey || "no key";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function submitReport(
  user_id: string,
  title: string,
  description: string,
) {
  try {
    const { data } = await supabase
      .from("reports")
      .insert({ title, description, created_by: user_id })
      .select();
    if (data) {
      return { status: 200 };
    }
    return { status: 400 };
  } catch (error) {
    console.log(error);
  }
}
