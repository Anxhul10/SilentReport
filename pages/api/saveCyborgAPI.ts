import { encrypt } from "@/core/cyper";
import type { NextApiRequest, NextApiResponse } from "next";
import { saveAPI } from "@/core/services/saveAPI";

export default async function saveAPIHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ status: string }>,
) {
  const user_id = req.body.user_id;
  const cypherText = encrypt(req.body.API);

  const res_core_api = await saveAPI(cypherText, user_id);
  if (res_core_api?.status === 200) {
    return res.status(200).json({ status: "200 - successfully saved API Key" });
  }
  return res
    .status(400)
    .json({ status: "400 - something went wrong on saving api" });
}
