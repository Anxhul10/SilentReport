import type { NextApiRequest, NextApiResponse } from "next";
import { fixDescription } from "@/core/ollama/fixGrammer";

export default async function createReport(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>,
) {
  try {
    const result = await fixDescription(req.body.description);
    res.status(200).json({ message: result });
  } catch (_error) {
    res.status(400).json({ message: "Please install ollama to you machine" });
  }
}
