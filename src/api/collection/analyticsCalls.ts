import type { MarketCapAndVolume, TopSales, TradersAndHolders, TransactionsAndLiquidity } from "../../types/collectionTypes/analyticsTypes";
import type { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { dateToMilliSeconds, getCurrentDate } from "../../utils/datetime";

export async function getMarketCapAndVolume(cid:string, range: TimeRange): Promise<MarketCapAndVolume> {
  const date = dateToMilliSeconds(getCurrentDate()).toString();
  const response = await fetch('https://api.nftgo.io/api/v1/collection-new/data/' + cid + '/chart/marketcap-volume-V2?cid=' + cid + '&from=' + date + '&to=' + date + '&range=' + range);
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getTransactionsAndLiquidity(cid:string, range: TimeRange): Promise<TransactionsAndLiquidity> {
  const date = dateToMilliSeconds(getCurrentDate()).toString();
  const response = await fetch('https://api.nftgo.io/api/v1/collection-new/data/' + cid + '/chart/transfer?cid=' + cid + '&from=' + date + '&to=' + date + '&interval=24h&needGenDelta=1&range=' + range);
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getTradersAndHolders(cid:string, range: TimeRange): Promise<TradersAndHolders> {
  const date = dateToMilliSeconds(getCurrentDate()).toString();
  const response = await fetch('https://api.nftgo.io/api/v1/collection-new/data/' + cid + '/chart/holders-traders?cid=' + cid + '&from=' + date + '&to=' + date + '&range=' + range);
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getTopSales(cid:string, range: TimeRange): Promise<TopSales> {
  const response = await fetch('https://api.nftgo.io/api/v1/asset/top-sales?limit=10&timespan=' + range + '&cid=' + cid + '&excludeWashTrading=-1');
  const responseJSON = await response.json();
  return responseJSON;
}
