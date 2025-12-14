import "dotenv/config";
// import { listIdx } from "./core/cyborgdb/listIdx";
// import { submitReport } from "./core/services/submitReport";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const _api = process.env.CYBORGDB_API_KEY || "no key";
const _supabaseKey = process.env.supabaseKey || "no key";
const _supabaseUrl = process.env.supabaseUrl || "no url";
const _supabase = createClient<Database>(_supabaseUrl, _supabaseKey);
// const res = await submitReport(
//   supabase,
//   "d0745525-cae8-474a-a58b-6e061430f998",
//   "title 1",
//   "description 1",
// );
