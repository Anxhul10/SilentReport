import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "cyborgdb";
import type { JsonValue } from "@/types/default";

interface IGet {
  title?: JsonValue;
  description?: JsonValue;
  visibility?: JsonValue;
  timeLimit?: JsonValue;
  created_at?: JsonValue;
}
interface IRes {
  public_reports: IGet[];
}

const client = new Client({
  baseUrl: process.env.baseURL!,
  apiKey: process.env.CYBORGDB_API_KEY,
});

const indexName = "reports";
const indexKeyBase64 = process.env.indexKeyBase64!;

export default async function searchHandler(
  _req: NextApiRequest,
  res: NextApiResponse<IRes | { message: string }>,
) {
  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const index = await client.loadIndex({ indexName, indexKey });

  try {
    const reportIds = (await index.listIds()).ids;
    const reports = await index.get({ ids: reportIds });
    const public_reports = [];
    for (const report of reports) {
      if (report.metadata!.visibility === "PUBLIC") {
        public_reports.push({
          title: report.metadata!.title,
          description: report.metadata!.description,
          visibility: report.metadata!.visibility,
          timeLimit: report.metadata!.timeLimit,
          created_at: report.metadata!.created_at,
        });
      }
    }
    res.status(200).json({ public_reports });
  } catch (_error) {
    res.status(500).json({ message: `get public reports failed` });
  }
}
