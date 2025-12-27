import type { NextApiRequest, NextApiResponse } from "next";
import type { JsonValue } from "@/types/default";

import { Client } from "cyborgdb";

interface IUserReportsResponse {
  id?: JsonValue;
  title?: JsonValue;
  description?: JsonValue;
  visibility?: JsonValue;
  created_by?: JsonValue;
  created_at?: JsonValue;
}

const client = new Client({
  baseUrl: process.env.baseURL!,
  apiKey: process.env.CYBORGDB_API_KEY,
});

const indexName = "reports";
const indexKeyBase64 = process.env.indexKeyBase64!;

export default async function getReportsHandler(
  req: NextApiRequest,
  res: NextApiResponse<IUserReportsResponse[] | { message: string }>,
) {
  const user_id = req.body.userId;
  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const index = await client.loadIndex({
    indexName,
    indexKey,
  });

  try {
    const reportIds = (await index.listIds()).ids;
    const reports = await index.get({ ids: reportIds });

    const user_reports = [];

    for (const report of reports) {
      if (report.metadata!.created_by === user_id) {
        user_reports.push({
          id: report.id,
          title: report.metadata!.title,
          description: report.metadata!.description,
          visibility: report.metadata!.visibility,
          timeLimit: report.metadata!.timeLimit,
          created_by: user_id,
          created_at: report.metadata!.created_at,
        });
      }
    }
    res.status(200).json(user_reports);
  } catch (error) {
    res.status(400).json({ message: `cannot get user reports ${error}` });
  }
}
