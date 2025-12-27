import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "cyborgdb";
interface ICountResponse {
  report_count: number;
  public_count: number;
  private_count: number;
}
const client = new Client({
  baseUrl: process.env.baseURL!,
  apiKey: process.env.CYBORGDB_API_KEY,
});

const indexName = "reports";
const indexKeyBase64 = process.env.indexKeyBase64!;

export default async function countHandler(
  req: NextApiRequest,
  res: NextApiResponse<ICountResponse | { message: string }>,
) {
  const userId = req.body.userId;
  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const index = await client.loadIndex({
    indexName,
    indexKey,
  });

  try {
    const reportIds = (await index.listIds()).ids;
    const reports = await index.get({ ids: reportIds });

    let public_count = 0;
    let private_count = 0;
    let report_count = 0;
    for (const report of reports) {
      if (report.metadata!.created_by === userId) {
        if (report.metadata!.visibility === "PUBLIC") {
          public_count++;
        } else if (report.metadata!.visibility === "PRIVATE") {
          private_count++;
        }
        report_count++;
      }
    }
    res.status(200).json({ report_count, public_count, private_count });
  } catch (_error) {
    res.status(400).json({ message: `cannot get count` });
  }
}
