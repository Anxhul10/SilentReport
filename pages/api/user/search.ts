import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "cyborgdb";
import { QueryResponse } from "cyborgdb";

const client = new Client({
  baseUrl: process.env.baseURL!,
  apiKey: process.env.CYBORGDB_API_KEY,
});

const indexName = "reports";
const indexKeyBase64 = process.env.indexKeyBase64!;

export default async function searchHandler(
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse | { message: string }>,
) {
  const queryContents = req.body.queryContents;

  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const index = await client.loadIndex({ indexName, indexKey });
  try {
    const results = await index.query({
      queryContents,
      topK: 5,
      filters: {
        visibility: "PUBLIC",
      },
      include: ["metadata", "contents"],
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: `Query failed ${error}` });
  }
}
