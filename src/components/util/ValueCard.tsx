import { Stack, Typography } from "@mui/material";

interface ValueCardProps {
  title: string;
  value: any | null;
}
export function ValueCard(props: ValueCardProps) {
  const {
    title,
    value,
  } = props;
  
  return (
    <Stack>
      <Typography>{title}</Typography>
      <Typography variant='h6'>
        {value === null 
          ? 'null'
          : value === undefined
            ? 'undefined'
            : value
        }
      </Typography>
    </Stack>
  )
}