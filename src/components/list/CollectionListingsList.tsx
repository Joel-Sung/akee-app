import { List, ListItem, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getListings } from "../../api/collection/protradeCalls";
import { Listing } from "../../types/collectionTypes/protradeTypes";
import { Order, sortObjectsByKey } from "../../utils/array";
import { getCurrentDate, getDiffInDates, milliSecondsToDate } from "../../utils/datetime";
import { ComponentContainer, ComponentHeader, ComponentList } from "../container/ComponentContainer";
import { DropDown } from "../util/DropDown";
import { ETHSymbol } from "../util/Symbols";

interface ListingCellProps {
  listing: Listing;
}
function ListingCell(props: ListingCellProps) {
  const {
    listing
  } = props;

  return (
    <ListItem>
      <Stack direction="row" spacing={2}>
        <img 
          src={listing.asset.image}
          width={40}
          height={40}
        />

        <Stack>
          <Stack direction="row" spacing={2}>
            <Typography>#{listing.tokenId}</Typography>
            {listing.asset.rarity !== undefined && 
              <Typography color="lightblue">#{listing.asset.rarity.ranking}</Typography>
            }
            <Stack direction="row">
              <ETHSymbol />
              <Typography>{listing.ethPrice.toFixed(2)}</Typography>
            </Stack>
          </Stack>

          <Typography>{getDiffInDates(getCurrentDate(), milliSecondsToDate(listing.listingTime))}</Typography>
        </Stack>
      </Stack>
    </ListItem>
  )
}

const dropDownOptions = [
  {value: 'listingTime desc', text: 'Recently Listed'},
  {value: 'ethPrice desc', text: 'Price: high to low'},
  {value: 'ethPrice asc', text: 'Price: low to high'}
]

interface CollectionListingsListProps {
  cid:string;
  defaultSortBy?: keyof Listing;
  listHeight: number;
}
export default function CollectionListingsList(props: CollectionListingsListProps) {
  const {
    cid,
    defaultSortBy = 'listingTime',
    listHeight
  } = props;

  const [order, setOrder] = useState<Order>('desc');
  const [sortBy, setSortBy] = useState<keyof Listing>(defaultSortBy);
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(()=> {
    async function fetchData() {
      await getListings(cid).then((responseJSON) => {
        setListings(responseJSON.data);
      });
    }
    fetchData();
  }, [order, sortBy]);

  return (
    <ComponentContainer>
      
      <ComponentHeader>
        <Typography variant='h4'>Listings</Typography>
        <DropDown
          currValue={sortBy + ' ' + order}
          menuItems={dropDownOptions}
          handleChange={(value) => {
            const [sortBy, order] = value.split(' ') as [keyof Listing, Order];
            setSortBy(sortBy);
            setOrder(order);
          }}
        />
      </ComponentHeader>
      
      <ComponentList height={listHeight}>
        <List>
          {sortObjectsByKey(listings, sortBy, order).map((listing) => 
            {return (<ListingCell listing={listing}/>)})
          }
        </List>
      </ComponentList>
    </ComponentContainer>
  )
}
