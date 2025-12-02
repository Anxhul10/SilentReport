import { Client } from 'cyborgdb';

export async function loadIdx() {
    const client = new Client({ baseUrl: 'http://localhost:8000', apiKey: process.env.CYBORGDB_API_KEY });
    // Use the same key that was used to create the index
    const indexKey = new Uint8Array(32); // Your stored 32-byte key
    // Or convert from hex: Buffer.from('your-hex-key', 'hex')

    try {
        const index = await client.loadIndex({ indexName: 'my-existing-index', indexKey });
        console.log('Index loaded successfully');
        
        // Now you can perform operations on the loaded index
        const results = await index.query({ queryVectors: [0.1, 0.2, 0.3], topK: 5 });
        console.log('Query results:', results);
    } catch (error) {
        console.error('Failed to load index:', error);
    }
}
