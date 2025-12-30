import "dotenv/config";
import { Client } from "cyborgdb";

export async function listIdx(): Promise<Array<string> | undefined> {
  const client = new Client({
    baseUrl: process.env.baseURL ?? "",
    apiKey: process.env.CYBORGDB_API_KEY,
  });
  try {
    const indexes = await client.listIndexes();
    if (indexes.length === 0) {
      return undefined;
    }
    return indexes;
  } catch (error) {
    console.error("Failed to list indexes:", error);
  }
}
