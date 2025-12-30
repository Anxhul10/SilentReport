import "dotenv/config";
import { Client, GetResultItem } from "cyborgdb";

export async function get(
  indexKeyBase64: string,
  indexName: string,
  ids: Array<string>,
): Promise<GetResultItem[] | undefined> {
  const client = new Client({
    baseUrl: process.env.baseURL ?? "",
    apiKey: process.env.CYBORGDB_API_KEY,
  });
  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const index = await client.loadIndex({ indexName, indexKey });
  try {
    const vectors: GetResultItem[] = await index.get({ ids });
    return vectors;
  } catch (error) {
    console.error("Content search failed:", error);
  }
}
