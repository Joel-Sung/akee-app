import { Stack } from "@mui/material";
import type { ReactNode } from "react";
import { CollectionNavBar } from "../../types/navBarTypes";
import { paddingVeryLarge, spacingLarge, spacingMedium } from "../../utils/format";
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
    <TitleLayout currLink="" removeSpacing={true}>
        
      <Stack spacing={spacingLarge} px={paddingVeryLarge}>
        
        <CollectionDetailsBar cid={cid} />

        <Stack direction="row" spacing={spacingMedium}>
          <TextLink href={"/" + cid} isClicked={currLink==="overview"}>Overview</TextLink>
          <TextLink href={"/" + cid + "/leaderboard"} isClicked={currLink==="leaderboard"}>Leaderboard</TextLink>
          <TextLink href={"/" + cid + "/activity"} isClicked={currLink==="activity"}>Activity</TextLink>
        </Stack>

        <main>{children}</main>

        <EmptySpace height={200}/>
        
      </Stack>

    </TitleLayout>
  )
}
