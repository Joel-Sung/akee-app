import { CollectionRanking } from "../../types/collectionTypes/homeTypes";

export async function getCollectionRanking(): Promise<CollectionRanking> {
  const response = await fetch('https://api.nftgo.io/api/v2/ranking/collections?offset=0&limit=50&by=volumeEth24h&asc=-1&rarity=-1&keyword=&fields=marketCap,marketCapEth,marketCapEthRanking,marketCapEthChange24h,buyerNum24h,buyerNum24hChange24h,sellerNum24h,sellerNum24hChange24h,liquidity24h,liquidity24hChange24h,saleNum24h,saleNum24hChange24h,volume24h,volumeEth24h,volumeEth24hChange24h,traderNum24h,traderNum24hChange24h,holderNum,holderNumChange24h,whaleNum,whaleNumChange24h,orderAvgPriceETH24h,orderAvgPriceETH24hChange24h,orderAvgPrice24h,orderAvgPrice24hChange24h,floorPrice,floorPriceChange24h,blueChipHolderNum,blueChipHolderNumChange24h,blueChipHolderRatio,whaleRatio');
  const responseJSON = await response.json();
  return responseJSON;
}
