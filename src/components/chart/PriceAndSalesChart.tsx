import { Button, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { getPriceAndSales } from "../../api/collectionCalls";
import { Range } from "../../types/collectionCallsTypes";
import { get24HrTimeString, getDateString, milliSecondsToDate } from "../../utils/date";

interface ValueCardProps {
  title: string;
  value: number | null;
}
function ValueCard(props: ValueCardProps) {
  const {
    title,
    value,
  } = props;
  
  return (
    <Stack>
      <Typography>{title}</Typography>
      <Typography variant='h6'>{value === null ? 'null' : value.toFixed(2)}</Typography>
    </Stack>
  )
}

interface RangeButtonProps {
  buttonRange: Range;
  text: string;
  range: Range;
  onRangeChange: (range:Range) => void;
}
function RangeButton(props: RangeButtonProps) {
  const {
    buttonRange,
    text,
    range,
    onRangeChange
  } = props;
  
  return (
    <Button 
      variant={buttonRange === range ? "outlined" : "text"}
      onClick={() => onRangeChange(buttonRange)}
    >
      {text}
    </Button>
  )
}

interface RangeBarProps {
  range: Range;
  onRangeChange: (range: Range) => void;
}
function RangeBar(props: RangeBarProps) {
  const {
    range,
    onRangeChange,
  } = props;
  
  return (
    <Paper elevation={1}>
      <RangeButton buttonRange='24h' text='24H' range={range} onRangeChange={onRangeChange}/>
      <RangeButton buttonRange='7d' text='7D' range={range} onRangeChange={onRangeChange}/>
      <RangeButton buttonRange='30d' text='30D' range={range} onRangeChange={onRangeChange}/>
      <RangeButton buttonRange='3M' text='3M' range={range} onRangeChange={onRangeChange}/>
      <RangeButton buttonRange='1y' text='1Y' range={range} onRangeChange={onRangeChange}/>
      <RangeButton buttonRange='all' text='All' range={range} onRangeChange={onRangeChange}/>
    </Paper>
  )
}

function zip(arr1: [], arr2: []) {
  return arr1.map((k, i) => {
    return {
      x: k, y: arr2[i]
    }
  });
}
interface PriceAndSalesChartProps {
  cid: string;
  initialRange: Range;
}
export default function PriceAndSalesChart(props: PriceAndSalesChartProps) {
  const {
    cid,
    initialRange
  } = props;
  
  const [avgPriceData, setAvgPriceData] = useState({
    datasets: [
      {
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        showLine: true,
      },
    ],
  });
  
  const [avgPrice, setAvgPrice] = useState<number | null>(null);
  const [floorPrice, setFloorPrice] = useState<number | null>(null);

  const [chartRange, setChartRange] = useState<Range>(initialRange);
  function onChartRangeChange(range: Range) {
    setChartRange(range);
  }

  useEffect(()=> {
    async function fetchData() {
      await getPriceAndSales(cid, chartRange).then((responseJSON) => {
        const x = responseJSON.data.avgPrice.values.x;
        const y = responseJSON.data.avgPrice.values.y;
        const coords = zip(x,y);
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

  const options = {
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
          color: 'green',
          callback: function(value:number) {
            const date:Date = milliSecondsToDate(value);
            return chartRange === '24h'
             ? get24HrTimeString(date)
             : getDateString(date);
          }
        }
      }
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{padding: 5}}
    >
      <Stack spacing={3}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h4'>Price & Sales</Typography>
          <RangeBar range={chartRange} onRangeChange={onChartRangeChange}/>
        </Stack>

        <Stack direction='row' spacing={2}>
          <ValueCard title='Floor Price' value={floorPrice} />
          <ValueCard title='Avg Price' value={avgPrice} />
        </Stack>
        
        <Scatter
          data={avgPriceData}
          width={100}
          height={30}
          options={options}
        />
      </Stack>
    </Paper>
  )
}