import { getReport } from "@/core/services/getReport";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getReportHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const data = await getReport();
    return res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
  }
}
