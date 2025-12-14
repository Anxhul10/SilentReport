import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.supabaseUrl || "no key";
const supabaseKey: string = process.env.supabaseKey || "no key";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function search(query: string) {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select()
      .ilike("title", query);
    return data;
  } catch (error) {
    console.log(error);
  }
}
