import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCollectionRanking } from '../../api/home/homeCalls';
import { spacingMedium } from '../../utils/format';
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
        } else {
          setCollName('Collection Not Found');
          setCollDesc('');
          setCollFloorPrice(0);
          setCollMktCap(0);
          setCollHolders(0);
        }
      });
    }
    fetchData();
  }, []);

  return (
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
  );
}
