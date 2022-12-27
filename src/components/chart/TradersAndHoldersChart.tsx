import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getTradersAndHolders } from "../../api/collection/analyticsCalls";
import { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { getTimeRangeTickLimit, printTimeRange } from "../../utils/chart";
import { printMilliSecondsAsDate } from "../../utils/datetime";
import { ComponentChart, ComponentContainer, ComponentHeader, ComponentInfo } from "../container/ComponentContainer";
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

interface TradersAndHoldersChartProps {
  cid: string;
  initialRange?: TimeRange;
}
export default function TradersAndHoldersChart(props: TradersAndHoldersChartProps) {
  const {
    cid,
    initialRange = '7d'
  } = props;
  
  const [chartRange, setChartRange] = useState<TimeRange>(initialRange);
  
  const [buyersLabels, setBuyersLabels] = useState<(string | null)[]>([]);
  const [buyersData, setBuyersData] = useState<any[]>([]);
  const [sellersData, setSellersData] = useState<any[]>([]);
  const [holdersData, setHoldersData] = useState<any[]>([]);
  
  const [buyers, setBuyers] = useState<number | null>(null);
  const [buyersDelta, setBuyersDelta] = useState<number | null>(null);
  const [sellers, setSellers] = useState<number | null>(null);
  const [sellersDelta, setSellersDelta] = useState<number | null>(null);
  const [holders, setHolders] = useState<number | null>(null);
  const [holdersDelta, setHoldersDelta] = useState<number | null>(null);

  useEffect(()=> {
    async function fetchData() {
      await getTradersAndHolders(cid, chartRange).then((responseJSON) => {
        setBuyersLabels(responseJSON.data.buyers.values.x.map((x: number | null) => {
          if (x === null) return null;
          return printMilliSecondsAsDate(x,chartRange);
        }));
        setBuyersData(responseJSON.data.buyers.values.y);
        setSellersData(responseJSON.data.sellers.values.y);
        setHoldersData(responseJSON.data.holders.values.y);

        setBuyers(responseJSON.data.buyers.meta.value);
        setBuyersDelta(responseJSON.data.buyers.meta.delta);
        setSellers(responseJSON.data.sellers.meta.value);
        setSellersDelta(responseJSON.data.sellers.meta.delta);
        setHolders(responseJSON.data.holders.meta.value);
        setHoldersDelta(responseJSON.data.holders.meta.delta);
      });
    }
    fetchData();
  }, [chartRange]);

  return (
    <ComponentContainer>

        <ComponentHeader>
          <Typography variant='h4'>Traders & Holders</Typography>
          <DropDown
            currValue={chartRange}
            menuItems={dropDownOptions}
            handleChange={(value) => setChartRange(value as TimeRange)}
          />
        </ComponentHeader>

        <ComponentInfo>
          <ValueCard title={'Buyers(' + printTimeRange(chartRange) + ')'} value={buyers}
            delta={buyersDelta === null ? null : buyersDelta}/>
          <ValueCard title={'Sellers(' + printTimeRange(chartRange) + ')'} value={sellers}
            delta={sellersDelta === null ? null : sellersDelta}/>
          <ValueCard title={'Holders'} value={holders} 
            delta={holdersDelta === null ? null : holdersDelta}/>
        </ComponentInfo>
        
        <ComponentChart>
          <ThreeGraphChart
            chartType="bar"
            labels={buyersLabels}

            g1Label="Buyers"
            g1Type="bar"
            g1Data={buyersData}
            x1TickLimit={getTimeRangeTickLimit(chartRange)}

            g2Label="Sellers"
            g2Type="bar"
            g2Data={sellersData}
            x2AxisID="x1"
            y2AxisID="y1"

            g3Label="Holders"
            g3Type="line"
            g3Data={holdersData}
            g3ShowLine={true}
            
          />
        </ComponentChart>
        
    </ComponentContainer>
  )
}