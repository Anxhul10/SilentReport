import { loginUser } from "../../core/supabase/loginUser";
import "dotenv/config";

export default async function login(req: any, res: any) {
  const supabaseUrl = "https://hvhtnhzwubhmmricdpxw.supabase.co";
  const supabaseKey = "sb_secret_2i1KdJABpHujvQVwGkHtzw_ALQn4Vp0";
  const data = await loginUser(
    supabaseUrl,
    supabaseKey,
    req.body.email,
    req.body.password,
  );

  if (!data) {
    // login invalid
    return res.status(200).json({ status: "invalid" });
  }
  // login valid
  return res.status(200).json({ status: "valid" });
}
