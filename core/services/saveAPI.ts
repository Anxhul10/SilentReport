import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.supabaseUrl || "no key";
const supabaseKey: string = process.env.supabaseKey || "no key";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveAPI(API: string, user_id: string) {
  try {
    const { data, error } = await supabase
      .from("cyborg_api")
      .insert({ api: API, user_id })
      .select();
    if (data) {
      return { status: 200 };
    } else if (error.code === "23505") {
      // server error : user already has api key
      return { status: 500 };
    }
    return { status: 400 };
  } catch (error) {
    console.log(error);
  }
}
