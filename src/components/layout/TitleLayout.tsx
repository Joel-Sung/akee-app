import { Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { TitleNavBar } from "../../types/navBarTypes";
import { paddingSmall, spacingLarge, spacingMedium } from "../../utils/format";
import { NoHoverLink, TextLink } from "../util/Link";
import SearchBar from "../util/SearchBar";

interface TitleLayoutProps {
  children?: ReactNode,
  currLink: TitleNavBar,
  removeSpacing?: boolean
}
export default function TitleLayout(props: TitleLayoutProps) {
  const {
    children,
    currLink,
    removeSpacing = false
  } = props;

  return (
    <Stack
      spacing={removeSpacing ? 0 : spacingLarge}
    >
      <Paper
        sx={{ padding: paddingSmall, position: 'sticky', top: 0, zIndex: 1 }}
      >
        <Stack direction='row' justifyContent='space-between' alignItems="center">

          <Stack direction='row' spacing={spacingMedium} alignItems="center">

            <NoHoverLink href={"/"}> 
              <Typography variant="h4">AKEE</Typography>
            </NoHoverLink>
            <TextLink href={"/analytics"} isClicked={currLink==="analytics"}>Analytics</TextLink>
            <TextLink href={"/predictions"} isClicked={currLink==="predictions"}>Price Prediction</TextLink>
            <TextLink href={"/launches"} isClicked={currLink==="launches"}>Launches</TextLink>
            <TextLink href={"/developer"} isClicked={currLink==="developer"}>Developer</TextLink>
            <TextLink href={"/resources"} isClicked={currLink==="resources"}>Resources</TextLink>

          </Stack>

          <SearchBar />
        </Stack>
      </Paper>
      <main>{children}</main>
    </Stack>
  )
}