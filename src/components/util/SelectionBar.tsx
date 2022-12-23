import { Button, Paper, Stack } from "@mui/material";

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
    <Button 
      variant={buttonValue === value ? "outlined" : "text"}
      onClick={onClick}
    >
      {text}
    </Button>
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
}
export function SelectionBar<T>(props: SelectionBarProps<T>) {
  const {
    currSelection,
    selections,
    handleChange,
  } = props;
  
  return (
    <Paper elevation={1} className="flex justify-items-center">
      <Stack direction="row">
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