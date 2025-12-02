import "dotenv/config";
import { listIdx } from "./src/cyborgdb/listIdx.ts";

const api = process.env.CYBORGDB_API_KEY || "no key";
const _supabaseKey = process.env.supabaseKey || "no key";
const _supabaseUrl = process.env.supabaseUrl || "no url";

await listIdx(api);
