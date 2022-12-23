import { Button, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import { ReactNode } from "react";
import { paddingSection, spacingComponent } from "../../utils/format";

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
      spacing={spacingComponent}
    >
      <Paper
        sx={{ padding: paddingSection }}
      >
        <Stack direction='row' spacing={spacingComponent} >
          <Button onClick={goHome}>
            <Typography variant="h1">AVEE</Typography>
          </Button>
          <Button onClick={goTopCollections} variant={currLink === 'top' ? "outlined" : "text"}>Top Collections</Button>
          <Button onClick={goUpcomingCollections} variant={currLink === 'upcoming' ? "outlined" : "text"}>Upcoming Collections</Button>
        </Stack>
      </Paper>
      <main>{children}</main>
    </Stack>
  )
}