import type { NextApiRequest, NextApiResponse } from "next";
import {
  generateSummary,
  generateNotes,
  generateKeyThemes,
} from "@/core/ollama/generateSummary";

export default async function createReport(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const data = req.body.reports;
    let text = "";
    for (const item of data) {
      text += "title (" + item.title + ")" + "description (" + item.title + ")";
    }
    const summaryPromise = generateSummary(text);
    const keyThemePromise = generateKeyThemes(text);
    const notesPromise = generateNotes(text);
    const [summary, keyTheme, notes] = await Promise.all([
      summaryPromise,
      keyThemePromise,
      notesPromise,
    ]);
    res.status(200).json({ summary, keyTheme, notes });
  } catch (error) {
    res.status(400).json({ message: "Please install ollama to you machine" });
  }
}
