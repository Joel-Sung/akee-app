import { ListItem, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getSales } from "../../api/collection/protradeCalls";
import type { Sale } from "../../types/collectionTypes/protradeTypes";
import type { Order } from "../../utils/array";
import { sortObjectsByKey } from "../../utils/array";
import { getCurrentDate, getDiffInDates, milliSecondsToDate } from "../../utils/datetime";
import { ComponentContainer, ComponentHeader, ComponentList } from "../container/ComponentContainer";
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

          <Typography>{getDiffInDates(getCurrentDate(), milliSecondsToDate(sale.timestamp))}</Typography>
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
  listHeight: number;
}
export default function SalesListingsList(props: SalesListingsListProps) {
  const {
    cid,
    defaultSortBy = 'timestamp',
    listHeight
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
    <ComponentContainer>

        <ComponentHeader>
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
        </ComponentHeader>
        
        <ComponentList height={listHeight}>
          {sortObjectsByKey(sales, sortBy, order).map((sale, index) => 
            {return (<ListingCell sale={sale} key={index} />)})
          }
        </ComponentList>

    </ComponentContainer>
  )
}
