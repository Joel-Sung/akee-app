import { Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MktCapAndVolChart from "../../components/chart/MktCapAndVolChart";
import TradersAndHoldersChart from "../../components/chart/TradersAndHoldersChart";
import TransactionsAndLiquidityChart from "../../components/chart/TransactionsAndLiquidityChart";
import CollectionLayout from "../../components/layout/CollectionLayout";
import TopSalesTable from "../../components/table/TopSalesTable";
import { spacingMedium } from "../../utils/format";

export default function ProTrade() {
  const [cid, setCid] = useState('');

  const router = useRouter();

  useEffect(()=> {
    if(!router.isReady) return;
    setCid(router.query.collection as string);
  }, [router.isReady]);

  return (
    <CollectionLayout
      currLink="analytics"
      cid={cid}
    >
      {cid !== '' &&
        <Stack spacing={spacingMedium}>
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
      }
    </CollectionLayout>
  )
}