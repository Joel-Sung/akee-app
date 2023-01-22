import { Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getKeywordCollections } from "../../api/home/homeCalls";
import MktSentimentMeter from "../../components/barometer/MktSentimentMeter";
import MktCapAndVolChart from "../../components/chart/MktCapAndVolChart";
import PriceAndSalesChart from "../../components/chart/PriceAndSalesChart";
import TradersAndHoldersChart from "../../components/chart/TradersAndHoldersChart";
import TransactionsAndLiquidityChart from "../../components/chart/TransactionsAndLiquidityChart";
import CollectionLayout from "../../components/layout/CollectionLayout";
import LoadingLayout from "../../components/layout/LoadingLayout";
import TopSalesTable from "../../components/table/TopSalesTable";
import { spacingMedium } from "../../utils/format";

export default function CollectionOverviewPage() {
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
            <Stack spacing={spacingMedium}>

              <Stack direction='row'>
                <Box flexBasis='25%'>
                  <MktSentimentMeter />
                </Box>
              </Stack>

              <PriceAndSalesChart cid={cid} />

              <MktCapAndVolChart cid={cid} />

              <Stack direction='row' justifyContent="space-between">

                <Box flexBasis='49%'>
                  <TransactionsAndLiquidityChart cid={cid} />
                </Box>
                
                <Box flexBasis='49%'>
                  <TradersAndHoldersChart cid={cid} />
                </Box>
                
              </Stack>

              <TopSalesTable cid={cid} />
              
            </Stack>
          </CollectionLayout>
          
        : <LoadingLayout currTab="" />
      }
    </>
  )
}
