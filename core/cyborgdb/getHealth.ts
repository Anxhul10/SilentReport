import "dotenv/config";
import { Client, type HealthResponse } from "cyborgdb";

export async function getHealth(): Promise<HealthResponse | undefined> {
  const client = new Client({
    baseUrl: process.env.baseURL ?? "",
    apiKey: process.env.CYBORGDB_API_KEY,
  });
  try {
    const health: HealthResponse = await client.getHealth();
    return health;
    // Typical output: { status: 'healthy', api_version: 'v1', version: '1.2.3' }
  } catch (error) {
    console.error("Health check failed:", error);
  }
}
