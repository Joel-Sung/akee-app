import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getPriceAndSales } from "../../api/collection/overviewCalls";
import { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { zipCoords } from "../../utils/array";
import { getTimeRangeTickLimit } from "../../utils/chart";
import { formatDateTimeAxisLabel, msArrayToDateTimeStringArray } from "../../utils/datetime";
import { ComponentChart, ComponentContainer, ComponentHeader, ComponentInfo } from "../container/ComponentContainer";
import { BarButtonType, SelectionBar } from "../util/SelectionBar";
import { ValueCard } from "../util/ValueCard";
import ThreeGraphChart from "./ThreeGraphChart";

const rangeButtons: BarButtonType<TimeRange>[] = [
  {value: '24h', text: '24H'},
  {value: '7d', text: '7D'},
  {value: '30d', text: '30D'},
  {value: '3M', text: '3M'},
  {value: '1y', text: '1Y'},
  {value: 'all', text: 'All'},
]

interface PriceAndSalesChartProps {
  cid: string;
  initialRange?: TimeRange;
}
export default function PriceAndSalesChart(props: PriceAndSalesChartProps) {
  const {
    cid,
    initialRange = '7d',
  } = props;
  
  const [chartLabels, setChartLabels] = useState<any[]>([]);

  const [avgPriceData, setAvgPriceData] = useState<any[]>([]);
  const [floorPriceData, setFloorPriceData] = useState<any[]>([]);
  const [volumeData, setVolumeData] = useState<any[]>([]);
  
  const [avgPrice, setAvgPrice] = useState<number | null>(null);
  const [avgPriceDelta, setAvgPriceDelta] = useState<number | null>(null);
  const [floorPrice, setFloorPrice] = useState<number | null>(null);
  const [floorPriceDelta, setFloorPriceDelta] = useState<number | null>(null);
  const [normalSales, setNormalSales] = useState<number | null>(null);
  const [whaleSales, setWhaleSales] = useState<number | null>(null);

  const [chartRange, setChartRange] = useState<TimeRange>(initialRange);


  useEffect(()=> {
    async function fetchData() {
      await getPriceAndSales(cid, chartRange).then((responseJSON) => {
        setChartLabels(msArrayToDateTimeStringArray(responseJSON.data.volumeEth.values.x));

        const x = responseJSON.data.avgPrice.values.x;
        const y = responseJSON.data.avgPrice.values.y;
        setAvgPriceData(zipCoords(x,y));
        setFloorPriceData(responseJSON.data.floorPrice.values.y);
        setVolumeData(responseJSON.data.volumeEth.values.y);

        setAvgPrice(responseJSON.data.avgPrice.meta.value);
        setAvgPriceDelta(responseJSON.data.avgPrice.meta.delta);
        setFloorPrice(responseJSON.data.floorPrice.meta.value);
        setFloorPriceDelta(responseJSON.data.floorPrice.meta.delta);
        setNormalSales(responseJSON.data.salesScatter.meta.aggregations.normalSales);
        setWhaleSales(responseJSON.data.salesScatter.meta.aggregations.whaleSales);
      });
    }
    fetchData();
  }, [chartRange]);

  return (
    <ComponentContainer>

        <ComponentHeader>
          <Typography variant='h4'>Price & Sales</Typography>
          <SelectionBar 
            currSelection={chartRange} 
            selections={rangeButtons} 
            handleChange={(range) => setChartRange(range)}
          />
        </ComponentHeader>

        <ComponentInfo>
          <ValueCard title='Floor Price' value={floorPrice === null ? 'null' : floorPrice.toFixed(2)} 
            delta={floorPriceDelta} />
          <ValueCard title='Avg Price' value={avgPrice === null ? 'null' : avgPrice.toFixed(2)} 
            delta={avgPriceDelta} />
          <ValueCard title='Normal Sales' value={normalSales} />
          <ValueCard title='Whale Sales' value={whaleSales} />
        </ComponentInfo>
        
        <ComponentChart>
          <ThreeGraphChart
            chartType="scatter"
            labels={chartLabels}

            g1Label="Volume"
            g1Type="bar"
            g1Data={volumeData}
            x1TickLimit={getTimeRangeTickLimit(chartRange)}
            x1Callback={(value: any, index: any, values: any) => {
              return formatDateTimeAxisLabel(chartLabels[index], chartRange);
            }}
            y1Show={false}

            g2Label="Floor Price"
            g2Type="line"
            g2Data={floorPriceData}
            g2ShowLine={true}

            g3Label="Avg Price"
            g3Type="scatter"
            g3Data={avgPriceData}
            x3Cat="linear"
            y3Show={true}
            
          />
        </ComponentChart>
        
    </ComponentContainer>
  )
}