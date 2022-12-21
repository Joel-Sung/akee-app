export interface CollectionRanking {
  errorCode: number,
  data: {
    total: number,
    list: []
  },
  id: string,
}

type PriceAndSalesComponent = {
  values: {
    x: (number | null)[],
    y: (number | null)[]
  },
  meta: {
    name: string,
    value: number,
    usdValues: number | null,
    delta: number
  }
}
export interface PriceAndSales {
  errorCode: number,
  data: {
    avgPrice: PriceAndSalesComponent,
    avgPriceUsd: PriceAndSalesComponent,
    salesScatter: PriceAndSalesComponent,
    salesScatterUsd: PriceAndSalesComponent,
    floorPrice: PriceAndSalesComponent,
    floorPriceUsd: PriceAndSalesComponent,
    volume: PriceAndSalesComponent,
    volumeEth: PriceAndSalesComponent
  }
}

export type Range = '5m' | '15m' | '30m' | '1h' | '6h' | '24h' | '7d' | '30d' | '3M' | '1y' | 'all'

export interface ListingAndSalesRatio {
  errorCode: number,
  data: {
    timeRange: string,
    salesCount: number,
    newListedCount: number,
    delistedCount: number,
    ListedSaleRatio: number
  }
}

type Listing ={
  tokenId: string,
  ethPrice: number,
  asset: {
    rarity: {
      ranking: number,
    }
  },
  listingTime: number
}
export interface Listings {
  errorCode: number,
  data: Listing[]
}

type Sale ={
  tokenId: string,
  timestamp: number,
  tokenPrice: number,
  fromTag: {
    isWhale: boolean,
  },
  asset: {
    rarity: {
      ranking: number,
    }
  }
}
export interface Sales {
  errorCode: number,
  data: Sale[]
}