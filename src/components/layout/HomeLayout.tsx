import { Stack } from "@mui/material";
import type { ReactNode } from "react";
import { TitleNavBar } from "../../types/navBarTypes";
import { paddingLarge, spacingLarge } from "../../utils/format";
import EmptySpace from "../util/EmptySpace";
import TitleLayout from "./TitleLayout";

interface HomeProps {
  children?: ReactNode,
  currLink: TitleNavBar,
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
