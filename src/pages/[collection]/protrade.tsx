import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FloorPriceChart from "../../components/chart/FloorPriceChart";
import ListingAndSalesRatioChart from "../../components/chart/ListingAndSalesRatioChart";
import TradesChart from "../../components/chart/TradesChart";
import CollectionLayout from "../../components/layout/CollectionLayout";
import CollectionListingsList from "../../components/list/CollectionListingsList";
import SalesListingsList from "../../components/list/SalesListingsList";

export default function ProTrade() {
  const [cid, setCid] = useState('');

  const router = useRouter();

  useEffect(()=> {
    if(!router.isReady) return;
    setCid(router.query.collection as string);
  }, [router.isReady]);

  return (
    <CollectionLayout
      currLink="protrade"
      cid={cid}
    >
      {cid !== '' &&
        <Stack direction='row' justifyContent='space-between'>
          <CollectionListingsList
              cid={cid}
            />
          
          <SalesListingsList 
              cid={cid}
            />

          <Stack flexBasis='50%' spacing={2}>
            <ListingAndSalesRatioChart 
              cid={cid}
            />
            <TradesChart
              cid={cid}
            />
            <FloorPriceChart
              cid={cid}
            />
          </Stack>
        </Stack>
      }
    </CollectionLayout>
  )
}