import { Client } from 'cyborgdb';

export async function deleteIdx(apiKey: string, key2Delete: Uint8Array, indexName: string) {
    // Create a client
    const client = new Client({ 
        baseUrl: 'http://localhost:8000', 
        apiKey
    });
    const indexKey = key2Delete;

    const index = await client.loadIndex({ 
        indexName, 
        indexKey
    });

    await index.deleteIndex();
}
