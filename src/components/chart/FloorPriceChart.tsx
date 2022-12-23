import { Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getFloorPrices } from "../../api/collection/protradeCalls";
import { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { TradeBin } from "../../types/collectionTypes/protradeTypes";
import { printMilliSecondsAsDate } from "../../utils/datetime";
import { DropDown } from "../util/DropDown";
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

interface FloorPriceChartProps {
  cid: string;
  initialRange?: TimeRange;
}
export default function FloorPriceChart(props: FloorPriceChartProps) {
  const {
    cid,
    initialRange = '24h'
  } = props;
  
  const [chartLabels, setChartLabels] = useState<(string | null)[]>([]);
  const [g1Data, setG1Data] = useState<any[]>([]);
  const [g2Data, setG2Data] = useState<any[]>([]);
  const [chartRange, setChartRange] = useState<TimeRange>(initialRange);

  useEffect(()=> {
    async function fetchData() {
      await getFloorPrices(cid, chartRange).then((responseJSON) => {
        setChartLabels(responseJSON.data.histogramChart.x.map((x: number | null) => {
          if (x === null) return null;
            return printMilliSecondsAsDate(x,chartRange);
          })
        );
        setG1Data(responseJSON.data.histogramChart.floorPrices);
        setG2Data(responseJSON.data.histogramChart.bins.map((bin: TradeBin) => bin.ethVolume));
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
          <Typography variant='h4'>Floor Price</Typography>
          <DropDown
            currValue={chartRange}
            menuItems={dropDownOptions}
            handleChange={(value) => setChartRange(value as TimeRange)}
          />
        </Stack>

        <TwoGraphChart
          chartType="line"
          labels={chartLabels}
          g1Label="Floor Price"
          g1Type="line"
          g1ShowLine={true}
          g1Data={g1Data}
          g2Label="ETH volume"
          g2Type="bar"
          g2Data={g2Data}
        />
        
      </Stack>
    </Paper>
  )
}