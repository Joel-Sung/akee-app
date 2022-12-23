type MarketCapAndVolumeData = {
  values: {
    x: (number | null)[],
    y: (number | null)[],
  },
  meta: {
    name: string,
    value: number,
    usdValue: number | null,
    delta: number,
  }
}
export interface MarketCapAndVolume {
  errorCode: number;
  data: {
    marketCap: MarketCapAndVolumeData,
    marketCapEth: MarketCapAndVolumeData,
    volume: MarketCapAndVolumeData,
    volumeEth: MarketCapAndVolumeData,
  }
}

export interface TransactionsAndLiquidity {
  
}

export interface TradersAndHolders {
  
}

export interface TopSales {
  
}