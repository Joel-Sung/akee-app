import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ListingAndSalesRatioChart from "../../components/chart/ListingAndSalesRatioChart";
import CollectionNavBar from "../../components/layout/CollectionNavBar";
import Title from "../../components/layout/Title";

export default function ProTrade() {
  const [cid, setCid] = useState('');

  const router = useRouter();

  useEffect(()=> {
    if(!router.isReady) return;
    setCid(router.query.collection);
  }, [router.isReady]);

  return (
    <Title>
      <CollectionNavBar
        currLink="protrade"
        cid={cid}
      >
        {cid !== '' &&
          <Stack direction='row'>
            <Stack direction='row'>

            </Stack>

            <Stack>
              <ListingAndSalesRatioChart />
            </Stack>
          </Stack>
        }
      </CollectionNavBar>
    </Title>
  )
}