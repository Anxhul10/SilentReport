import { Client, type HealthResponse } from 'cyborgdb';

export async function getHealth() {
    const client = new Client({ baseUrl: 'http://localhost:8000', apiKey: process.env.CYBORGDB_API_KEY });

    try {
        const health: HealthResponse = await client.getHealth();
        console.log('Service health status:', health);
        console.log('Status:', health.status);
        // Typical output: { status: 'healthy', api_version: 'v1', version: '1.2.3' }
    } catch (error) {
        console.error('Health check failed:', error);
    }
}
