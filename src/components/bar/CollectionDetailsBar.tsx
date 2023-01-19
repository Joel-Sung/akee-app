import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCollectionRanking } from '../../api/home/homeCalls';
import { spacingMedium } from '../../utils/format';
import EmptySpace from '../util/EmptySpace';
import { ValueCard } from '../util/ValueCard';

interface CollectionDetailsBarProps {
  cid: string
}
export default function CollectionDetailsBar(props: CollectionDetailsBarProps) {
  const {
    cid
  } = props;

  const [collName, setCollName] = useState<string>('');
  const [collDesc, setCollDesc] = useState<string>('');
  const [collFloorPrice, setCollFloorPrice] = useState<number>(0);
  const [collMktCap, setCollMktCap] = useState<number>(0);
  const [collHolders, setCollHolders] = useState<number>(0);
  const [logoSrc, setLogoSrc] = useState<string>('');
  const [bannerSrc, setBannerSrc] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      await getCollectionRanking('24h').then((responseJSON) => {
        const collData = responseJSON.data.list.filter((collection: any) => collection.id === cid)[0];
        if (collData !== undefined) {
          setCollName(collData.name);
          setCollDesc(collData.longDesc);
          setCollFloorPrice(collData.floorPrice.tokenPrice);
          setCollMktCap(collData.marketCapEth);
          setCollHolders(collData.holderNum);
          setLogoSrc(collData.logo);
          setBannerSrc(collData.bannerImageUrl);
        } else {
          setCollName('Collection Not Found');
          setCollDesc('');
          setCollFloorPrice(0);
          setCollMktCap(0);
          setCollHolders(0);
          setLogoSrc('');
          setBannerSrc('');
        }
      });
    }
    fetchData();
  }, []);

  return (
    <Stack spacing={spacingMedium}>
      
      <img 
        src={bannerSrc}
        style={{
          objectFit: 'cover', 
          zIndex: -1, 
          position: 'absolute',
          width: '100%', 
          height: '10rem', 
          left: 0,
        }}
      />

      <EmptySpace height={40}/>
      
      <img 
        src={logoSrc}
        className="rounded-full"
        style={{
          height: 120, 
          width: 120,
          border: '5px solid lightblue',
        }}
      />

      <Stack direction='row' justifyContent='space-between'>

        <Stack spacing={spacingMedium} flexBasis='50%'>
          <Typography variant='h3'>{collName}</Typography>
          <Typography>{collDesc}</Typography>
        </Stack>

        <Stack direction='row' spacing={spacingMedium}>
          <ValueCard title={'Floor Price'} value={collFloorPrice} isETHValue={true} isShorten={true} />
          <ValueCard title={'Market Cap'} value={collMktCap} isETHValue={true} isShorten={true} />
          <ValueCard title={'Holders'} value={collHolders} />
        </Stack>

      </Stack>
    </Stack>
  );
}
