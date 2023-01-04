import { Stack } from "@mui/material";
import { ReactNode } from "react";
import { paddingLarge, spacingLarge } from "../../utils/format";
import EmptySpace from "../util/EmptySpace";
import TitleLayout from "./TitleLayout";

interface HomeProps {
  children?: ReactNode,
  currLink: 'top' | 'upcoming',
}
export default function HomeLayout(props: HomeProps) { 
  const { 
    children, 
    currLink,
  } = props;
  
  return (
    <TitleLayout currLink={currLink}>
      <Stack
        spacing={spacingLarge}
        px={paddingLarge}
      >
        <main>{children}</main>
        <EmptySpace height={200}/>
      </Stack>
    </TitleLayout>
  )
}
