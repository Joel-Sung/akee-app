import { Paper, Stack } from "@mui/material";
import { paddingVerySmall, paperElevation } from "../../utils/format";
import { BackgroundButton, TextButton } from "../util/Button";

export type BarButtonType<T> = {
  value: T;
  text: string;
};

interface SelectionBarProps<T> {
  currSelection: T;
  selections: BarButtonType<T>[];
  handleChange: (selection: T) => void;
  spacing?: number;
  light?: boolean;
  useTextButton?: boolean;
}
export function SelectionBar<T>(props: SelectionBarProps<T>) {
  const {
    currSelection,
    selections,
    handleChange,
    spacing = 0,
    light = false,
    useTextButton = false,
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
            <span key={index}>
              {useTextButton ? (
                <TextButton
                  onClick={() => handleChange(button.value)}
                  isClicked={button.value === currSelection}
                >
                  {button.text}
                </TextButton>
              ) : (
                <BackgroundButton
                  onClick={() => handleChange(button.value)}
                  isClicked={button.value === currSelection}
                >
                  {button.text}
                </BackgroundButton>
              )}
            </span>
          );
        })}
      </Stack>
    </Paper>
  );
}
