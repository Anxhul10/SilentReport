import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { ISearch } from "@/types/Search";

const supabaseUrl: string = process.env.supabaseUrl || "no key";
const supabaseKey: string = process.env.supabaseKey || "no key";

const supabase = createClient(supabaseUrl, supabaseKey);

// query : `%${string}%`
export async function search(query: string): Promise<ISearch[]> {
  const { data, error } = await supabase
    .from("reports")
    .select()
    .ilike("title", query);
  if (error) {
    console.error("error message: core/services/search.ts" + error);
  }
  return data ?? [];
}
