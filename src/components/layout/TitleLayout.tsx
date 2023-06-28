import { Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { TitleNavBar } from "../../types/navBarTypes";
import { paddingSmall, spacingLarge, spacingMedium } from "../../utils/format";
import { NoHoverLink } from "../util/Link";
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

          </Stack>

          <SearchBar />
        </Stack>
      </Paper>
      <main>{children}</main>
    </Stack>
  )
}