import "dotenv/config";
import { Client } from "cyborgdb";

export async function listIdx(apiKey: string) {
  const client = new Client({ baseUrl: "http://localhost:8000", apiKey });
  try {
    const indexes = await client.listIndexes();
    console.log("Available indexes:", indexes);
    // Output: ['my_vector_index', 'semantic_search', 'document_embeddings']

    if (indexes.length === 0) {
      console.log("No indexes found. Create your first index!");
    } else {
      console.log(`Found ${indexes.length} indexes`);
    }
  } catch (error) {
    console.error("Failed to list indexes:", error);
  }
}
