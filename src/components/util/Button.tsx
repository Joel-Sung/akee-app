import { Button } from "@mui/material";
import { ReactNode } from "react";
import { noHover, selected, unselected } from "../../utils/tailwindcss";

interface MyButtonProps {
  onClick: () => void;
  isClicked?: boolean;
  children?: ReactNode;
}
export function MyButton(props: MyButtonProps) {
  const {
    onClick,
    isClicked = false,
    children
  } = props;

  return (
    <Button
      onClick={onClick}
      className={isClicked ? selected : unselected}
    >
      {children}
    </Button>
  )
}

interface TextButtonProps {
  onClick: () => void;
  children?: ReactNode;
}
export function TextButton(props: TextButtonProps) {
  const {
    onClick,
    children
  } = props;

  return (
    <Button
      onClick={onClick}
      className={noHover}
    >
      {children}
    </Button>
  )
}
