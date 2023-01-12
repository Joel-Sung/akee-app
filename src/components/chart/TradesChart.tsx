import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getTrade } from "../../api/collection/protradeCalls";
import type { TimeRange } from "../../types/collectionTypes/collectionTypes";
import type { TradeBin } from "../../types/collectionTypes/protradeTypes";
import { zipCoords } from "../../utils/array";
import { getTimeRangeTickLimit } from "../../utils/chart";
import { formatDateTimeAxisLabel, msArrayToDateTimeStringArray } from "../../utils/datetime";
import { ComponentChart, ComponentContainer, ComponentHeader, ComponentInfo } from "../container/ComponentContainer";
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
    initialRange = '24h',
  } = props;
  
  const [chartLabels, setChartLabels] = useState<(string | null)[]>([]);
  const [priceData, setPriceData] = useState<any[]>([]);
  const [volData, setVolData] = useState<any[]>([]);
  
  const [normalSales, setNormalSales] = useState<number | null>(null);
  const [whaleSales, setWhaleSales] = useState<number | null>(null);

  const [chartRange, setChartRange] = useState<TimeRange>(initialRange);

  useEffect(()=> {
    async function fetchData() {
      await getTrade(cid, chartRange).then((responseJSON) => {
        const scatterX = responseJSON.data.scatterPlotsChart.values.x;
        const scatterY = responseJSON.data.scatterPlotsChart.values.y;
        const scatterCoords = zipCoords(scatterX,scatterY);
        setPriceData(scatterCoords);

        setChartLabels(msArrayToDateTimeStringArray(responseJSON.data.histogramChart.x));
        setVolData(responseJSON.data.histogramChart.bins.map((bin: TradeBin) => bin.ethVolume));

        setNormalSales(responseJSON.data.scatterPlotsChart.meta.stats.normalSalesNum);
        setWhaleSales(responseJSON.data.scatterPlotsChart.meta.stats.whaleSalesNum);
      });
    }
    fetchData();
  }, [chartRange]);

  return (
    <ComponentContainer>

        <ComponentHeader>
          <Typography variant='h4'>Trades</Typography>
          <DropDown
            currValue={chartRange}
            menuItems={dropDownOptions}
            handleChange={(value) => setChartRange(value as TimeRange)}
          />
        </ComponentHeader>

        <ComponentInfo>
          <ValueCard title='Normal Sales' value={normalSales} />
          <ValueCard title='Whale Sales' value={whaleSales} />
        </ComponentInfo>
        
        <ComponentChart>
          <TwoGraphChart
            chartType="scatter"
            labels={chartLabels}

            g1Label="ETH volume"
            g1Type="bar"
            g1Data={volData}
            x1TickLimit={getTimeRangeTickLimit(chartRange)}
            x1Callback={(value: any, index: any, values: any) => {
              return formatDateTimeAxisLabel(chartLabels[index], chartRange);
            }}
            y1Show={false}

            g2Label="Price"
            g2Type="scatter"
            g2Data={priceData}
            x2Cat="linear"
            y2Show={true}
          />
        </ComponentChart>
        
    </ComponentContainer>
  )
}