import type { NextApiRequest, NextApiResponse } from 'next';
import { TransactionsAndLiquidity } from '../../types/collectionTypes/analyticsTypes';
import { TimeRange } from '../../types/collectionTypes/collectionTypes';
import { dateToMilliSeconds, getCurrentDate } from '../../utils/datetime';
 
export async function getTransactionsAndLiquidity(cid:string, range: TimeRange): Promise<TransactionsAndLiquidity> {
  const date = dateToMilliSeconds(getCurrentDate()).toString();
  const response = await fetch('https://api.nftgo.io/api/v1/collection-new/data/' + cid + '/chart/transfer?cid=' + cid + '&from=' + date + '&to=' + date + '&interval=24h&needGenDelta=1&range=' + range);
  const responseJSON = await response.json();
  return responseJSON;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TransactionsAndLiquidity>
) {
  // const cid = JSON.stringify(req.query.cid).slice(1, -1);
  const cid = '65a13036c284b18008bd25b7';
  const range = req.query.range?.toString() as TimeRange;
  const query = await getTransactionsAndLiquidity(cid, range);
  console.log(query.errorCode);
  res.status(200).json(query);
}
