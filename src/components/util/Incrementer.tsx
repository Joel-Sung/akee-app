import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, Stack } from "@mui/material";

interface IncrementerProps {
  currValue: number;
  handleInc: () => void;
  handleDec: () => void;
}
export default function Incrementer(props: IncrementerProps) {
  const { currValue, handleInc, handleDec } = props;

  return (
    <Stack direction="row" alignItems="center">
      <Stack direction="column" className="mr-[1vw]">
        <Button
          onClick={handleInc}
          size="small"
          sx={{ border: 1, marginBottom: "1vh" }}
        >
          <KeyboardArrowUpIcon />
        </Button>
        <Button
          onClick={handleDec}
          size="small"
          sx={{ border: 1 }}
          disabled={currValue == 1}
        >
          <KeyboardArrowDownIcon />
        </Button>
      </Stack>
      {currValue}
    </Stack>
  );
}
