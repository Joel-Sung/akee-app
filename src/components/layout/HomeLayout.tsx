import { Stack } from "@mui/material";
import type { ReactNode } from "react";
import { spacingLarge } from "../../utils/format";
import EmptySpace from "../util/EmptySpace";
import TitleLayout from "./TitleLayout";

interface HomeProps {
  children?: ReactNode;
}
export default function HomeLayout(props: HomeProps) {
  const { children } = props;

  return (
    <TitleLayout>
      <Stack spacing={spacingLarge} className="mx-[5vw]">
        <main>{children}</main>
        <EmptySpace height={200} />
      </Stack>
    </TitleLayout>
  );
}
