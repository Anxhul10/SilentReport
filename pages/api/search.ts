import type { NextApiRequest, NextApiResponse } from "next";
import { search } from "@/core/services/search";
import { ISearch } from "@/types/Search";

// req.body.query: `%${string}%`
export default async function searchHandler(
  req: NextApiRequest,
  res: NextApiResponse<ISearch[] | null>,
) {
  try {
    const data = await search(`%${req.body.query}%`);
    return res.status(200).json(data);
  } catch (error) {
    console.log("error at pages/api/search" + error);
  }
}
