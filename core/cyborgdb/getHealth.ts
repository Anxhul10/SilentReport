import { Client, type HealthResponse } from "cyborgdb";

export async function getHealth(apiKey: string): Promise<HealthResponse> {
  const client = new Client({ baseUrl: "http://localhost:8000", apiKey });
  try {
    if (!apiKey)
      throw new Error("CYBORGDB_APIKEY environment variable not set");
    const health: HealthResponse = await client.getHealth();
    return health;
  } catch (error) {
    throw error;
  }
}
