import { Button } from "@mui/material";
import { ReactNode } from "react";
import { noHover, textHighlight, textNoHighlight, withBackground, withoutBackground } from "../../utils/tailwindcss";

interface ButtonProps {
  onClick: () => void;
  children?: ReactNode;
}

interface BackgroundButtonProps extends ButtonProps {
  isClicked?: boolean;
}
export function BackgroundButton(props: BackgroundButtonProps) {
  const {
    onClick,
    children,
    isClicked = false,
  } = props;

  return (
    <Button
      onClick={onClick}
      className={isClicked ? withBackground : withoutBackground}
    >
      {children}
    </Button>
  )
}

interface TextButtonProps extends ButtonProps {
  isClicked?: boolean;
}
export function TextButton(props: TextButtonProps) {
  const {
    onClick,
    children,
    isClicked = false,
  } = props;

  return (
    <Button
      onClick={onClick}
      className={isClicked ? textHighlight : textNoHighlight}
    >
      {children}
    </Button>
  )
}

interface NoHoverButtonProps {
  onClick: () => void;
  children?: ReactNode;
}
export function NoHoverButton(props: NoHoverButtonProps) {
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
