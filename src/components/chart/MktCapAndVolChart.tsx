import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getMarketCapAndVolume } from "../../api/collection/analyticsCalls";
import { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { getTimeRangeTickLimit } from "../../utils/chart";
import { formatDateTimeAxisLabel, msArrayToDateTimeStringArray } from "../../utils/datetime";
import { spacingMedium } from "../../utils/format";
import { ComponentChart, ComponentContainer, ComponentHeader, ComponentInfo } from "../container/ComponentContainer";
import { BarButtonType, SelectionBar } from "../util/SelectionBar";
import { ValueCard } from "../util/ValueCard";
import TwoGraphChart from "./TwoGraphChart";

const chartTypeButtons: BarButtonType<'ETH' | 'USD'>[] = [
  {value: 'ETH', text: 'ETH'},
  {value: 'USD', text: 'USD'},
]
const rangeButtons: BarButtonType<TimeRange>[] = [
  {value: '24h', text: '24H'},
  {value: '7d', text: '7D'},
  {value: '30d', text: '30D'},
  {value: '3M', text: '3M'},
  {value: '1y', text: '1Y'},
  {value: 'all', text: 'All'},
]

interface MktCapAndVolChartProps {
  cid: string;
  initialRange?: TimeRange;
}
export default function MktCapAndVolChart(props: MktCapAndVolChartProps) {
  const {
    cid,
    initialRange = '7d',
  } = props;
  
  const [chartRange, setChartRange] = useState<TimeRange>(initialRange);
  const [currChart, setCurrChart] = useState<'ETH' | 'USD'>('ETH');

  const [ethLabels, setEthLabels] = useState<any[]>([]);
  const [ethG1Data, setEthG1Data] = useState<any[]>([]);
  const [ethG2Data, setEthG2Data] = useState<any[]>([]);
  const [marketCapETH, setMarketCapETH] = useState<number>(0);
  const [volumeETH, setVolumeETH] = useState<number>(0);

  const [usdLabels, setUsdLabels] = useState<any[]>([]);
  const [usdG1Data, setUsdG1Data] = useState<any[]>([]);
  const [usdG2Data, setUsdG2Data] = useState<any[]>([]);
  const [marketCapUSD, setMarketCapUSD] = useState<number>(0);
  const [volumeUSD, setVolumeUSD] = useState<number>(0);
  
  useEffect(()=> {
    async function fetchData() {
      await getMarketCapAndVolume(cid, chartRange).then((responseJSON) => {
        setEthLabels(msArrayToDateTimeStringArray(responseJSON.data.volumeEth.values.x));
        setEthG1Data(responseJSON.data.marketCapEth.values.y);
        setEthG2Data(responseJSON.data.volumeEth.values.y);
        setMarketCapETH(responseJSON.data.marketCapEth.meta.value);
        setVolumeETH(responseJSON.data.volumeEth.meta.value);
        
        setUsdLabels(msArrayToDateTimeStringArray(responseJSON.data.volume.values.x));
        setUsdG1Data(responseJSON.data.marketCap.values.y);
        setUsdG2Data(responseJSON.data.volume.values.y);
        setMarketCapUSD(responseJSON.data.marketCap.meta.value);
        setVolumeUSD(responseJSON.data.volume.meta.value);
      });
    }
    fetchData();
  }, [chartRange]);

  return (
    <ComponentContainer>

      <ComponentHeader>
        <Typography variant='h4'>Market Cap & Volume</Typography>
        <Stack direction='row' spacing={spacingMedium}>
          <SelectionBar
            currSelection={currChart}
            selections={chartTypeButtons}
            handleChange={(value) => setCurrChart(value)}
          />
          <SelectionBar
            currSelection={chartRange}
            selections={rangeButtons}
            handleChange={(value) => setChartRange(value as TimeRange)}
          />
        </Stack>
      </ComponentHeader>
      
      <ComponentInfo>
        {currChart === 'ETH' 
          ? <ValueCard title="Market Cap" value={marketCapETH.toFixed(2)} />
          : <ValueCard title="Market Cap" value={marketCapUSD.toFixed(2)} />
        }
        {currChart === 'ETH' 
          ? <ValueCard title="Volume" value={volumeETH.toFixed(2)} />
          : <ValueCard title="Volume" value={volumeUSD.toFixed(2)} />
        }
      </ComponentInfo>

      <ComponentChart>
        {currChart === 'ETH'
          ? <TwoGraphChart
              chartType="line"
              labels={ethLabels}

              g1Label="Market Cap"
              g1Type="line"
              g1ShowLine={true}
              g1Data={ethG1Data}
              x1TickLimit={getTimeRangeTickLimit(chartRange)}
              x1Callback={(value: any, index: any, values: any) => {
                return formatDateTimeAxisLabel(ethLabels[index], chartRange);
              }}

              g2Label="ETH volume"
              g2Type="bar"
              g2Data={ethG2Data}
            />
          : <TwoGraphChart
              chartType="line"
              labels={usdLabels}

              g1Label="Market Cap"
              g1Type="line"
              g1ShowLine={true}
              g1Data={usdG1Data}
              x1TickLimit={getTimeRangeTickLimit(chartRange)}x1Callback={(value: any, index: any, values: any) => {
                return formatDateTimeAxisLabel(usdLabels[index], chartRange);
              }}

              g2Label="ETH volume"
              g2Type="bar"
              g2Data={usdG2Data}
              
            />
        }
      </ComponentChart>
      
    </ComponentContainer>
  )
}