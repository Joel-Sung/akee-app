import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, Stack } from "@mui/material";

interface IncrementerProps {
  currValue: number;
  handleInc: () => void;
  handleDec: () => void;
}
export default function Incrementer(props: IncrementerProps) {
  const {
    currValue,
    handleInc,
    handleDec,
  } = props;

  return (
    <Stack direction='row' alignItems='center'>
      <Button onClick={handleDec}><KeyboardArrowLeftIcon /></Button>
      {currValue}
      <Button onClick={handleInc}><KeyboardArrowRightIcon /></Button>
    </Stack>
  )
}