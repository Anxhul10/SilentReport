import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.supabaseUrl || "no key";
const supabaseKey = process.env.supabaseKey || "no key";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getReport() {
  try {
    const { data } = await supabase.from("reports").select();
    return data;
  } catch (error) {
    console.log(error);
  }
}
