import { Stack } from "@mui/material";
import type { ReactNode } from "react";
import { CollectionNavBar } from "../../types/navBarTypes";
import { paddingVeryLarge, spacingLarge, spacingMedium } from "../../utils/format";
import CollectionDetailsBar, { CollectionDetailsBarProps } from "../bar/CollectionDetailsBar";
import EmptySpace from "../util/EmptySpace";
import { TextLink } from "../util/Link";
import TitleLayout from "./TitleLayout";

interface CollectionLayoutProps extends CollectionDetailsBarProps {
  children?: ReactNode,
  currLink: CollectionNavBar,
}
export default function CollectionLayout(props: CollectionLayoutProps) { 
  const { 
    children,
    currLink,
    cid,
    collName,
    collDesc,
    logoSrc,
    bannerSrc,
  } = props;

  return (
    <TitleLayout currLink="" removeSpacing={true}>
        
      <Stack spacing={spacingLarge} px={paddingVeryLarge}>
        
        <CollectionDetailsBar
          cid={cid}
          collName={collName}
          collDesc={collDesc}
          logoSrc={logoSrc}
          bannerSrc={bannerSrc}
        />

        <Stack direction="row" spacing={spacingMedium}>
          <TextLink href={"/" + collName} isClicked={currLink==="overview"}>Overview</TextLink>
          <TextLink href={"/" + collName + "/leaderboard"} isClicked={currLink==="leaderboard"}>Leaderboard</TextLink>
          <TextLink href={"/" + collName + "/activity"} isClicked={currLink==="activity"}>Activity</TextLink>
        </Stack>

        <main>{children}</main>

        <EmptySpace height={200}/>
        
      </Stack>

    </TitleLayout>
  )
}
