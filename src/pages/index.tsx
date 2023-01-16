import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { SelectionBar } from '../components/bar/SelectionBar';
import HomeLayout from '../components/layout/HomeLayout';
import CollectionRankingTable from '../components/table/CollectionRankingTable';
import NFTRankingTable from '../components/table/NFTRankingTable';
import { spacingLarge, spacingMedium, spacingSmall } from '../utils/format';

export default function HomePage({ }) {
  const [tab, setTab] = useState<'Collection' | 'Token'>('Collection');

  return (
    <HomeLayout currLink={'top'}>
      <Stack spacing={spacingLarge}>
        
        <Stack direction='row'>
          <Stack flexBasis='50%' spacing={spacingSmall}>
            <Typography variant='h4'>
              Top Collectibles & NFTs Tokens 
              by Market Capitalization
            </Typography>
            <Typography variant='body1'>
              Listed below are the top crypto coins and tokens used for Collectibles & NFTs.
              They are listed in size by market capitalization.
              To reorder the list, simply click on one of the options - such as 24h or 7d -
              to see the sector from a different perspective.
            </Typography>
          </Stack>
        </Stack>

        <SelectionBar
          currSelection={tab}
          selections={[
            { value: 'Collection', text: 'Top Collections' },
            { value: 'Token', text: 'NFTs Token' },
          ]}
          handleChange={setTab}
          spacing={spacingMedium}
          light={true}
          useTextButton={true}
        />

        {
          tab === 'Collection'
            ? <CollectionRankingTable />
            : <NFTRankingTable />
        }
        
      </Stack>
    </HomeLayout>
  );
}
