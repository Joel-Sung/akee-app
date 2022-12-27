import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PriceAndSalesChart from "../../components/chart/PriceAndSalesChart";
import CollectionLayout from "../../components/layout/CollectionLayout";

export default function CollectionPage() {
  const [cid, setCid] = useState('');

  const router = useRouter();

  useEffect(()=> {
    if(!router.isReady) return;
    setCid(router.query.collection as string);
  }, [router.isReady]);

  return (
    <CollectionLayout
      currLink="overview"
      cid={cid}
    >
      {cid !== '' &&
        <PriceAndSalesChart cid={cid} />
      }
    </CollectionLayout>
  )
}