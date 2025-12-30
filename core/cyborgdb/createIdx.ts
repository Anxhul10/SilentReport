import "dotenv/config";
import { Client } from "cyborgdb";

interface IIndex {
  message: string;
  indexKeyBase64: string;
}

export async function createIdx(
  indexName: string,
): Promise<IIndex | undefined> {
  const client = new Client({
    baseUrl: process.env.baseURL ?? "",
    apiKey: process.env.CYBORGDB_API_KEY,
  });
  const indexKey: Uint8Array = client.generateKey();
  const indexKeyBase64 = Buffer.from(indexKey).toString("base64");
  try {
    await client.createIndex({
      indexName,
      indexKey,
      indexConfig: {
        type: "ivf",
        dimension: 768,
      },
      embeddingModel: "sentence-transformers/all-mpnet-base-v2",
    });
    // save key and code on url
    return { message: "Index created successfully", indexKeyBase64 };
  } catch (error) {
    console.error("Failed to create index:", error);
  }
}

const idxName = "reports";
const res = await createIdx(idxName);
console.log("#######################################################");
console.log(res);
console.log("#######################################################");
