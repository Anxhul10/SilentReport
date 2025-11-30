import { Client, type HealthResponse } from "cyborgdb";

export async function healthCheck(): Promise<void> {
  const localClient = new Client({
    baseUrl: "http://localhost:8000",
    apiKey: process.env.CYBORGDB_API_KEY,
  });

  try {
    const health: HealthResponse = await localClient.getHealth();
    console.log("Service health status:", health);
    console.log("Status:", health.status);
  } catch (error) {
    console.error("Health check failed:", error);
  }
}
