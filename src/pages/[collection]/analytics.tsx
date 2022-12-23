import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MktCapAndVolChart from "../../components/chart/MktCapAndVolChart";
import CollectionLayout from "../../components/layout/CollectionLayout";

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
        <Stack>
          <MktCapAndVolChart
            cid={cid}
          />
        </Stack>
      }
    </CollectionLayout>
  )
}