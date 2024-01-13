import type { NextApiRequest, NextApiResponse } from 'next';
import { UpcomingSales } from '../../types/collectionTypes/homeTypes';
 
async function getUpcomingSales(start=0, limit=50): Promise<UpcomingSales> {
  const response = await fetch(`https://api.coinmarketcap.com/data-api/v3/nft/upcomings?start=${start}&limit=${limit}`)
  const responseJSON = await response.json();
  return responseJSON;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpcomingSales>
) {
  const start = Number(req.query.start);
  const limit = Number(req.query.limit);
  const query = await getUpcomingSales(start, limit);
  res.status(200).json(query);
}
