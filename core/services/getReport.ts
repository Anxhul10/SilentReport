import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.supabaseUrl || "no key";
const supabaseKey = process.env.supabaseKey || "no key";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getReport(user_id: string) {
  try {
    const { data } = await supabase.from("reports").select();

    const res: Array<Object> = [];
    if (data) {
      for (const obj of data) {
        if (obj.created_by === user_id) {
          res.push(obj);
        }
      }
    }
    return res;
  } catch (error) {
    console.log(error);
  }
}
