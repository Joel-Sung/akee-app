import { Stack, Typography } from "@mui/material";
import { shortenNumber } from "../../utils/numbers";
import { ETHSymbol } from "./Symbols";

interface ValueCardProps {
  title: string;
  value: number | string | null;
  delta?: number | null;
  isETHValue?: boolean;
  isShorten?: boolean;
  isPercentage?: boolean;
}
export function ValueCard(props: ValueCardProps) {
  const {
    title,
    value,
    delta = null,
    isETHValue = false,
    isShorten = false,
    isPercentage = false,
  } = props;
  
  const shortenedValue = isShorten && typeof value === 'number' 
    ? shortenNumber(value) : null;
  const pecentageValue = isPercentage && typeof value === 'number' 
    ? `${(value * 100).toFixed(2)}%` : null;

  return (
    <Stack>
      <Typography>{title}</Typography>

      <Stack direction='row'>
        
        {isETHValue &&
          <ETHSymbol />
        }
        
        <Typography variant='h6'>
          {value === null 
            ? 'null'
            : shortenedValue !== null
              ? shortenedValue
              : pecentageValue !== null
                ? pecentageValue
                : value
          }
        </Typography>

        {delta !== null && 
          <Typography variant="subtitle2" sx={{ color: delta < 0 ? 'red' : 'green', alignSelf: 'flex-end' }}>
            {delta > 0 ? '+' : ''}{(delta * 100).toFixed(2)}%
          </Typography>
        }

      </Stack>
    </Stack>
  )
}