import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import { ReactNode } from "react";

interface NavBarProps {
  children?: ReactNode
}
export default function Title(props: NavBarProps) {
  const {
    children
  } = props;
  
  const router = useRouter();

  function goHome() {
    router.push({
      pathname: '/',
    })
  }

  return (
    <Stack
      spacing={'1vmin'}
      sx={{ padding: '5vmin'}}
    >
      <Button onClick={goHome}>
        <Typography variant="h1">NFT Collections</Typography>
      </Button>
      <main>{children}</main>
    </Stack>
  )
}