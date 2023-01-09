import { Paper, Stack, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import { ReactNode } from "react";
import { paddingSmall, spacingLarge, spacingMedium } from "../../utils/format";
import { NoHoverButton, TextButton } from "../util/Button";

interface TitleLayoutProps {
  children?: ReactNode,
  currLink: 'top' | 'upcoming',
}
export default function TitleLayout(props: TitleLayoutProps) {
  const {
    children,
    currLink
  } = props;
  
  const router = useRouter();

  function goHome() {
    router.push({pathname: '/'})
  }
  function goTopCollections() {
    router.push({pathname: '/'})
  }
  function goUpcomingCollections() {
    router.push({pathname: '/upcoming'})
  }

  return (
    <Stack
      spacing={spacingLarge}
    >
      <Paper
        sx={{ padding: paddingSmall, position: 'sticky', top: 0, zIndex: 1 }}
      >
        <Stack direction='row' spacing={spacingMedium}>

          <NoHoverButton onClick={goHome}>
            <Typography variant="h4">AKEE</Typography>
          </NoHoverButton>

          <TextButton onClick={goTopCollections} isClicked={currLink === 'top'}>
            <Typography variant="h4">Top Collections</Typography>
          </TextButton>

          <TextButton onClick={goUpcomingCollections} isClicked={currLink === 'upcoming'}>
            <Typography variant="h4">Upcoming Collections</Typography>
          </TextButton>

        </Stack>
      </Paper>
      <main>{children}</main>
    </Stack>
  )
}