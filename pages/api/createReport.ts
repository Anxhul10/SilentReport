import type { NextApiRequest, NextApiResponse } from "next";
import { submitReport } from "@/core/services/submitReport";

export default async function createReport(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const user_id = req.body.user_id;
  const title = req.body.title;
  const description = req.body.description;
  const data = await submitReport(user_id, title, description);
  if (data?.status === 200) {
    return res.status(200).json({ status: 200 });
  }
  return res.status(400).json({ status: 400 });
}
