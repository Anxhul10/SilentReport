import { Client, type IndexIVFFlat } from "cyborgdb";

export async function CreateIndex() {
  const client = new Client({
    baseUrl: "http://localhost:8000",
    apiKey: "cyborg_b2d0dc39206e4613be7d7fdbf42d7060",
    verifySsl: false,
  });
  const indexName = "semantic_search_index";
  const indexKey: Uint8Array = client.generateKey();

  const indexConfig: IndexIVFFlat = {
    type: "ivfflat",
    dimension: 384,
  };

  try {
    const _index = await client.createIndex({
      indexName,
      indexKey,
      indexConfig,
      embeddingModel: "all-MiniLM-L6-v2", // Embedding model
    });
  } catch (error) {
    console.error("Index creation failed:", error);
  }
}
