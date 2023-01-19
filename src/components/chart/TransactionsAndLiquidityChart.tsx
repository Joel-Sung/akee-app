import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getTransactionsAndLiquidity } from "../../api/collection/analyticsCalls";
import type { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { getTimeRangeTickLimit, printTimeRange } from "../../utils/chart";
import { formatDateTimeAxisLabel, msArrayToDateTimeStringArray } from "../../utils/datetime";
import { ComponentChart, ComponentContainer, ComponentHeader, ComponentInfo, headerVariant } from "../container/ComponentContainer";
import { DropDown } from "../util/DropDown";
import { ValueCard } from "../util/ValueCard";
import ThreeGraphChart from "./ThreeGraphChart";

const dropDownOptions = [
  {value: '24h', text: '24H'},
  {value: '7d', text: '7D'},
  {value: '30d', text: '30D'},
  {value: '3M', text: '3M'},
  {value: '1y', text: '1Y'},
  {value: 'all', text: 'All'},
]

interface TransactionsAndLiquidityChartProps {
  cid: string;
  initialRange?: TimeRange;
}
export default function TransactionsAndLiquidityChart(props: TransactionsAndLiquidityChartProps) {
  const {
    cid,
    initialRange = '7d',
  } = props;
  
  const [chartRange, setChartRange] = useState<TimeRange>(initialRange);
  
  const [transfersLabels, setTransfersLabels] = useState<(string | null)[]>([]);
  const [transfersData, setTransfersData] = useState<any[]>([]);
  const [liquidityData, setLiquidityData] = useState<any[]>([]);
  const [salesData, setSalesData] = useState<any[]>([]);
  
  const [transfers, setTransfers] = useState<number | null>(null);
  const [transfersDelta, setTransfersDelta] = useState<number | null>(null);
  const [liquidity, setLiquidity] = useState<number | null>(null);
  const [liquidityDelta, setLiquidityDelta] = useState<number | null>(null);
  const [sales, setSales] = useState<number | null>(null);
  const [salesDelta, setSalesDelta] = useState<number | null>(null);

  useEffect(()=> {
    async function fetchData() {
      await getTransactionsAndLiquidity(cid, chartRange).then((responseJSON) => {
        setTransfersLabels(msArrayToDateTimeStringArray(responseJSON.data.transfers.values.x));
        setTransfersData(responseJSON.data.transfers.values.y);
        setLiquidityData(responseJSON.data.liquidity.values.y.map((value: number | null) => 
          value === null ? null : (value * 100).toFixed(2)
        ));
        setSalesData(responseJSON.data.sales.values.y);

        setTransfers(responseJSON.data.transfers.meta.value);
        setTransfersDelta(responseJSON.data.transfers.meta.delta);
        setLiquidity(responseJSON.data.liquidity.meta.value);
        setLiquidityDelta(responseJSON.data.liquidity.meta.delta);
        setSales(responseJSON.data.sales.meta.value);
        setSalesDelta(responseJSON.data.sales.meta.delta);
      });
    }
    fetchData();
  }, [chartRange]);

  return (
    <ComponentContainer>

        <ComponentHeader>
          <Typography variant={headerVariant}>Transactions & Liquidity</Typography>
          <DropDown
            currValue={chartRange}
            menuItems={dropDownOptions}
            handleChange={(value) => setChartRange(value as TimeRange)}
          />
        </ComponentHeader>

        <ComponentInfo>
          <ValueCard title={'Sales(' + printTimeRange(chartRange) + ')'} 
            value={sales} delta={salesDelta}/>
          <ValueCard title={'Transfers(' + printTimeRange(chartRange) + ')'} 
            value={transfers} delta={transfersDelta} isShorten={true}/>
          <ValueCard title={'Liquidity(' + printTimeRange(chartRange) + ')'} 
            value={liquidity} delta={liquidityDelta} isPercentage={true}/>
        </ComponentInfo>
        
        <ComponentChart>
          <ThreeGraphChart
            chartType="bar"
            labels={transfersLabels}

            g1Label="Transfers"
            g1Type="bar"
            g1Data={transfersData}
            x1TickLimit={getTimeRangeTickLimit(chartRange)}
            x1Callback={(value: any, index: any, values: any) => {
              return formatDateTimeAxisLabel(transfersLabels[index], chartRange);
            }}

            g2Label="Liquidity"
            g2Type="bar"
            g2Data={liquidityData}
            x2AxisID="x1"
            
            g3Label="Sales"
            g3Type="line"
            g3Data={salesData}
            x3AxisID="x1"
            g3ShowLine={true}
          />
        </ComponentChart>

    </ComponentContainer>
  )
}