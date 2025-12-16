import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.supabaseUrl || "no key";
const supabaseKey: string = process.env.supabaseKey || "no key";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function updateReport(
  report_id: string,
  title: string,
  description: string,
  visibility: string,
) {
  try {
    const { error } = await supabase
      .from("reports")
      .update({ title, visibility, description })
      .eq("id", report_id);
    if (error === null) {
      return { status: 200 };
    }
    return { status: 400 };
  } catch (error) {
    console.log(error);
  }
}
