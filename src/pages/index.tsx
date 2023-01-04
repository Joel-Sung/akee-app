import { Stack, Typography } from '@mui/material';
import HomeLayout from '../components/layout/HomeLayout';
import CollectionRankingTable from '../components/table/CollectionRankingTable';
import { spacingLarge, spacingSmall } from '../utils/format';

export default function HomePage({ }) {
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

        <CollectionRankingTable />
        
      </Stack>
    </HomeLayout>
  );
};
