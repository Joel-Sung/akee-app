import { Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FloorPriceChart from "../../components/chart/FloorPriceChart";
import ListingAndSalesRatioChart from "../../components/chart/ListingAndSalesRatioChart";
import TradesChart from "../../components/chart/TradesChart";
import CollectionLayout from "../../components/layout/CollectionLayout";
import LoadingLayout from "../../components/layout/LoadingLayout";
import CollectionListingsList from "../../components/list/CollectionListingsList";
import SalesListingsList from "../../components/list/SalesListingsList";
import { spacingMedium } from "../../utils/format";

export default function ProTrade() {
  // Currently unused page
  const [cid, setCid] = useState('');

  const router = useRouter();

  useEffect(()=> {
    if(!router.isReady) return;
    setCid(router.query.collection as string);
  }, [router.isReady]);

  const listHeight = 1395;

  return (
    <>
      {cid !== ''
        ? 
          <CollectionLayout
            currLink="overview"
            cid={cid}
          >
            <Stack direction='row' justifyContent='space-between'>

              <Box flexBasis="26%">
                <CollectionListingsList cid={cid} listHeight={listHeight} />
              </Box>
              
              <Box flexBasis="26%">
                <SalesListingsList cid={cid} listHeight={listHeight} />
              </Box>

              <Stack spacing={spacingMedium} flexBasis="43%">

                <ListingAndSalesRatioChart cid={cid} />

                <TradesChart cid={cid} />
                
                <FloorPriceChart cid={cid} />

              </Stack>
              
            </Stack>
          </CollectionLayout>
          
        : <LoadingLayout currTab="" />
      }
    </>
  )
}