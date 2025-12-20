import { listIdx } from "@/core/cyborgdb/listIdx";

export async function checkIdxExists(indexName: string) {
  const idxs = (await listIdx()) ?? ["empty"];
  for (const idx of idxs) {
    console.log(idx);
    if (indexName === idx) {
      return { result: true };
    }
  }
  return { result: false };
}
