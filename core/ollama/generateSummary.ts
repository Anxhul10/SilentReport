import ollama from "ollama";

export async function generateSummary(text: string): Promise<string> {
  const response = await ollama.chat({
    model: "qwen2.5:1.5b",
    messages: [
      {
        role: "user",
        content: `
Generate a concise, professional summary of the following reports.

Rules:
- Write only ONE paragraph.
- Do NOT use headings.
- Do NOT use HTML or markdown.
- Do NOT use symbols like # or <>.
- Do NOT add extra sections.
- Mention repeated or overlapping themes if present.
- Do NOT describe the data structure.
- Return ONLY the summary text.

Reports:
${text}
`,
      },
    ],
  });
  return response.message.content;
}

export async function generateKeyThemes(text: string): Promise<string> {
  const response = await ollama.chat({
    model: "qwen2.5:1.5b",
    messages: [
      {
        role: "user",
        content: `
Generate a concise, professional key themes of the following reports.

Rules:
- Write only ONE paragraph.
- Do NOT use headings.
- Do NOT use HTML or markdown.
- Do NOT use symbols like # or <>.
- Do NOT add extra sections.
- Mention repeated or overlapping themes if present.
- Do NOT describe the data structure.
- Return ONLY the key theme text.

Reports:
${text}
`,
      },
    ],
  });
  return response.message.content;
}

export async function generateNotes(text: string): Promise<string> {
  const response = await ollama.chat({
    model: "qwen2.5:1.5b",
    messages: [
      {
        role: "user",
        content: `
Generate a concise, professional Notes of the following reports.

Rules:
- Write only ONE paragraph.
- Do NOT use headings.
- Do NOT use HTML or markdown.
- Do NOT use symbols like # or <>.
- Do NOT add extra sections.
- Mention repeated or overlapping themes if present.
- Do NOT describe the data structure.
- Return ONLY the Notes text.

Reports:
${text}
`,
      },
    ],
  });
  return response.message.content;
}
