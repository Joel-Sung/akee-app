import { Paper, Stack } from "@mui/material";
import { paddingVerySmall, paperElevation } from "../../utils/format";
import { BackgroundButton } from "../util/Button";

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
    <BackgroundButton
      onClick={onClick}
      isClicked={buttonValue === value}
    >
      {text}
    </BackgroundButton>
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
    <Paper 
      elevation={light ? 0 : paperElevation} 
      className="flex justify-items-center"
      sx={{ padding: paddingVerySmall }}
    >
      <Stack direction="row" spacing={spacing}>
        {selections.map((button, index) => {
            return (
              <BarButton 
                buttonValue={button.value} 
                text={button.text} 
                value={currSelection} 
                onClick={() => handleChange(button.value)}
                key={index}
              />
            )
          })
        }
      </Stack>
    </Paper>
  )
}
