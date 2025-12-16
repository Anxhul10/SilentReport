import type { NextApiRequest, NextApiResponse } from "next";
import { submitReport } from "@/core/services/submitReport";
interface IRes {
  status: number;
}
export default async function createReport(
  req: NextApiRequest,
  res: NextApiResponse<IRes>,
) {
  const user_id = req.body.user_id;
  const title = req.body.title;
  const description = req.body.description;
  const visibility = req.body.visibility;
  const data = await submitReport(user_id, title, description, visibility);
  if (data?.status === 200) {
    return res.status(200).json({ status: 200 });
  }
  return res.status(400).json({ status: 400 });
}
