import { MenuItem, Paper, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { getListingAndSalesRatio } from "../../api/collection/protradeCalls";
import { TimeRange } from "../../types/collectionTypes/collectionTypes";

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
    defaultTimeRange = '1h'
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
        setDelistedCount(responseJSON.data.delistedCount);
      });
    }
    fetchData();
  }, [timeRange]);

  function onRangeChange(range: TimeRange) {
    setTimeRange(range);
  }

  return (
    <Paper
      elevation={3}
      sx={{padding: 3}}
    >
      <Stack spacing={3}>
        <Stack direction='row' justifyContent='space-between'>
          <Stack>
            <Typography variant='h6'>Listing & Sales Ratio</Typography>
            {listedSaleRatio != null &&
              <Typography variant='subtitle2'>{(listedSaleRatio * 100).toFixed(2)}%</Typography>
            } 
          </Stack>
          <RangeDropDown currTimeRange={timeRange} handleChange={onRangeChange}/>
        </Stack>
        
        {listedSaleRatio != null &&
          <LinearProgress
            variant="determinate"
            value={listedSaleRatio * 100}
            sx={{ height: 10 }}
          />
        }

        <Stack direction='row' justifyContent='space-between'>
          <Typography>{delistedCount} New Listings</Typography>
          <Typography>{salesCount} Sales</Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}