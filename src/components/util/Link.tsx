import { Link } from "@mui/material";
import { selected, unselected } from "../../utils/tailwindcss";

interface MyLink {
  href: string;
  isClicked?: boolean;
  children?: React.ReactNode;
}
export function MyLink(props: MyLink) {
  const {
    href,
    isClicked = false,
    children
  } = props;

  return (
    <Link
      href={href}
      underline="none"
      className={isClicked ? selected : unselected}
    >
      {children}
    </Link>
  )
}