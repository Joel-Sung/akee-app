import { Stack, Typography } from "@mui/material";

interface ValueCardProps {
  title: string;
  value: number | string | null;
  delta?: number | null;
}
export function ValueCard(props: ValueCardProps) {
  const {
    title,
    value,
    delta = null
  } = props;
  
  return (
    <Stack>
      <Typography>{title}</Typography>

      <Stack direction='row' alignItems='flex-end'>
        <Typography variant='h6'>
          {value === null 
            ? 'null'
            : value === undefined
              ? 'undefined'
              : value
          }
        </Typography>

        {delta !== null && 
          <Typography variant="subtitle2" sx={{ color: delta < 0 ? 'red' : 'green' }}>
            {delta > 0 ? '+' : ''}{(delta * 100).toFixed(2)}%
          </Typography>
        }
      </Stack>
    </Stack>
  )
}