import "dotenv/config";
import { Client } from "cyborgdb";

interface IUpsert {
  status: string;
  message?: string;
}
interface IItems {
  id: string;
  contents: string;
  metadata: {
    title?: string;
    description?: string;
    timeLimit?: string;
    visibility?: string;
  };
}

export async function upsert(
  indexKeyBase64: string,
  indexName: string,
  items: IItems[],
): Promise<IUpsert | undefined> {
  const indexKey = Uint8Array.from(Buffer.from(indexKeyBase64, "base64"));
  const client = new Client({
    baseUrl: process.env.baseURL ?? "",
    apiKey: process.env.CYBORGDB_API_KEY,
  });
  const index = await client.loadIndex({
    indexName,
    indexKey,
  });
  try {
    const result = await index.upsert({
      items,
    });
    console.log("Text-only upsert successful");
    return result;
  } catch (error) {
    console.error("Upsert failed ", error);
  }
}
const items = [
  {
    id: "1",
    contents: "Patient Anxiety Report Detailed clinical notes about anxiety symptoms and triggers",
    metadata: {
      title: "Patient Anxiety Report",
      description: "Clinical report describing anxiety symptoms in a patient",
      timeLimit: "not defined",
      visibility: "PUBLIC",
    },
  },
  {
    id: "2",
    contents: "Depression Assessment Summary Psychological evaluation focused on depressive patterns",
    metadata: {
      title: "Depression Assessment Summary",
      description: "Mental health assessment focused on depression indicators",
      timeLimit: "not defined",
      visibility: "PUBLIC",
    },
  },
  {
    id: "3",
    contents: "Stress Evaluation Document Analysis of stress levels and coping mechanisms",
    metadata: {
      title: "Stress Evaluation Document",
      description: "Report evaluating stress and coping strategies",
      timeLimit: "not defined",
      visibility: "PUBLIC",
    },
  },
  {
    id: "4",
    contents: "Sleep Disorder Case Study Study of insomnia and disrupted sleep cycles",
    metadata: {
      title: "Sleep Disorder Case Study",
      description: "Case study related to sleep disorders and insomnia",
      timeLimit: "not defined",
      visibility: "PUBLIC",
    },
  },
  {
    id: "5",
    contents: "Post Trauma Recovery Notes Observations on recovery after traumatic events",
    metadata: {
      title: "Post Trauma Recovery Notes",
      description: "Notes on patient recovery after trauma exposure",
      timeLimit: "not defined",
      visibility: "PUBLIC",
    },
  },
  {
    id: "6",
    contents: "Cognitive Behavioral Therapy Session Notes Summary of CBT techniques used",
    metadata: {
      title: "CBT Session Notes",
      description: "Therapy session notes focused on cognitive behavioral therapy",
      timeLimit: "not defined",
      visibility: "PUBLIC",
    },
  },
];


await upsert(process.env.indexKeyBase64!, "reports", items);
