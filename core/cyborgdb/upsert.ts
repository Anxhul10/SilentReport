import "dotenv/config";
import { Client } from "cyborgdb";

interface IUpsert {
  status: string;
  message?: string;
}
interface IItems {
  id: string;
  contents: string;
  metadata: {
    title?: string;
    description?: string;
    timeLimit?: string;
    visibility?: string;
  };
}

export async function upsert(
  indexKeyBase64: string,
  indexName: string,
  items: IItems[],
): Promise<IUpsert | undefined> {
  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const client = new Client({
    baseUrl: process.env.baseURL ?? "",
    apiKey: process.env.CYBORGDB_API_KEY,
  });
  const index = await client.loadIndex({
    indexName,
    indexKey,
  });
  try {
    const result = await index.upsert({
      items,
    });
    console.log("Text-only upsert successful");
    return result;
  } catch (error) {
    console.error("Upsert failed ", error);
  }
}
