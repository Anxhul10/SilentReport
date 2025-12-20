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

const indexName = "service";
const indexKeyBase64 = "ErqfDz5/5hQftrpgLl1eqHZL+0YWI51AvNhYNESjD54=";

function getDate() {
  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}
app.get("/deleteIndex", async (req, res) => {
  try {
    const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
    const index = await client.loadIndex({
      indexName,
      indexKey,
    });
    const response = await index.deleteIndex();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/listIndex", async (req, res) => {
  try {
    const indexes = await client.listIndexes();
    res.status(200).json(indexes);
  } catch (error) {
    console.error("Failed to list indexes:", error);
    res.status(500).json(error);
  }
});

app.post("/createIndex", async (req, res) => {
  try {
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
  const user_id = req.body.user_id;
  const title = req.body.title;
  const description = req.body.description;
  const visibility = req.body.visibility;
  const items = [
    {
      id: Date.now().toString(),
      contents: `${title} and ${description}`,
      metadata: {
        title,
        inserted_at: getDate(),
        created_by: user_id,
        description,
        visibility,
      },
    },
  ];
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
  const queryContents = req.body.queryContents;

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
