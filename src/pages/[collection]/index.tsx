import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PriceAndSalesChart from "../../components/chart/PriceAndSalesChart";
import CollectionLayout from "../../components/layout/CollectionLayout";
import LoadingLayout from "../../components/layout/LoadingLayout";

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
            <PriceAndSalesChart cid={cid} />
          </CollectionLayout>
          
        : <LoadingLayout currTab="top" />
      }
    </>
  )
}