import { loginUser } from "../../core/supabase/loginUser";
import "dotenv/config";
import type { NextApiRequest, NextApiResponse } from "next";

type ApiResponse = {
  status: number;
  token: string | undefined;
};

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) {
  const supabaseUrl = process.env.supabaseUrl || "no key";
  const supabaseKey = process.env.supabaseKey || "no key";
  const data = await loginUser(
    supabaseUrl,
    supabaseKey,
    req.body.email,
    req.body.password,
  );
  if (!data) {
    // login invalid
    return res.status(400).json({ status: 400, token: undefined });
  }
  // login valid
  return res.status(200).json({ status: 200, token: data.token });
}
