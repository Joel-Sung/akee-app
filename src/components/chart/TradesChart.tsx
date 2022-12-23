import { Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getTrade } from "../../api/collection/protradeCalls";
import { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { TradeBin } from "../../types/collectionTypes/protradeTypes";
import { zipCoords } from "../../utils/array";
import { printMilliSecondsAsDate } from "../../utils/datetime";
import { DropDown } from "../util/DropDown";
import { ValueCard } from "../util/ValueCard";
import TwoGraphChart from "./TwoGraphChart";

const dropDownOptions = [
  {value: '5m', text: '5Min'},
  {value: '15m', text: '15Min'},
  {value: '30m', text: '30Min'},
  {value: '1h', text: '1H'},
  {value: '6h', text: '6H'},
  {value: '24h', text: '24H'},
  {value: '7d', text: '7D'},
]

interface TradesChartProps {
  cid: string;
  initialRange?: TimeRange;
}
export default function TradesChart(props: TradesChartProps) {
  const {
    cid,
    initialRange = '24h'
  } = props;
  
  const [chartLabels, setChartLabels] = useState<(string | null)[]>([]);
  const [g1Data, setG1Data] = useState<any[]>([]);
  const [g2Data, setG2Data] = useState<any[]>([]);
  
  const [normalSales, setNormalSales] = useState<number | null>(null);
  const [whaleSales, setWhaleSales] = useState<number | null>(null);
  const [chartRange, setChartRange] = useState<TimeRange>(initialRange);

  useEffect(()=> {
    async function fetchData() {
      await getTrade(cid, chartRange).then((responseJSON) => {
        const scatterX = responseJSON.data.scatterPlotsChart.values.x
        const scatterY = responseJSON.data.scatterPlotsChart.values.y;
        const scatterCoords = zipCoords(scatterX,scatterY);

        setChartLabels(responseJSON.data.histogramChart.x.map((x: number | null) => {
          if (x === null) return null;
          return printMilliSecondsAsDate(x,chartRange);
        }));
        setG1Data(scatterCoords);
        setG2Data(responseJSON.data.histogramChart.bins.map((bin: TradeBin) => bin.ethVolume));

        setNormalSales(responseJSON.data.scatterPlotsChart.meta.stats.normalSalesNum);
        setWhaleSales(responseJSON.data.scatterPlotsChart.meta.stats.whaleSalesNum);
      });
    }
    fetchData();
  }, [chartRange]);

  return (
    <Paper
      elevation={3}
      sx={{padding: 5}}
    >
      <Stack spacing={3}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h4'>Trades</Typography>
          <DropDown
            currValue={chartRange}
            menuItems={dropDownOptions}
            handleChange={(value) => setChartRange(value as TimeRange)}
          />
        </Stack>

        <Stack direction='row' spacing={2}>
          <ValueCard title='Normal Sales' value={normalSales} />
          <ValueCard title='Whale Sales' value={whaleSales} />
        </Stack>
        
        <TwoGraphChart
          chartType="scatter"
          labels={chartLabels}
          g1Label="Price"
          g1Type="scatter"
          g1Data={g1Data}
          g2Label="ETH volume"
          g2Type="bar"
          g2Data={g2Data}
          x1Cat="linear"
        />
      </Stack>
    </Paper>
  )
}