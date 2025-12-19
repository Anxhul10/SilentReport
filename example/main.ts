// to use this add cyborgdb credentials at terminal gist.
import "dotenv/config";
import { Client } from "cyborgdb";
import { VectorItem, UpsertResponse } from "cyborgdb";

const apiKey = process.env.CYBORGDB_API_KEY || "no key";
const vectorItems: VectorItem[] = [
    {
        id: 'doc1',
        vector: [0.1, 0.2, 0.3, /* ... additional dimensions */],
        contents: 'This is the content of the first document',
        metadata: {
            title: 'Introduction to Machine Learning',
            author: 'Dr. Smith',
            category: 'education',
            tags: ['ml', 'ai', 'tutorial'],
            published_date: '2024-01-15',
            word_count: 1250
        }
    },
    {
        id: 'doc2',
        vector: [0.4, 0.5, 0.6, /* ... additional dimensions */],
        contents: 'This is the content of the second document',
        metadata: {
            title: 'Advanced Neural Networks',
            author: 'Dr. Jones',
            category: 'research',
            tags: ['neural-networks', 'deep-learning'],
            published_date: '2024-01-20',
            word_count: 2100
        }
    }
];
const client = new Client({ baseUrl: "http://localhost:8000", apiKey });
const indexKy =  [// temp
    231, 198,  67, 170, 255,  14, 109,   6,
    214, 106,  30, 220, 204,  98, 212,  24,
    228, 157, 252,  91, 202, 242,  54, 109,
    194,  40, 225, 160, 150,  87, 199,  17
]

export async function createIdx(indexName: string) {
  const indexKey: Uint8Array = client.generateKey(); // Generate secure 32-byte key
    const indexKeyBase64 = Buffer.from(indexKey).toString("base64");
  try {
    const index = await client.createIndex({
      indexName,
      indexKey,
    });
    console.log("Index created successfully:", index);
    console.log("SAVE THIS KEY:", indexKeyBase64);
  } catch (error) {
    console.error("Failed to create index:", error);
  }
}
export async function listIndex() {
  try {
    const indexes = await client.listIndexes();
    console.log("Available indexes:", indexes);
    // Output: ['my_vector_index', 'semantic_search', 'document_embeddings']

    if (indexes.length === 0) {
      console.log("No indexes found. Create your first index!");
    } else {
      console.log(`Found ${indexes.length} indexes`);
    }
  } catch (error) {
    console.error("Failed to list indexes:", error);
  }
}

async function upsert() {
  // Load an existing index
  const indexKey = new Uint8Array(Buffer.from("your-stored-hex-key", "hex"));
  const index = await client.loadIndex({
    indexName: "my-vector-index",
    indexKey,
  });

  // Prepare vector items with rich metadata
  const vectorItems: VectorItem[] = [
    {
      id: "doc1",
      vector: [0.1, 0.2, 0.3 /* ... additional dimensions */],
      contents: "This is the content of the first document",
      metadata: {
        title: "Introduction to Machine Learning",
        author: "Dr. Smith",
        category: "education",
        tags: ["ml", "ai", "tutorial"],
        published_date: "2024-01-15",
        word_count: 1250,
      },
    },
    {
      id: "doc2",
      vector: [0.4, 0.5, 0.6 /* ... additional dimensions */],
      contents: "This is the content of the second document",
      metadata: {
        title: "Advanced Neural Networks",
        author: "Dr. Jones",
        category: "research",
        tags: ["neural-networks", "deep-learning"],
        published_date: "2024-01-20",
        word_count: 2100,
      },
    },
  ];

  // Upsert vectors
  try {
    const result: UpsertResponse = await index.upsert({ items: vectorItems });
    console.log("Upsert result:", result);
    console.log(`Status: ${result.status}`);
    console.log(`Upserted count: ${result.upsertedCount}`);

    console.log(
      `Successfully added ${vectorItems.length} vectors to the index`,
    );
  } catch (error: any) {
    console.error("Upsert failed:", error.message);
  }
}

// const indexName = "first index"
// await createIdx(apiKey, indexName);
// await createIdx('second index');
export async function loadIndex() {
  // Use the same key that was used to create the index
  const indexKey = new Uint8Array(32); // Your stored 32-byte key
  // Or convert from hex: Buffer.from('your-hex-key', 'hex')

  try {
    const index = await client.loadIndex({
      indexName: "first index",
      indexKey,
    });
    console.log("Index loaded successfully");

    // Now you can perform operations on the loaded index
    const results = await index.query({
      queryVectors: [0.1, 0.2, 0.3],
      topK: 5,
    });
    console.log("Query results:", results);
  } catch (error) {
    console.error("Failed to load index:", error);
  }
}
async function runner() {
// VcMePkmjKzOX8NX8U65ElzNPTdXWahI/4VV63xF1t2c=
const indexKey = Uint8Array.from(
    Buffer.from('VcMePkmjKzOX8NX8U65ElzNPTdXWahI/4VV63xF1t2c=', "base64")
);

// try {
//     const index = await client.loadIndex({ indexName: 'hi', indexKey });
//     const result: UpsertResponse = await index.upsert({ items: vectorItems });
//     console.log('Upsert result:', result);
//     console.log(`Status: ${result.status}`);
//     console.log(`Upserted count: ${result.upsertedCount}`);

//     console.log(`Successfully added ${vectorItems.length} vectors to the index`);
// } catch (error) {
//     console.error('Failed to load index:', error);
// }

    const index = await client.loadIndex({ indexName: 'hi', indexKey });

    const results = await index.query({ queryVectors: [0.1, 0.2, 0.3], topK: 5 });
    console.log(JSON.stringify(results));
}
// YWwGomd2kSZlOTkvFA0MG/NXj6/G15bff+Lm3a4VWBU= temp
const indexKey = Uint8Array.from(
    Buffer.from('YWwGomd2kSZlOTkvFA0MG/NXj6/G15bff+Lm3a4VWBU=', "base64")
);
const index = await client.loadIndex({ indexName: 'temp', indexKey });
const results = await index.query({
      queryVectors: [0.1, 0.2, 0.3],
      topK: 5,
    });
    console.log("Query results:", JSON.stringify(results));
// const newItem: VectorItem[] = [
//     {
//       id: "doc1",
//       vector: [0.1, 0.2, 0.3 /* ... additional dimensions */],
//       contents: "This is the content of the first document",
//       metadata: {
//         title: "Introduction to Machine Learning",
//         author: "Dr. Smith",
//         category: "education",
//         tags: ["ml", "ai", "tutorial"],
//         published_date: "2024-01-15",
//         word_count: 1250,
//       },
//     },
//     {
//       id: "doc2",
//       vector: [0.4, 0.5, 0.6 /* ... additional dimensions */],
//       contents: "This is the content of the second document",
//       metadata: {
//         title: "Advanced Neural Networks",
//         author: "Dr. Jones",
//         category: "research",
//         tags: ["neural-networks", "deep-learning"],
//         published_date: "2024-01-20",
//         word_count: 2100,
//       },
//     },
//   ];

//   // Upsert vectors
//   try {
//     const result: UpsertResponse = await index.upsert({ items: newItem });
//     console.log("Upsert result:", result);
//     console.log(`Status: ${result.status}`);
//     console.log(`Upserted count: ${result.upsertedCount}`);

//     console.log(
//       `Successfully added ${vectorItems.length} vectors to the index`,
//     );
//   } catch(error) {
//     console.log(error);
//   }
