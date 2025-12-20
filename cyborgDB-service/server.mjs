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
  try {
    const { indexName, indexKeyBase64, items } = req.body;

    const index = await client.index(indexName, indexKeyBase64);
    await index.upsert(items);

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upsert failed" });
  }
});

app.listen(4000, () => {
  console.log("CyborgDB service running on :4000");
});
