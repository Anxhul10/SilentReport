import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.supabaseUrl || "no key";
const supabaseKey: string = process.env.supabaseKey || "no key";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getAPI(user_id: string) {
  try {
    const { data, error } = await supabase
      .from("cyborg_api")
      .select("user_id, api")
      .eq("user_id", user_id);

    if (error === null) {
      return { status: 200, api: data[0].api };
    }
    return { status: 400 };
  } catch (error) {
    console.log(error);
  }
}
