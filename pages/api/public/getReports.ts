import "dotenv/config";

import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "cyborgdb";

const client = new Client({
  baseUrl: process.env.baseURL!,
  apiKey: process.env.CYBORGDB_API_KEY,
});

const indexName = "reports";
const indexKeyBase64 = process.env.indexKeyBase64!;

export default async function getReportsHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const index = await client.loadIndex({
    indexName,
    indexKey,
  });

  const reportIds = (await index.listIds()).ids;
  const reports = await index.get({ ids: reportIds });
  let public_reports = [];
  for (const report of reports) {
    if (report.metadata!.visibility === "PUBLIC") {
      public_reports.push({
        title: report.metadata!.title,
        description: report.metadata!.description,
        visibility: report.metadata!.visibility,
        timeLimit: report.metadata!.timeLimit,
      });
    }
  }
  res.status(200).json({ public_reports });
}
