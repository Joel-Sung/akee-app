import type { NextApiRequest, NextApiResponse } from 'next';
import { TokenRanking } from '../../types/collectionTypes/homeTypes';
 
export async function getTokenRanking(start=1, limit=50): Promise<TokenRanking> {
  const response = await fetch(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=${start}&limit=${limit}&sortBy=market_cap&sortType=desc&convert=USD,BTC,ETH&cryptoType=all&tagType=all&audited=false&aux=ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,tags,platform,max_supply,circulating_supply,self_reported_circulating_supply,self_reported_market_cap,total_supply,volume_7d,volume_30d&tagSlugs=collectibles-nfts`)
  const responseJSON = await response.json();
  return responseJSON;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenRanking>
) {
  const start = Number(req.query.start);
  const limit = Number(req.query.limit);
  const query = await getTokenRanking(start, limit);
  res.status(200).json(query);
}
