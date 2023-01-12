import type { SelectChangeEvent} from "@mui/material";
import { LinearProgress, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getListingAndSalesRatio } from "../../api/collection/protradeCalls";
import type { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { ComponentBar, ComponentContainer, ComponentHeader } from "../container/ComponentContainer";

interface RangeDropDownProps {
  currTimeRange: TimeRange;
  handleChange: (range: TimeRange) => void;
}
function RangeDropDown(props: RangeDropDownProps) {
  const {
    currTimeRange,
    handleChange,
  } = props;
  
  return (
    <Select
      value={currTimeRange}
      onChange={(event: SelectChangeEvent) => handleChange(event.target.value as TimeRange)}
    >
      <MenuItem value='5m'>5Min</MenuItem>
      <MenuItem value='15m'>15Min</MenuItem>
      <MenuItem value='30m'>30Min</MenuItem>
      <MenuItem value='1h'>1H</MenuItem>
      <MenuItem value='6h'>6H</MenuItem>
      <MenuItem value='24h'>24H</MenuItem>
    </Select>
  )
}
interface ListingAndSalesRatioChartProps {
  cid:string;
  defaultTimeRange?: TimeRange;
}
export default function ListingAndSalesRatioChart(props: ListingAndSalesRatioChartProps) {
  const {
    cid,
    defaultTimeRange = '1h',
  } = props;

  const [timeRange, setTimeRange] = useState<TimeRange>(defaultTimeRange);
  const [listedSaleRatio, setListedSaleRatio] = useState<number | null>(null);
  const [salesCount, setSalesCount] = useState<number | null>(null);
  const [delistedCount, setDelistedCount] = useState<number | null>(null);

  useEffect(()=> {
    async function fetchData() {
      await getListingAndSalesRatio(cid, timeRange).then((responseJSON) => {
        setListedSaleRatio(responseJSON.data.ListedSaleRatio);
        setSalesCount(responseJSON.data.salesCount);
        setDelistedCount(responseJSON.data.newListedCount);
      });
    }
    fetchData();
  }, [timeRange]);

  function onRangeChange(range: TimeRange) {
    setTimeRange(range);
  }

  return (
    <ComponentContainer>
      <ComponentHeader>
        <Typography variant='h4'>Listing & Sales Ratio</Typography>
        <RangeDropDown currTimeRange={timeRange} handleChange={onRangeChange}/>
      </ComponentHeader>

      <ComponentBar>
        <Typography variant='subtitle2'>{listedSaleRatio === null ? '' : `${(listedSaleRatio * 100).toFixed(2)}%`}</Typography>
        <LinearProgress
          variant="determinate"
          value={listedSaleRatio === null ? 0 : listedSaleRatio * 100}
          sx={{ height: 10 }}
        />
        <Stack direction='row' justifyContent='space-between'>
          <Typography>{delistedCount} New Listings</Typography>
          <Typography>{salesCount} Sales</Typography>
        </Stack>
      </ComponentBar>

    </ComponentContainer>
  )
}