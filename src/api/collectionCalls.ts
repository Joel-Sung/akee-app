import { CollectionRanking, ListingAndSalesRatio, Listings, PriceAndSales, Sales } from "../types/collectionCallsTypes";
import { dateToMilliSeconds, getCurrentDate } from "../utils/date";

export async function getCollectionRanking(): Promise<CollectionRanking> {
  const response = await fetch('https://api.nftgo.io/api/v2/ranking/collections?offset=0&limit=50&by=volumeEth24h&asc=-1&rarity=-1&keyword=&fields=marketCap,marketCapEth,marketCapEthRanking,marketCapEthChange24h,buyerNum24h,buyerNum24hChange24h,sellerNum24h,sellerNum24hChange24h,liquidity24h,liquidity24hChange24h,saleNum24h,saleNum24hChange24h,volume24h,volumeEth24h,volumeEth24hChange24h,traderNum24h,traderNum24hChange24h,holderNum,holderNumChange24h,whaleNum,whaleNumChange24h,orderAvgPriceETH24h,orderAvgPriceETH24hChange24h,orderAvgPrice24h,orderAvgPrice24hChange24h,floorPrice,floorPriceChange24h,blueChipHolderNum,blueChipHolderNumChange24h,blueChipHolderRatio,whaleRatio');
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getPriceAndSales(cid:string, range:Range): Promise<PriceAndSales> {
  const date = dateToMilliSeconds(getCurrentDate()).toString();
  const response = await fetch('https://api.nftgo.io/api/v2/collection-new/data/' + cid + '/chart/price-V2?cid=' + cid + '&from=' + date + '&to=' + date + '&interval=24h&needGenDelta=1&excludeWashTrading=1&range=' + range + '&outlier=1');
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getListingAndSalesRatio(cid:string, range:Range): Promise<ListingAndSalesRatio> {
  const response = await fetch('https://api.nftgo.io/api/v1/collection/' + cid + '/pro-trade/metrics/listed-sale-ratio?timeRange=' + range);
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getListings(cid:string): Promise<Listings> {
  const response = await fetch('https://api.nftgo.io/api/v1/collection/' + cid + 'pro-trade/data/listings?sortBy=5&offset=0&limit=50');
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getSales(cid:string): Promise<Sales> {
  const response = await fetch('https://api.nftgo.io/api/v1/collection-new/data/' + cid + '/market/recent-sale?excludeWashTrading=-1&limit=50');
  const responseJSON = await response.json();
  return responseJSON;
}
