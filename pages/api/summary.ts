import type { NextApiRequest, NextApiResponse } from "next";
import {
  generateSummary,
  generateNotes,
  generateKeyThemes,
} from "@/core/ollama/generateSummary";

export default async function createReport(
  req: NextApiRequest,
  res: NextApiResponse<
    { summary: string; keyTheme: string; notes: string } | { message: string }
  >,
) {
  try {
    const data = req.body.reports;
    if (data.length === 0) {
      return res.status(200).json({
        summary: "No data available to generate a summary.",
        keyTheme: "No data available.",
        notes: "No data available.",
      });
    }
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
  } catch (_error) {
    res.status(400).json({ message: "Please install ollama to you machine" });
  }
}
