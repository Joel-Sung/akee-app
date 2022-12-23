import { Link, Stack } from "@mui/material";
import { ReactNode } from "react";
import { paddingSection, spacingComponent, spacingSection } from "../../utils/format";
import TitleLayout from "./TitleLayout";

interface NavLinkProps {
  href: string,
  text: string
  selected?: boolean
}
function NavLink({ href, text, selected }: NavLinkProps) {
  const linkUnselected = "hover:bg-violet-400 text-white hover:text-black font-bold py-2 px-4 rounded-2xl"
  const linkSelected = "bg-violet-600 text-black font-bold py-2 px-4 rounded-2xl"

  return (
    <Link href={href} underline="none" className={selected ? linkSelected : linkUnselected}>{text}</Link>
  )
}

interface CollectionNavBarProps {
  children?: ReactNode,
  currLink: 'overview' | 'protrade' | 'analytics',
  cid: string
}
export default function CollectionLayout(props: CollectionNavBarProps) { 
  const { 
    children, 
    currLink, 
    cid 
  } = props;
  
  return (
    <TitleLayout currLink="top">
      <Stack
        spacing={spacingSection}
        sx={{ padding: paddingSection}}
      >
        <Stack 
          direction="row" 
          spacing={spacingComponent}
        >
          <NavLink href={"/" + cid} text="Overview" selected={currLink==="overview"} />
          <NavLink href={"/" + cid + "/protrade"} text="Pro Trade" selected={currLink==="protrade"} />
          <NavLink href={"/" + cid + "/analytics"} text="Analytics" selected={currLink==="analytics"} />
        </Stack>
        <main>{children}</main>
      </Stack>
    </TitleLayout>
  )
}