import { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { FloorPrices, ListingAndSalesRatio, Listings, Sales, Trades } from "../../types/collectionTypes/protradeTypes";

export async function getListingAndSalesRatio(cid:string, range:TimeRange): Promise<ListingAndSalesRatio> {
  console.log('https://api.nftgo.io/api/v1/collection/' + cid + '/pro-trade/metrics/listed-sale-ratio?timeRange=' + range)
  const response = await fetch('https://api.nftgo.io/api/v1/collection/' + cid + '/pro-trade/metrics/listed-sale-ratio?timeRange=' + range);
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getListings(cid:string): Promise<Listings> {
  const response = await fetch('https://api.nftgo.io/api/v1/collection/' + cid + '/pro-trade/data/listings?sortBy=5&offset=0&limit=50');
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getSales(cid:string): Promise<Sales> {
  const response = await fetch('https://api.nftgo.io/api/v1/collection-new/data/' + cid + '/market/recent-sale?excludeWashTrading=-1&limit=50');
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getTrade(cid:string, range: TimeRange): Promise<Trades> {
  const response = await fetch('https://api.nftgo.io/api/v1/collection/' + cid + '/pro-trade/chart/trades?timeRange=' + range +'&outlierFilter=1');
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getFloorPrices(cid:string, range: TimeRange): Promise<FloorPrices> {
  const response = await fetch('https://api.nftgo.io/api/v1/collection/' + cid + '/pro-trade/chart/floor-price?timeRange=' + range);
  const responseJSON = await response.json();
  return responseJSON;
}
