import { Stack } from "@mui/material";
import { ReactNode } from "react";
import { CollectionNavBar } from "../../types/navBarTypes";
import { paddingLarge, spacingLarge, spacingMedium } from "../../utils/format";
import CollectionDetailsBar from "../bar/CollectionDetailsBar";
import EmptySpace from "../util/EmptySpace";
import { MyLink } from "../util/Link";
import TitleLayout from "./TitleLayout";

interface CollectionLayoutProps {
  children?: ReactNode,
  currLink: CollectionNavBar,
  cid: string
}
export default function CollectionLayout(props: CollectionLayoutProps) { 
  const { 
    children, 
    currLink, 
    cid 
  } = props;

  return (
    <TitleLayout currLink="top">
      <Stack spacing={spacingLarge} px={paddingLarge}>
        
        <CollectionDetailsBar cid={cid} />

        <Stack direction="row" spacing={spacingMedium}>
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
