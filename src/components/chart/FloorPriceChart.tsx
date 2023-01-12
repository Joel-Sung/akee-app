import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getFloorPrices } from "../../api/collection/protradeCalls";
import type { TimeRange } from "../../types/collectionTypes/collectionTypes";
import type { TradeBin } from "../../types/collectionTypes/protradeTypes";
import { getTimeRangeTickLimit } from "../../utils/chart";
import { formatDateTimeAxisLabel, msArrayToDateTimeStringArray } from "../../utils/datetime";
import { ComponentChart, ComponentContainer, ComponentHeader } from "../container/ComponentContainer";
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
    initialRange = '24h',
  } = props;
  
  const [chartLabels, setChartLabels] = useState<(string | null)[]>([]);
  
  const [floorPriceData, setFloorPriceData] = useState<any[]>([]);
  const [ethVolData, setETHVolData] = useState<any[]>([]);

  const [chartRange, setChartRange] = useState<TimeRange>(initialRange);

  useEffect(()=> {
    async function fetchData() {
      await getFloorPrices(cid, chartRange).then((responseJSON) => {
        setChartLabels(msArrayToDateTimeStringArray(responseJSON.data.histogramChart.x));
        setFloorPriceData(responseJSON.data.histogramChart.floorPrices);
        setETHVolData(responseJSON.data.histogramChart.bins.map((bin: TradeBin) => bin.ethVolume));
      });
    }
    fetchData();
  }, [chartRange]);

  return (
    <ComponentContainer>

        <ComponentHeader>
          <Typography variant='h4'>Floor Price</Typography>
          <DropDown
            currValue={chartRange}
            menuItems={dropDownOptions}
            handleChange={(value) => setChartRange(value as TimeRange)}
          />
        </ComponentHeader>

        <ComponentChart>
          <TwoGraphChart
            chartType="line"
            labels={chartLabels}

            g1Label="Floor Price"
            g1Type="line"
            g1ShowLine={true}
            g1Data={floorPriceData}
            x1TickLimit={getTimeRangeTickLimit(chartRange)}
            x1Callback={(value: any, index: any, values: any) => {
              return formatDateTimeAxisLabel(chartLabels[index], chartRange);
            }}

            g2Label="ETH volume"
            g2Type="bar"
            g2Data={ethVolData}
          />
        </ComponentChart>
        
    </ComponentContainer>
  )
}