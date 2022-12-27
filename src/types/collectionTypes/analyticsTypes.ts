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

type TransactionsAndLiquidityData = {
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
export interface TransactionsAndLiquidity {
  errorCode: number;
  data: {
    liquidity: TransactionsAndLiquidityData,
    transfers: TransactionsAndLiquidityData,
    sales: TransactionsAndLiquidityData,
  }
}

type TradersAndHoldersData = {
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
export interface TradersAndHolders {
  errorCode: number;
  data: {
    holders: TradersAndHoldersData,
    buyers: TradersAndHoldersData,
    sellers: TradersAndHoldersData,
  }
}

type Owner = {
  tag: {
    addr: string,
    ensName: string | undefined,
    isSuperBlueChipHolder: boolean,
    isWhale: boolean,
  }
}
export type TopSale = {
  tokenId: string,
  name: string,
  image: string,
  lastSale: {
    ethPrice: number,
    timestamp: number,
  },
  highestSale: {
    ethPrice: number
  },
  owners: Owner[],
  saleNum24h: number,
}
export interface TopSales {
  errorCode: number;
  data: TopSale[]
}
