import ollama from "ollama";

export async function fixGrammer(text: string): Promise<string> {
  const response = await ollama.chat({
    model: "gemma3:270m",
    messages: [
      {
        role: "user",
        content: `Improve the grammar and spellings of the following sentence and return ONLY the corrected sentence:\n\n${text}`,
      },
    ],
  });

  return response.message.content;
}
