import { Stack } from "@mui/material";
import type { ReactNode } from "react";
import type { CollectionNavBar } from "../../types/navBarTypes";
import { paddingLarge, spacingLarge, spacingMedium } from "../../utils/format";
import CollectionDetailsBar from "../bar/CollectionDetailsBar";
import EmptySpace from "../util/EmptySpace";
import { TextLink } from "../util/Link";
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
          <TextLink href={"/" + cid} isClicked={currLink==="overview"}>Overview</TextLink>
          <TextLink href={"/" + cid + "/protrade"} isClicked={currLink==="protrade"}>Pro Trade</TextLink>
          <TextLink href={"/" + cid + "/analytics"} isClicked={currLink==="analytics"}>Analytics</TextLink>
        </Stack>

        <main>{children}</main>

        <EmptySpace height={200}/>
        
      </Stack>
    </TitleLayout>
  )
}
