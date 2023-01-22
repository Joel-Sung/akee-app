import { Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getKeywordCollections } from "../../api/home/homeCalls";
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
  const [collName, setCollName] = useState('');
  const [collDesc, setCollDesc] = useState('');
  const [logoSrc, setLogoSrc] = useState('');
  const [bannerSrc, setBannerSrc] = useState('');

  const router = useRouter();

  useEffect(()=> {
    if(!router.isReady) return;
    async function fetchData() {
      await getKeywordCollections(router.query.collection as string).then((responseJSON) => {
        if (responseJSON.data.collections[0] !== undefined) {
          setCid(responseJSON.data.collections[0].id);
          setCollName(responseJSON.data.collections[0].name);
          setCollDesc(responseJSON.data.collections[0].longDesc);
          setLogoSrc(responseJSON.data.collections[0].logo);
          setBannerSrc(responseJSON.data.collections[0].bannerImageUrl);
        } else {
          setCid('');
          setCollName('');
          setCollDesc('');
          setLogoSrc('');
          setBannerSrc('');
        }
        });
    }
    fetchData();
  }, [router.isReady]);

  const listHeight = 1395;

  return (
    <>
      {cid !== ''
        ? 
          <CollectionLayout
            currLink="overview"
            cid={cid}
            collName={collName}
            collDesc={collDesc}
            logoSrc={logoSrc}
            bannerSrc={bannerSrc}
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