import "dotenv/config";
import { Client } from "cyborgdb";

interface IIndex {
  message: string;
  indexKeyBase64: string;
}
const client = new Client({
  baseUrl: process.env.baseURL ?? "",
  apiKey: process.env.CYBORGDB_API_KEY,
});
export async function createIdx(
  indexName: string,
): Promise<IIndex | undefined> {
  const indexKey: Uint8Array = client.generateKey();
  const indexKeyBase64 = Buffer.from(indexKey).toString("base64");
  try {
    const _index = await client.createIndex({
      indexName,
      indexKey,
    });
    return { message: "Index created successfully", indexKeyBase64 };
  } catch (error) {
    console.error("Failed to create index:", error);
  }
}
