import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PriceAndSalesChart from "../../components/chart/PriceAndSalesChart";
import CollectionNavBar from "../../components/layout/CollectionNavBar";
import Title from "../../components/layout/Title";

export default function CollectionPage() {
  const [cid, setCid] = useState('');

  const router = useRouter();

  useEffect(()=> {
    if(!router.isReady) return;
    setCid(router.query.collection);
  }, [router.isReady]);

  return (
    <Title>
      <CollectionNavBar
        currLink="overview"
        cid={cid}
      >
        {cid !== '' &&
          <PriceAndSalesChart
            cid={cid}
            initialRange='7d'
          />
        }
      </CollectionNavBar>
    </Title>
  )
}