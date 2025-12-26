import type { NextApiRequest, NextApiResponse } from "next";
import { fixTitle } from "@/core/ollama/fixGrammer";

export default async function createReport(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>,
) {
  try {
    const result = await fixTitle(req.body.title);
    res.status(200).json({ message: result });
  } catch (_error) {
    res.status(400).json({ message: "Please install ollama to you machine" });
  }
}
