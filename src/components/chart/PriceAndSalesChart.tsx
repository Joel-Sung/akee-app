import { Paper, Stack, Typography } from "@mui/material";
import { CoreScaleOptions, Scale } from "chart.js";
import { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { getPriceAndSales } from "../../api/collection/overviewCalls";
import { chartData } from "../../types/chartTypes";
import { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { zipCoords } from "../../utils/array";
import { get24HrTimeString, getDateString, milliSecondsToDate } from "../../utils/datetime";
import { paddingComponent, paperElevation, spacingComponent } from "../../utils/format";
import { BarButtonType, SelectionBar } from "../util/SelectionBar";
import { ValueCard } from "../util/ValueCard";

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
  initialRange: TimeRange;
}
export default function PriceAndSalesChart(props: PriceAndSalesChartProps) {
  const {
    cid,
    initialRange
  } = props;
  
  const [avgPriceData, setAvgPriceData] = useState<chartData>({
    datasets: [
      {
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        showLine: true,
      }
    ],
  });
  
  const [avgPrice, setAvgPrice] = useState<number | null>(null);
  const [floorPrice, setFloorPrice] = useState<number | null>(null);
  const [chartRange, setChartRange] = useState<TimeRange>(initialRange);

  useEffect(()=> {
    async function fetchData() {
      await getPriceAndSales(cid, chartRange).then((responseJSON) => {
        const x = responseJSON.data.avgPrice.values.x;
        const y = responseJSON.data.avgPrice.values.y;
        const coords = zipCoords(x,y);
        setAvgPriceData({
          datasets: [
            {
              data: coords,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              showLine: true
            },
          ],
        });

        setAvgPrice(responseJSON.data.avgPrice.meta.value);
        setFloorPrice(responseJSON.data.floorPrice.meta.value);
      });
    }
    fetchData();
  }, [chartRange]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function(this: Scale<CoreScaleOptions>, tickValue: string | number, index: number) {
            const date:Date = milliSecondsToDate(tickValue as number);
            return chartRange === '24h'
             ? get24HrTimeString(date)
             : getDateString(date);
          },
        }
      },
    }
  }

  return (
    <Paper
      elevation={paperElevation}
      sx={{padding: paddingComponent}}
    >
      <Stack spacing={spacingComponent}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h4'>Price & Sales</Typography>
          <SelectionBar 
            currSelection={chartRange} 
            selections={rangeButtons} 
            handleChange={(range) => setChartRange(range)}
          />
        </Stack>

        <Stack direction='row' spacing={2}>
          <ValueCard title='Floor Price' value={floorPrice === null ? 'null' : floorPrice.toFixed(2)} />
          <ValueCard title='Avg Price' value={avgPrice === null ? 'null' : avgPrice.toFixed(2)} />
        </Stack>
        
        <Scatter
          data={avgPriceData}
          width={100}
          height={30}
          options={chartOptions}
        />
      </Stack>
    </Paper>
  )
}