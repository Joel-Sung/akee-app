import { Link } from "@mui/material";

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

  const linkUnselected = `
    text-white font-bold py-2 px-4 rounded
    hover:bg-violet-400  hover:text-black 
  `
  const linkSelected = `
    text-black bg-violet-600 font-bold py-2 px-4 rounded
    hover:bg-violet-400  hover:text-black
  `

  return (
    <Link
      href={href}
      underline="none"
      className={isClicked ? linkSelected : linkUnselected}
    >
      {children}
    </Link>
  )
}