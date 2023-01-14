import { Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MktSentimentMeter from "../../components/barometer/MktSentimentMeter";
import PriceAndSalesChart from "../../components/chart/PriceAndSalesChart";
import CollectionLayout from "../../components/layout/CollectionLayout";
import LoadingLayout from "../../components/layout/LoadingLayout";
import { spacingMedium } from "../../utils/format";

export default function CollectionPage() {
  const [cid, setCid] = useState('');

  const router = useRouter();

  useEffect(()=> {
    if(!router.isReady) return;
    setCid(router.query.collection as string);
  }, [router.isReady]);

  return (
    <>
      {cid !== ''
        ? 
          <CollectionLayout
            currLink="overview"
            cid={cid}
          >
            <Stack spacing={spacingMedium}>

              <Stack direction='row'>
                <Box flexBasis='33%'>
                  <MktSentimentMeter />
                </Box>
              </Stack>

              <PriceAndSalesChart cid={cid} />
              
            </Stack>
          </CollectionLayout>
          
        : <LoadingLayout currTab="top" />
      }
    </>
  )
}