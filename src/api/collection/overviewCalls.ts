import { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { PriceAndSales } from "../../types/collectionTypes/overviewTypes";
import { dateToMilliSeconds, getCurrentDate } from "../../utils/datetime";

export async function getPriceAndSales(cid:string, range:TimeRange): Promise<PriceAndSales> {
  const date = dateToMilliSeconds(getCurrentDate()).toString();
  const response = await fetch('https://api.nftgo.io/api/v2/collection-new/data/' + cid + '/chart/price-V2?cid=' + cid + '&from=' + date + '&to=' + date + '&interval=24h&needGenDelta=1&excludeWashTrading=1&range=' + range + '&outlier=1');
  const responseJSON = await response.json();
  return responseJSON;
}
