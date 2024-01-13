import { NextApiRequest, NextApiResponse } from "next";
import { TradersAndHolders } from "../../types/collectionTypes/analyticsTypes";
import { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { dateToMilliSeconds, getCurrentDate } from "../../utils/datetime";

export async function getTradersAndHolders(cid:string, range: TimeRange): Promise<TradersAndHolders> {
  const date = dateToMilliSeconds(getCurrentDate()).toString();
  const response = await fetch('https://api.nftgo.io/api/v1/collection-new/data/' + cid + '/chart/holders-traders?cid=' + cid + '&from=' + date + '&to=' + date + '&range=' + range);
  const responseJSON = await response.json();
  return responseJSON;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TradersAndHolders>
) {
  const cid = JSON.stringify(req.query.cid).slice(1, -1);
  const range = req.query.range?.toString() as TimeRange;
  const query = await getTradersAndHolders(cid, range);
  res.status(200).json(query);
}
