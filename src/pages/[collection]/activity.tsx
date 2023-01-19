import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CollectionLayout from "../../components/layout/CollectionLayout";
import LoadingLayout from "../../components/layout/LoadingLayout";
import { spacingMedium } from "../../utils/format";

export default function CollectionActivityPage() {
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
            currLink="activity"
            cid={cid}
          >
            <Stack spacing={spacingMedium}>

              <Typography>Activity</Typography>
              
            </Stack>
          </CollectionLayout>
          
        : <LoadingLayout currTab="" />
      }
    </>
  )
}
