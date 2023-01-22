import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getKeywordCollections } from "../../api/home/homeCalls";
import CollectionLayout from "../../components/layout/CollectionLayout";
import LoadingLayout from "../../components/layout/LoadingLayout";
import { spacingMedium } from "../../utils/format";

export default function CollectionLeaderboardPage() {
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
          currLink="leaderboard"
          cid={cid}
          collName={collName}
          collDesc={collDesc}
          logoSrc={logoSrc}
          bannerSrc={bannerSrc}
        >
            <Stack spacing={spacingMedium}>

              <Typography>Leaderboard</Typography>
              
            </Stack>
          </CollectionLayout>
          
        : <LoadingLayout currTab="" />
      }
    </>
  )
}
