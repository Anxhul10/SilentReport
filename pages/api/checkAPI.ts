import type { NextApiRequest, NextApiResponse } from "next";
import { getAPI } from "@/core/services/getAPI";

interface IRes {
  status: number;
}
export default async function createReport(
  req: NextApiRequest,
  res: NextApiResponse<IRes>,
) {
  const user_id = req.body.user_id;
  const data = await getAPI(user_id);
  if (data?.status === 200) {
    return res.status(200).json({ status: 200 });
  }
  return res.status(400).json({ status: 400 });
}
