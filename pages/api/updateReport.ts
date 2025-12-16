import type { NextApiRequest, NextApiResponse } from "next";
import { updateReport } from "@/core/services/updateReport";
// report_id: string,
//   title: string,
//   description: string,
//   visibility: string,
export default async function updateReportHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ status: number }>,
) {
  const report_id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const visibility = req.body.visibility;
  const status = await updateReport(report_id, title, description, visibility);
  if (status?.status === 200) {
    return res.status(200).json({ status: 200 });
  }
  return res.status(500).json({ status: 500 });
}
