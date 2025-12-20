import "dotenv/config";
import express from "express";
import cors from "cors";
import { Client } from "cyborgdb";

const app = express();
app.use(express.json());

app.use(cors());

const client = new Client({
  baseUrl: process.env.baseURL,
  apiKey: process.env.CYBORGDB_API_KEY,
});

app.post("/createIndex", async (req, res) => {
  try {
    const indexName = req.body.indexName;

    const indexKey = client.generateKey();
    const indexKeyBase64 = Buffer.from(indexKey).toString("base64");

    await client.createIndex({
      indexName,
      indexKey,
      indexConfig: {
        type: "ivf",
        dimension: 768,
      },
      embeddingModel: "sentence-transformers/all-mpnet-base-v2",
    });
    console.log(indexKeyBase64);
    res.status(200).json({
      message: "Index created successfully",
      indexKeyBase64,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "index creation failed" });
  }
});

app.post("/upsert", async (req, res) => {
  const indexName = req.body.indexName;
  const indexKeyBase64 = req.body.indexKeyBase64;
  const items = req.body.items;
  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));

  const index = await client.loadIndex({
    indexName,
    indexKey,
  });
  try {
    const result = await index.upsert({
      items,
    });
    console.log("Text-only upsert successful");
    res.status(200).json(result);
  } catch (error) {
    console.error("Upsert failed ", error);
    res.status(500).json(error);
  }
});

app.post("/query", async (req, res) => {
  const indexKeyBase64 = req.body.indexKeyBase64;
  const queryContents = req.body.queryContents;
  const indexName = req.body.indexName;

  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const index = await client.loadIndex({ indexName, indexKey });
  try {
    const results = await index.query({
      queryContents,
      topK: 5,
      include: ["distance", "metadata", "contents"],
    });

    res.status(200).json(results);
  } catch (error) {
    console.error("Content search failed:", error);
    res.status(500).json(error);
  }
});
app.listen(4000, () => {
  console.log("CyborgDB service running on :4000");
});
