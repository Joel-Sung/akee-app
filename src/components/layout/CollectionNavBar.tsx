import { Link, Stack } from "@mui/material";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string,
  text: string
  selected?: boolean
}
function NavLink({ href, text, selected }: NavLinkProps) {
  const linkUnselected = "bg-purple-400 hover:bg-violet-600 text-white hover:text-black font-bold py-2 px-4 rounded-2xl"
  const linkSelected = "bg-violet-600 text-black font-bold py-2 px-4 rounded-2xl"

  return (
    <Link href={href} underline="none" className={selected ? linkSelected : linkUnselected}>{text}</Link>
  )
}

interface CollectionNavBarProps {
  children?: ReactNode,
  currLink: 'overview' | 'protrade',
  cid: string
}
export default function CollectionNavBar(props: CollectionNavBarProps) { 
  const { 
    children, 
    currLink, 
    cid 
  } = props;
  
  return (
    <Stack
      spacing={'1vmin'}
      sx={{ padding: '5vmin'}}
    >
      <Stack 
        direction="row" 
        spacing={'1vmin'}
        sx={{ mb: '5vmin' }}
      >
        <NavLink href={"/" + cid} text="Overview" selected={currLink==="overview"} />
        <NavLink href={"/" + cid + "/protrade"} text="Pro Trade" selected={currLink==="protrade"} />
      </Stack>
      <main>{children}</main>
    </Stack>
  )
}