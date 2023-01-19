export type CollectionData = {
  marketCap: number,
  marketCapEth: number,
  volume: number,
  volumeEth: number,
  volumeEth7d: number,
  holderNum: number,
  saleNum: number,
  whaleNum: number,
  floorPrice: {
    tokenPrice: number,
  }
  id: string,
  name: string,
  longDesc: string,
  logo: string,
  bannerImageUrl: string,
}
export interface CollectionRanking {
  errorCode: number,
  data: {
    total: number,
    list: CollectionData[]
  },
}

export type Volume7dData = {
  x: number[],
  y: number[],
}
export interface Volume7d {
  // errorCode: number,
  data: Volume7dData[],
}

export type FloorPrice7dData = {
  x: number[],
  y: number[],
}
export interface FloorPrice7d {
  // errorCode: number,
  data: FloorPrice7dData[],
}

export type Quote = {
  name: 'BTC' | 'ETH' | 'USD',
  price: number,
  volume24h: number,
  volume7d: number,
  volume30d: number,
  percentChange1h: number,
  percentChange24h: number,
  percentChange7d: number,
  marketCap: number,
}
export type TokenData = {
  name: string,
  symbol: string,
  cmcRank: number,
  circulatingSupply: number,
  totalSupply: number,
  quotes: Quote[]
}
export interface TokenRanking {
  data: {
    cryptoCurrencyList: TokenData[],
    totalCount: number,
  },
}

type Platform = 'Solana' | 'Ethereum' | 'Polygon'
type UpcomingSale = {
  name: string,
  twitter: string,
  preview: string,
  description: string,
  discord: string,
  website: string,
  platform: Platform,
  mintPrice: string,
  presalePrice: string,
  dateTime: string,
}
export interface UpcomingSales {
  data: {
    count: number,
    upcomings: UpcomingSale[],
    platforms: [
      "Solana",
      "Ethereum",
      "Polygon"
    ]
  },
}