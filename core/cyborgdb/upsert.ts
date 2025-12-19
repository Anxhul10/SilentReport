import "dotenv/config";
import { Client, VectorItem, UpsertResponse } from "cyborgdb";

const client = new Client({
  baseUrl: process.env.baseURL ?? "",
  apiKey: process.env.CYBORGDB_API_KEY,
});

interface IUpsert {
  status: string;
  message?: string;
}

export async function upsert(
  indexKeyBase64: string,
  indexName: string,
  vectorItems: VectorItem[],
): Promise<IUpsert | undefined> {
  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const index = await client.loadIndex({ indexName, indexKey });
  try {
    const result: UpsertResponse = await index.upsert({ items: vectorItems });
    return result;
  } catch (error: any) {
    console.error("Upsert failed:", error.message);
  }
}
