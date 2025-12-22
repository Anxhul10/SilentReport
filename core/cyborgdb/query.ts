import "dotenv/config";
import { Client, QueryResponse } from "cyborgdb";

const client = new Client({
  baseUrl: process.env.baseURL ?? "",
  apiKey: process.env.CYBORGDB_API_KEY,
});

export async function query(
  indexKeyBase64: string,
  indexName: string,
  queryContents: string,
): Promise<QueryResponse | undefined> {
  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const index = await client.loadIndex({ indexName, indexKey });
  try {
    const results = await index.query({
      queryContents,
      topK: 5,
      include: ["distance", "metadata", "contents"],
    });

    return results;
  } catch (error) {
    console.error("Content search failed:", error);
  }
}

const res = await query(process.env.indexKeyBase64!, 'reports', 'Patient')
console.log(JSON.stringify(res));
