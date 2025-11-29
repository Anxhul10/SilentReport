import { Client, type IndexIVFFlat } from "cyborgdb";

export async function CreateIndex() {
  const client = new Client({
    baseUrl: "http://localhost:8000",
    apiKey: process.env.CYBORGDB_API_KEY,
    verifySsl: false,
  });
  const indexName = "semantic_search_index";
  const indexKey: Uint8Array = client.generateKey();

  const indexConfig: IndexIVFFlat = {
    type: "ivfflat",
    dimension: 384,
  };

  try {
    const index = await client.createIndex({
      indexName,
      indexKey,
      indexConfig,
      embeddingModel: "all-MiniLM-L6-v2", // Embedding model
    });
    console.log(index)
  } catch (error) {
    console.error("Index creation failed:", error);
  }
}
