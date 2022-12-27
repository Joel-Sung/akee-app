import { Button } from "@mui/material";

interface MyButton {
  onClick: () => void;
  isClicked?: boolean;
  children?: React.ReactNode;
}
export function MyButton(props: MyButton) {
  const {
    onClick,
    isClicked = false,
    children
  } = props;

  const buttonUnselected = `
    text-white font-bold py-2 px-4 rounded
    hover:bg-violet-400  hover:text-black 
  `
  const buttonSelected = `
    text-black bg-violet-600 font-bold py-2 px-4 rounded
    hover:bg-violet-400  hover:text-black
  `

  return (
    <Button
      onClick={onClick}
      className={isClicked ? buttonSelected : buttonUnselected}
    >
      {children}
    </Button>
  )
}