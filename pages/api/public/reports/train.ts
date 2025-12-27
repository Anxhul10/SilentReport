import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "cyborgdb";
import { TrainResponse } from "cyborgdb";

const client = new Client({
  baseUrl: process.env.baseURL!,
  apiKey: process.env.CYBORGDB_API_KEY,
});

const indexName = "reports";
const indexKeyBase64 = process.env.indexKeyBase64!;

export default async function searchHandler(
  req: NextApiRequest,
  res: NextApiResponse<TrainResponse | { message: string }>,
) {
  const queryContents = req.body.queryContents;

  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const index = await client.loadIndex({ indexName, indexKey });
  try {
    const result = await index.train();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: `train failed ${error}` });
  }
}
