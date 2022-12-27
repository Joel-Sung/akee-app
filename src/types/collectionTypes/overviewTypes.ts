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
type ScatterComponent = {
  values: {
    x: (number | null)[],
    y: (number | null)[]
  },
  meta: {
    name: string,
    value: number,
    usdValue: number | null,
    aggregations: {
      normalSales: number,
      whaleSales: number,
    }
  }
}
export interface PriceAndSales {
  errorCode: number,
  data: {
    avgPrice: PriceAndSalesComponent,
    avgPriceUsd: PriceAndSalesComponent,
    salesScatter: ScatterComponent,
    salesScatterUsd: ScatterComponent,
    floorPrice: PriceAndSalesComponent,
    floorPriceUsd: PriceAndSalesComponent,
    volume: PriceAndSalesComponent,
    volumeEth: PriceAndSalesComponent
  }
}
