import { getReport } from "@/core/services/getReport";
import type { NextApiRequest, NextApiResponse } from "next";

interface IReportSub {
  title: string;
  description: string;
  created_by: string;
}

interface IReport {
  data: IReportSub[];
}

export default async function getReportHandler(
  _req: NextApiRequest,
  res: NextApiResponse<IReport>,
) {
  try {
    const data = (await getReport()) ?? [];
    return res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
  }
}
