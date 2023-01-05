import { Paper, Stack } from "@mui/material";
import { paperElevation } from "../../utils/format";
import { MyButton } from "../util/Button";

interface BarButtonProps<T> {
  buttonValue: T;
  text: string;
  value: T;
  onClick: () => void;
}
function BarButton<T>(props: BarButtonProps<T>) {
  const {
    buttonValue,
    text,
    value,
    onClick
  } = props;
  
  return (
    <MyButton
      onClick={onClick}
      isClicked={buttonValue === value}
    >
      {text}
    </MyButton>
  )
}

export type BarButtonType<T> = {
  value: T;
  text: string;
}

interface SelectionBarProps<T> {
  currSelection: T;
  selections: BarButtonType<T>[];
  handleChange: (selection: T) => void;
  spacing?: number;
  light?: boolean;
}
export function SelectionBar<T>(props: SelectionBarProps<T>) {
  const {
    currSelection,
    selections,
    handleChange,
    spacing = 0,
    light = false,
  } = props;
  
  return (
    <Paper elevation={light ? 0 : paperElevation} className="flex justify-items-center">
      <Stack direction="row" spacing={spacing}>
        {selections.map((button) => {
            return (
              <BarButton 
                buttonValue={button.value} 
                text={button.text} 
                value={currSelection} 
                onClick={() => handleChange(button.value)}
              />
            )
          })
        }
      </Stack>
    </Paper>
  )
}
