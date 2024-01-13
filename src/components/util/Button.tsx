import type { ReactNode } from "react";
import {
  noHover,
  textHighlight,
  textNoHighlight,
  withBackground,
  withoutBackground,
} from "../../utils/tailwindcss";

const buttonStyle = {
  fontSize: 14,
};
interface ButtonProps {
  onClick: () => void;
  children?: ReactNode;
}

interface BackgroundButtonProps extends ButtonProps {
  isClicked?: boolean;
}
export function BackgroundButton(props: BackgroundButtonProps) {
  const { onClick, children, isClicked = false } = props;

  return (
    <button
      onClick={onClick}
      className={isClicked ? withBackground : withoutBackground}
      style={buttonStyle}
    >
      {children}
    </button>
  );
}

interface TextButtonProps extends ButtonProps {
  isClicked?: boolean;
}
export function TextButton(props: TextButtonProps) {
  const { onClick, children, isClicked = false } = props;

  return (
    <button
      onClick={onClick}
      className={isClicked ? textHighlight : textNoHighlight}
      style={buttonStyle}
    >
      {children}
    </button>
  );
}

interface NoHoverButtonProps {
  onClick: () => void;
  children?: ReactNode;
}
export function NoHoverButton(props: NoHoverButtonProps) {
  const { onClick, children } = props;

  return (
    <button onClick={onClick} className={noHover} style={buttonStyle}>
      {children}
    </button>
  );
}
