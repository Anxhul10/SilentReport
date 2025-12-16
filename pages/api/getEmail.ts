import type { NextApiRequest, NextApiResponse } from "next";
import { getEmail } from "@/core/services/getEmail";

interface IRes {
  status: number;
  email: string | undefined;
}
export default async function emailHandler(
  req: NextApiRequest,
  res: NextApiResponse<IRes>,
) {
  const user_id = req.body.user_id;
  const data = await getEmail(user_id);
  if (data?.status === 200) {
    return res.status(200).json({ status: 200, email: data.email });
  }
  return res.status(400).json({ status: 400, email: undefined });
}
