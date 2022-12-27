import { Stack, Typography } from "@mui/material";
import { symbolHeightSmall, symbolWidthSmall } from "../../utils/format";

export function ETHSymbol({}) {
  return (
    <img 
      src="https://static.nftgo.io/icon/token/ETH.svg" 
      height={symbolHeightSmall}
      width={symbolWidthSmall}
    />
  )
}

interface ETHPriceProps {
  ethPrice: number | string;
}
export function ETHPrice(props: ETHPriceProps) {
  const {
    ethPrice,
  } = props;

  return (
    <Stack direction='row'>
      <ETHSymbol />
      <Typography>{ethPrice}</Typography>
    </Stack>
  )
}
