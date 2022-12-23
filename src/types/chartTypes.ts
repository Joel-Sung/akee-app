export type chartDataset = {
  data: any[],
  borderColor?: string,
  backgroundColor?: string,
  showLine?: boolean,
}
export type chartData = {
  labels?: any[],
  datasets: chartDataset[]
};