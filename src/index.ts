import * as dotenv from "dotenv";
import { Client, type HealthResponse } from "cyborgdb";
import { CreateIndex } from "./utils/CreateIndex.ts";

// dotenv.config();

// const localClient = new Client({ baseUrl: 'http://localhost:8000', apiKey: process.env.CYBORGDB_API_KEY });

// try {
//     const health: HealthResponse = await localClient.getHealth();
//     console.log('Service health status:', health);
//     console.log('Status:', health.status);
// } catch (error: any) {
//     console.error('Health check failed:', error.message);
// }

CreateIndex();
