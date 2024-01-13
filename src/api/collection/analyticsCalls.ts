import type { MarketCapAndVolume, TopSales } from "../../types/collectionTypes/analyticsTypes";
import type { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { dateToMilliSeconds, getCurrentDate } from "../../utils/datetime";

export async function getMarketCapAndVolume(cid:string, range: TimeRange): Promise<MarketCapAndVolume> {
  const date = dateToMilliSeconds(getCurrentDate()).toString();
  console.log(date);
  const response = await fetch('https://api.nftgo.io/api/v1/collection-new/data/' + cid + '/chart/marketcap-volume-V2?cid=' + cid + '&from=' + date + '&to=' + date + '&range=' + range);
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getTopSales(cid:string, range: TimeRange): Promise<TopSales> {
  const response = await fetch('https://api.nftgo.io/api/v1/asset/top-sales?limit=10&timespan=' + range + '&cid=' + cid + '&excludeWashTrading=-1');
  const responseJSON = await response.json();
  return responseJSON;
}
