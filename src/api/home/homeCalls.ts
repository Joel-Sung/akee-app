import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { TimeRange } from "../../types/collectionTypes/collectionTypes";
import type { CollectionDetails, CollectionRanking, FloorPrice7d, KeywordCollections, TokenRanking, UpcomingSales, Volume7d } from "../../types/collectionTypes/homeTypes";

export async function getCollectionRanking(range: TimeRange, offset=0, limit=50): Promise<CollectionRanking> {
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
}

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
}

export async function getTokenRanking(start=1, limit=50): Promise<TokenRanking> {
  const response = await fetch(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=${start}&limit=${limit}&sortBy=market_cap&sortType=desc&convert=USD,BTC,ETH&cryptoType=all&tagType=all&audited=false&aux=ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,tags,platform,max_supply,circulating_supply,self_reported_circulating_supply,self_reported_market_cap,total_supply,volume_7d,volume_30d&tagSlugs=collectibles-nfts`)
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getUpcomingSales(start=0, limit=50): Promise<UpcomingSales> {
  const response = await fetch(`https://api.coinmarketcap.com/data-api/v3/nft/upcomings?start=${start}&limit=${limit}`)
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getKeywordCollections(keyword=''): Promise<KeywordCollections> {
  const response = await fetch(`https://api.nftgo.io/api/v1/collections?keyword=${keyword}`)
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getCollectionDetails(cid: string): Promise<AxiosResponse<CollectionDetails> | undefined> {
  try {
    return await axios({
      method: 'get',
      url: `https://api.nftgo.io/api/v1/collection/metrics/${cid}`,
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'sec-ch-ua': '"Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site'
      },
    })
  } catch (error) {
    console.log(error);
    return undefined;
  }
}