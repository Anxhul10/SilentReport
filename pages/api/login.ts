import { loginUser } from "../../core/services/loginUser";
import "dotenv/config";
import type { NextApiRequest, NextApiResponse } from "next";

type ApiResponse = {
  status: number;
  token: string | undefined;
  user_id: string | undefined;
};

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) {
  const supabaseUrl = process.env.supabaseUrl || "no key";
  const supabaseKey = process.env.supabaseKey || "no key";
  const { user, token } = await loginUser(
    supabaseUrl,
    supabaseKey,
    req.body.email,
    req.body.password,
  );
  if (!user) {
    // login invalid
    return res
      .status(400)
      .json({ status: 400, token: undefined, user_id: undefined });
  }
  // login valid
  return res.status(200).json({ status: 200, token: token, user_id: user.id });
}
