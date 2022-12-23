import { List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getSales } from "../../api/collection/protradeCalls";
import { Sale } from "../../types/collectionTypes/protradeTypes";
import { Order, sortObjectsByKey } from "../../utils/array";
import { getCurrentDate, getDiffIn24HrString, milliSecondsToDate } from "../../utils/datetime";
import { DropDown } from "../util/DropDown";
import { ETHSymbol } from "../util/Symbols";

interface ListingCellProps {
  sale: Sale;
}
function ListingCell(props: ListingCellProps) {
  const {
    sale
  } = props;
  
  return (
    <ListItem>
      <Stack direction="row" spacing={2}>
        <img 
          src={sale.asset.image}
          width={40}
          height={40}
        />

        <Stack>
          <Stack direction="row" spacing={2}>
            <Typography>#{sale.tokenId}</Typography>
            {sale.asset.rarity !== undefined && 
              <Typography color="lightblue">#{sale.asset.rarity.ranking}</Typography>
            }
            <Stack direction="row">
              <ETHSymbol />
              <Typography>{sale.tokenPrice.toFixed(2)}</Typography>
            </Stack>
          </Stack>

          <Typography>{getDiffIn24HrString(getCurrentDate(), milliSecondsToDate(sale.timestamp))}</Typography>
        </Stack>
      </Stack>
    </ListItem>
  )
}

const dropDownOptions = [
  {value: 'timestamp desc', text: 'Recently Listed'},
  {value: 'tokenPrice desc', text: 'Price: high to low'},
  {value: 'tokenPrice asc', text: 'Price: low to high'}
]

interface SalesListingsListProps {
  cid:string;
  defaultSortBy?: keyof Sale;
}
export default function SalesListingsList(props: SalesListingsListProps) {
  const {
    cid,
    defaultSortBy = 'timestamp'
  } = props;

  const [order, setOrder] = useState<Order>('desc');
  const [sortBy, setSortBy] = useState<keyof Sale>(defaultSortBy);
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(()=> {
    async function fetchData() {
      await getSales(cid).then((responseJSON) => {
        setSales(responseJSON.data);
      });
    }
    fetchData();
  }, [order, sortBy]);

  return (
    <Paper
      elevation={3}
      sx={{padding: 3}}
    >
      <Stack spacing={3}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='h4'>Sales</Typography>
          <DropDown
            currValue={sortBy + ' ' + order}
            menuItems={dropDownOptions}
            handleChange={(value:string) => {
              const [sortBy, order] = value.split(' ') as [keyof Sale, Order];
              setSortBy(sortBy);
              setOrder(order);
            }}
          />
        </Stack>
        
        <List
          sx={{height: 1130, overflow: 'auto'}}
        >
          {sortObjectsByKey(sales, sortBy, order).map((sale) => 
            {return (<ListingCell sale={sale}/>)})
          }
        </List>

      </Stack>
    </Paper>
  )
}
