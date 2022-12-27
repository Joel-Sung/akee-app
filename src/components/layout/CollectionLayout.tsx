import { Stack } from "@mui/material";
import { ReactNode } from "react";
import { paddingLarge, spacingLarge, spacingMedium } from "../../utils/format";
import EmptySpace from "../util/EmptySpace";
import { MyLink } from "../util/Link";
import TitleLayout from "./TitleLayout";

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
        spacing={spacingLarge}
        px={paddingLarge}
      >
        <Stack 
          direction="row" 
          spacing={spacingMedium}
        >
          <MyLink href={"/" + cid} isClicked={currLink==="overview"}>Overview</MyLink>
          <MyLink href={"/" + cid + "/protrade"} isClicked={currLink==="protrade"}>Pro Trade</MyLink>
          <MyLink href={"/" + cid + "/analytics"} isClicked={currLink==="analytics"}>Analytics</MyLink>
        </Stack>
        <main>{children}</main>
        <EmptySpace height={200}/>
      </Stack>
    </TitleLayout>
  )
}