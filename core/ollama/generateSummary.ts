import ollama from "ollama";

export async function generateSummary(text: string): Promise<string> {
  const response = await ollama.chat({
    model: "gemma3:270m",
    messages: [
      {
        role: "user",
        content: `Summarize the following text in a clear and concise way. Return ONLY the summary:\n\n${text}`,
      },
    ],
  });

  return response.message.content;
}
