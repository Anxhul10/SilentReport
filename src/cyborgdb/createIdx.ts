import { Client } from 'cyborgdb';

export async function createIdx() {
    const client = new Client({ baseUrl: 'http://localhost:8000', apiKey: process.env.CYBORGDB_API_KEY });

    const indexName = "my_vector_index";
    const indexKey: Uint8Array = client.generateKey(); // Generate secure 32-byte key

    try {
        const index = await client.createIndex({
            indexName,
            indexKey
        });
        console.log('Index created successfully:', index);
    } catch (error) {
        console.error('Failed to create index:', error);
    }
}
