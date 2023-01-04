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
