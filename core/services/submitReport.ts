import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { upsert } from "@/core/cyborgdb/upsert";
import { checkIdxExists } from "@/core/cyborgdb/checkIdxExists";
import { createIdx } from "@/core/cyborgdb/createIdx";

const supabaseUrl: string = process.env.supabaseUrl || "no key";
const supabaseKey: string = process.env.supabaseKey || "no key";
const _supabase = createClient(supabaseUrl, supabaseKey);

export async function submitReport(
  user_id: string,
  title: string,
  description: string,
  visibility: string,
  _timeLimit?: string,
) {
  try {
    if (process.env.reports === undefined) {
      console.log("please enter reports: indexKeyBase64 value in .env ");
    }
    const indexExists = await checkIdxExists("reports");
    if (!indexExists.result) {
      const indexKeyBase64 = await createIdx("reports");
      console.log("save this in env " + indexKeyBase64);
    }
    // check if reports index already exists
    const items = [
      {
        id: user_id,
        contents: `${title} ${description}`,
        metadata: {
          title,
          description,
          visibility,
        },
      },
    ];
    await upsert(process.env.reports!, "reports", items);
    return { status: 200 };
  } catch (error) {
    console.log(error);
  }
}
