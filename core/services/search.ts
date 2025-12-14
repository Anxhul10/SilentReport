import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.supabaseUrl || "no key";
const supabaseKey: string = process.env.supabaseKey || "no key";

const supabase = createClient(supabaseUrl, supabaseKey);
interface ISearch {
  id: number;
  inserted_at: string;
  title: string;
  created_by: string;
  description: string;
}

export async function search(query: `%${string}%`): Promise<ISearch[]> {
  const { data, error } = await supabase
    .from("reports")
    .select()
    .ilike("title", query);
  if (error) {
    console.error("error message: core/services/search.ts" + error);
  }
  return data ?? [];
}
