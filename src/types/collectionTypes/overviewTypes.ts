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
