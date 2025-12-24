import "dotenv/config";
import express from "express";
import cors from "cors";
import { Client } from "cyborgdb";
import { PythonShell } from "python-shell";

const app = express();
app.use(express.json());

app.use(cors());

const client = new Client({
  baseUrl: process.env.baseURL,
  apiKey: process.env.CYBORGDB_API_KEY,
});

const indexName = "reports";
const indexKeyBase64 = process.env.indexKeyBase64;

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

app.get("/reports-exists", async (req, res) => {
  try {
    const indexs = await client.listIndexes();
    for (const idx of indexs) {
      if (idx === "reports") {
        return res.status(200).json({ exist: true });
      }
    }
    return res.status(200).json({ exist: false });
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
    if (process.env.indexKeyBase64) {
      return res.status(409).json({
        message: "Index already exists. Creation is not allowed again.",
      });
    }
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
    console.log("#######################################################");
    console.log("indexKeyBase64" + indexKeyBase64);
    console.log("#######################################################");
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
  if (
    user_id === "" ||
    title === " " ||
    description === "" ||
    visibility === ""
  ) {
    return res
      .status(500)
      .json({ message: "title , description, visibility or user_id is empty" });
  }
  const items = [
    {
      id: Date.now().toString(),
      contents: `${title} and ${user_id}`,
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

app.post("/update", async (req, res) => {
  const user_id = req.body.user_id;
  const title = req.body.title;
  const description = req.body.description;
  const visibility = req.body.visibility;
  const items = [
    {
      id: req.body.id,
      contents: `Title: ${title}\nDescription: ${description}`,
      metadata: {
        title,
        inserted_at: getDate(), // replaces the inserted with updated date
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
    console.log("Text-only update successful");
    res.status(200).json(result);
  } catch (error) {
    console.error("update failed ", error);
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
app.post("/summary", async (req, res) => {
  const user_id = req.body.user_id;
  PythonShell.run("./core/langchain/main.py").then((messages) => {
    console.log(messages);
    console.log("finished");
    res.status(200).json({ messages });
  });
});
// endpoint will be used in view reports section
app.post("/user/getReports", async (req, res) => {
  const user_id = req.body.user_id;
  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const index = await client.loadIndex({
    indexName,
    indexKey,
  });

  const reportIds = (await index.listIds()).ids;
  const reports = await index.get({ ids: reportIds });

  const user_reports = [];

  for (const report of reports) {
    if (report.metadata.created_by === user_id) {
      user_reports.push({
        title: report.metadata.title,
        description: report.metadata.description,
        visibility: report.metadata.visibility,
        timeLimit: report.metadata.timeLimit,
      });
    }
  }
  res.status(200).json({ reports: user_reports });
});
app.post("/user/getReports/count", async (req, res) => {
  const user_id = req.body.user_id;
  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const index = await client.loadIndex({
    indexName,
    indexKey,
  });

  const reportIds = (await index.listIds()).ids;
  const reports = await index.get({ ids: reportIds });

  let public_count = 0;
  let private_count = 0;
  let report_count = 0;
  for (const report of reports) {
    if (report.metadata.created_by === user_id) {
      console.log(report.metadata.visibility);
      if (report.metadata.visibility === "PUBLIC") {
        public_count++;
      } else if (report.metadata.visibility === "PRIVATE") {
        private_count++;
      }
      report_count++;
    }
  }
  res.status(200).json({ report_count, public_count, private_count });
});
app.get("/public/reports/train", async (req, res) => {
  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const index = await client.loadIndex({
    indexName,
    indexKey,
  });
  const result = await index.train();
  res.status(200).json({ result });
});
// return only public listed reports
app.get("/getReports/public", async (req, res) => {
  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const index = await client.loadIndex({
    indexName,
    indexKey,
  });

  const reportIds = (await index.listIds()).ids;
  const reports = await index.get({ ids: reportIds });
  let public_reports = [];
  for (const report of reports) {
    if (report.metadata.visibility === "PUBLIC") {
      public_reports.push({
        title: report.metadata.title,
        description: report.metadata.description,
        visibility: report.metadata.visibility,
        timeLimit: report.metadata.timeLimit,
      });
    }
  }
  res.status(200).json({ public_reports });
});
app.post("/search", async (req, res) => {
  const queryContents = req.body.queryContents;

  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const index = await client.loadIndex({ indexName, indexKey });
  try {
    const results = await index.query({
      queryContents,
      topK: 5,
      filters: {
        visibility: "PUBLIC", // must exist in metadata
      },
      include: ["metadata", "contents"],
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
