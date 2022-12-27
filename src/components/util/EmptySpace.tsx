import { Box } from "@mui/material";

interface EmptySpaceProps {
  height: number;
}
export default function EmptySpace(prop: EmptySpaceProps) {
  const {
    height
  } = prop;

  return (
    <Box height={height} />
  )
}