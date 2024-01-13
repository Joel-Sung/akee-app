import { Stack } from "@mui/material";
import type { ReactNode } from "react";
import { spacingLarge } from "../../utils/format";
import CollectionDetailsBar, {
  CollectionDetailsBarProps,
} from "../bar/CollectionDetailsBar";
import EmptySpace from "../util/EmptySpace";
import TitleLayout from "./TitleLayout";

interface CollectionLayoutProps extends CollectionDetailsBarProps {
  children?: ReactNode;
}
export default function CollectionLayout(props: CollectionLayoutProps) {
  const { children, cid, collName, collDesc, logoSrc, bannerSrc } = props;

  return (
    <TitleLayout removeSpacing={true}>
      <Stack spacing={spacingLarge} className="mx-[5vw]">
        <CollectionDetailsBar
          cid={cid}
          collName={collName}
          collDesc={collDesc}
          logoSrc={logoSrc}
          bannerSrc={bannerSrc}
        />

        <main>{children}</main>

        <EmptySpace height={200} />
      </Stack>
    </TitleLayout>
  );
}
