import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getMarketCapAndVolume } from "../../api/collection/analyticsCalls";
import type { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { getTimeRangeTickLimit } from "../../utils/chart";
import { formatDateTimeAxisLabel, msArrayToDateTimeStringArray } from "../../utils/datetime";
import { spacingMedium } from "../../utils/format";
import type { BarButtonType } from "../bar/SelectionBar";
import { SelectionBar } from "../bar/SelectionBar";
import { ComponentChart, ComponentContainer, ComponentHeader, ComponentInfo, headerVariant } from "../container/ComponentContainer";
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
  const [mktCapETH, setMktCapETH] = useState<number>(0);
  const [mktCapETHDelta, setMktCapETHDelta] = useState<number>(0);
  const [volETH, setVolETH] = useState<number>(0);
  const [volETHDelta, setVolETHDelta] = useState<number>(0);

  const [usdLabels, setUsdLabels] = useState<any[]>([]);
  const [usdG1Data, setUsdG1Data] = useState<any[]>([]);
  const [usdG2Data, setUsdG2Data] = useState<any[]>([]);
  const [mktCapUSD, setMktCapUSD] = useState<number>(0);
  const [mktCapUSDDelta, setMktCapUSDDelta] = useState<number>(0);
  const [volUSD, setVolUSD] = useState<number>(0);
  const [volUSDDelta, setVolUSDDelta] = useState<number>(0);
  
  useEffect(()=> {
    async function fetchData() {
      await getMarketCapAndVolume(cid, chartRange).then((responseJSON) => {
        setEthLabels(msArrayToDateTimeStringArray(responseJSON.data.volumeEth.values.x));
        setEthG1Data(responseJSON.data.marketCapEth.values.y);
        setEthG2Data(responseJSON.data.volumeEth.values.y);
        setMktCapETH(responseJSON.data.marketCapEth.meta.value);
        setMktCapETHDelta(responseJSON.data.marketCapEth.meta.delta);
        setVolETH(responseJSON.data.volumeEth.meta.value);
        setVolETHDelta(responseJSON.data.volumeEth.meta.delta);
        
        setUsdLabels(msArrayToDateTimeStringArray(responseJSON.data.volume.values.x));
        setUsdG1Data(responseJSON.data.marketCap.values.y);
        setUsdG2Data(responseJSON.data.volume.values.y);
        setMktCapUSD(responseJSON.data.marketCap.meta.value);
        setMktCapUSDDelta(responseJSON.data.marketCap.meta.delta);
        setVolUSD(responseJSON.data.volume.meta.value);
        setVolUSDDelta(responseJSON.data.volume.meta.delta);
      });
    }
    fetchData();
  }, [chartRange]);

  return (
    <ComponentContainer>

      <ComponentHeader>
        <Typography variant={headerVariant}>Market Cap & Volume</Typography>
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
        <ValueCard title="Market Cap" 
          value={currChart === 'ETH' ? mktCapETH : mktCapUSD} 
          delta={currChart === 'ETH' ? mktCapETHDelta : mktCapUSDDelta}
          isETHValue={true} isShorten={true} />
        <ValueCard title="Volume" 
          value={currChart === 'ETH' ? volETH : volUSD}
          delta={currChart === 'ETH' ? volETHDelta : volUSDDelta}
          isETHValue={true} isShorten={true}/>
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