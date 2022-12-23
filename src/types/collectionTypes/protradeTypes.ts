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

export type Listing ={
  tokenId: string,
  ethPrice: number,
  asset: {
    image: string,
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

export type Sale ={
  tokenId: string,
  timestamp: number,
  tokenPrice: number,
  fromTag: {
    isWhale: boolean,
  },
  asset: {
    image: string,
    rarity: {
      ranking: number,
    }
  }
}
export interface Sales {
  errorCode: number,
  data: Sale[]
}

export type TradeBin = {
  ethVolume: number,
  usdVolume: number,
  averagePriceInETH: number,
  averagePriceInUSD: number,
  sales: number,
}
export interface Trades {
  errorCode: number,
  data: {
    scatterPlotsChart: {
      values: {
        x: (number | null)[],
        y: (number | null)[],
      },
      meta: {
        stats: {
          normalSalesNum: number,
          whaleSalesNum: number,
        }
      }
    },
    histogramChart: {
      x: (number | null)[],
      bins: TradeBin[]
    }
  }
}

export type FloorPriceBin = {
  ethVolume: number,
  usdVolume: number,
  sales: number,
}
export interface FloorPrices {
  errorCode: number,
  data: {
    histogramChart: {
      x: (number | null)[],
      bins: TradeBin[],
      floorPrices: (number | null)[],
      isAppendRealTimePoint: boolean,
    }
  }
}
