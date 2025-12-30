import "dotenv/config";
import { Client } from "cyborgdb";

interface IDeleteIdx {
  status?: string;
  message: string | undefined;
}
export async function deleteIdx(
  indexKeyBase64: string,
  indexName: string,
): Promise<IDeleteIdx | undefined> {
  const client = new Client({
    baseUrl: process.env.baseURL ?? "",
    apiKey: process.env.CYBORGDB_API_KEY,
  });
  try {
    const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
    const index = await client.loadIndex({
      indexName,
      indexKey,
    });

    return await index.deleteIndex();
  } catch (error) {
    console.log(error);
  }
}
