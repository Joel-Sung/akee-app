import { Paper, Stack } from "@mui/material";
import { paperElevation } from "../../utils/format";
import { BackgroundButton, TextButton } from "../util/Button";

export type BarButtonType<T> = {
  value: T;
  text: string;
};

interface SelectionBarProps<T> {
  currSelection: T;
  selections: BarButtonType<T>[];
  handleChange: (selection: T) => void;
  light?: boolean;
  spacing?: string;
  useTextButton?: boolean;
  className?: string;
}
export function SelectionBar<T>(props: SelectionBarProps<T>) {
  const {
    currSelection,
    selections,
    handleChange,
    light = false,
    spacing = "1vw",
    useTextButton = false,
    className = "",
  } = props;

  return (
    <div className={"flex items-center " + className}>
      <Paper
        elevation={light ? 0 : paperElevation}
        className="flex items-center justify-items-center p-[1vh]"
      >
        <Stack direction="row" spacing={spacing} className="flex">
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
    </div>
  );
}
