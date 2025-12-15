import { encrypt } from "@/core/cyper";
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteAPI } from "@/core/services/deleteAPI";

export default async function saveAPIHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ status: number }>,
) {
  const API = req.body.API;
  const user_id = req.body.user_id;
  deleteAPI(API, user_id);

  return res.status(200).json({ status: 200 });
}
