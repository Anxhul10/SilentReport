import ollama from "ollama";

export async function fixTitle(text: string): Promise<string> {
  const response = await ollama.chat({
    model: "qwen2.5:1.5b",
    messages: [
      {
        role: "user",
        content: `
Rewrite the sentence below.

Instructions:
- Choose ONE appropriate tag from:
  Fraud, Corruption, Misconduct, Abuse, Negligence, Cover-Up, Data Tampering, Conflict of Interest, Policy Violation
- Use the format: <Tag>: <corrected sentence>
- Rewrite the sentence in correct, natural English.
- Fix grammar and wording.
- Return ONLY the final sentence.

Sentence:
${text}
`,
      },
    ],
  });

  return response.message.content;
}

export async function fixDescription(text: string): Promise<any> {
  const response = await ollama.chat({
    model: "qwen2.5:1.5b",
    messages: [
      {
        role: "user",
        content: `
Fix grammar and spelling in the sentence below.
Return ONLY the corrected sentence.

Sentence:
${text}
`,
      },
    ],
  });

  return response.message.content;
}
