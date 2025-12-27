import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "cyborgdb";

interface IUpdateResponse {
  status?: string;
  message?: string;
}
const client = new Client({
  baseUrl: process.env.baseURL!,
  apiKey: process.env.CYBORGDB_API_KEY,
});

const indexName = "reports";
const indexKeyBase64 = process.env.indexKeyBase64!;

function getDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const dayStr = day < 10 ? "0" + day : day;
  const monthStr = month < 10 ? "0" + month : month;

  const formattedDate = `${dayStr}/${monthStr}/${year}`;
  return formattedDate;
}

export default async function updateHandler(
  req: NextApiRequest,
  res: NextApiResponse<IUpdateResponse>,
) {
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
  const result = await index.upsert({
    items,
  });
  if (result.status === "success") {
    res.status(200).json(result);
  }
  res.status(500).json(result);
}
