import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Stack, Typography } from '@mui/material';

type PecentageChangeProps = {
  change: number;
}
export default function PercentageChange(props: PecentageChangeProps) {
  const {
    change
  } = props;

  return (
    <>
      {
        change > 0
          ? 
            <Stack direction='row' sx={{ color: 'green' }}>
              <ArrowDropUpIcon />
              <Typography>
                {change.toFixed(2)}%
              </Typography>
            </Stack>
          :
            <Stack direction='row'  sx={{ color: 'red' }}>
              <ArrowDropDownIcon />
              <Typography>
                {(change * -1).toFixed(2)}%
              </Typography>
            </Stack>
      }
    </>
  )
}