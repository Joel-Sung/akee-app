import { Stack, Typography } from '@mui/material';
import HomeLayout from '../components/layout/HomeLayout';
import UpcomingSalesTable from '../components/table/UpcomingSalesTable';
import { spacingLarge, spacingSmall } from '../utils/format';

export default function HomePage({ }) {
  return (
    <HomeLayout currLink={'upcoming'}>
      <Stack spacing={spacingLarge}>
        
        <Stack direction='row'>
          <Stack flexBasis='50%' spacing={spacingSmall}>
            <Typography variant='h4'>
              Upcoming NFT Collections
            </Typography>
            <Typography variant='body1'>
              Below is a compilation of the most exciting drops,
              listed by the release date and time and the blockchain that the collection is hosted on.
              Users can view its mint price, the number of assets, and other details.
            </Typography>
          </Stack>
        </Stack>
        
        <UpcomingSalesTable />
      </Stack>
    </HomeLayout>
  );
}
