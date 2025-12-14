import { signUp } from "@/core/services/signUp";
import "dotenv/config";
import type { NextApiRequest, NextApiResponse } from "next";

type ApiResponse = {
  status: number;
};

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) {
  const supabaseUrl = process.env.supabaseUrl || "no key";
  const supabaseKey = process.env.supabaseKey || "no key";
  const data = await signUp(
    supabaseUrl,
    supabaseKey,
    req.body.email,
    req.body.password,
  );
  if (data.status === 200) {
    return res.status(200).json({ status: 200 });
  }
  return res.status(400).json({ status: 400 });
}
