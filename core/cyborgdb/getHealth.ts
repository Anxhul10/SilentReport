import "dotenv/config";
import { Client, type HealthResponse } from "cyborgdb";

const apiKey = process.env.CYBORGDB_APIKEY || "no key";
const client = new Client({ baseUrl: "http://localhost:8000", apiKey });

export async function getHealth(): Promise<HealthResponse> {
  try {
    const health: HealthResponse = await client.getHealth();
    return health;
  } catch (error) {
    throw error;
  }
}
