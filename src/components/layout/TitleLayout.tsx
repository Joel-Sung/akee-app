import { Paper, Stack, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import { ReactNode } from "react";
import { paddingSmall, spacingLarge, spacingMedium } from "../../utils/format";
import { MyButton, TextButton } from "../util/Button";

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
          <TextButton onClick={goHome}>
            <Typography variant="h2">AKEE</Typography>
          </TextButton>
          <MyButton onClick={goTopCollections} isClicked={currLink === 'top'}>Top Collections</MyButton>
          <MyButton onClick={goUpcomingCollections} isClicked={currLink === 'upcoming'}>Upcoming Collections</MyButton>
        </Stack>
      </Paper>
      <main>{children}</main>
    </Stack>
  )
}