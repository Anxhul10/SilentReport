import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.supabaseUrl || "no key";
const supabaseKey: string = process.env.supabaseKey || "no key";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getReport() {
  try {
    const { data } = await supabase.from("reports").select();
    return data;
  } catch (error) {
    console.log(error);
  }
}
