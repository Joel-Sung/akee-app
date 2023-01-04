import axios, { AxiosResponse } from 'axios';
import { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { CollectionRanking, FloorPrice7d, Volume7d } from "../../types/collectionTypes/homeTypes";

export async function getCollectionRanking(range: TimeRange, offset:number=0, limit:number=50): Promise<CollectionRanking> {
  const response = await fetch(`https://api.nftgo.io/api/v2/ranking/collections?offset=${offset}&limit=${limit}&by=volumeEth${range}&asc=-1&rarity=-1&keyword=&fields=marketCap,marketCapEth,marketCapEthRanking,marketCapEthChange${range},buyerNum${range},buyerNum${range}Change${range},sellerNum${range},sellerNum${range}Change${range},liquidity${range},liquidity${range}Change${range},saleNum${range},saleNum${range}Change${range},volume${range},volumeEth${range},volumeEth${range}Change${range},traderNum${range},traderNum${range}Change${range},holderNum,holderNumChange${range},whaleNum,whaleNumChange${range},orderAvgPriceETH${range},orderAvgPriceETH${range}Change${range},orderAvgPrice${range},orderAvgPrice${range}Change${range},floorPrice,floorPriceChange${range},blueChipHolderNum,blueChipHolderNumChange${range},blueChipHolderRatio,whaleRatio`);
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getVolume7d(cidList: string[]): Promise<AxiosResponse<Volume7d> | undefined> {
  try {
    return await axios({
      method: 'post',
      url: 'https://api.nftgo.io/api/v1/collection-new/data/chart/volume7d-thumbnail-batch',
      headers: {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Microsoft Edge";v="108"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site'
      },
      data: {
        cids: cidList,
        isBaseEth: true
      }
    });
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export async function getFloorPrice7d(cidList: string[]): Promise<AxiosResponse<FloorPrice7d> | undefined> {
  try {
    return await axios({
      method: 'post',
      url: 'https://api.nftgo.io/api/v1/collection-new/data/chart/floorPrice7d-thumbnail-batch',
      headers: {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Microsoft Edge";v="108"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site'
      },
      // referrerPolicy: 'same-origin',
      data: {
        cids: cidList,
      },
      // mode: 'cors',
      // credentials: 'omit',
    });
  } catch (error) {
    console.log(error);
    return undefined;
  }
};


