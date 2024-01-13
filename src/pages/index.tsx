import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { SelectionBar } from "../components/bar/SelectionBar";
import HomeLayout from "../components/layout/HomeLayout";
import CollectionRankingTable from "../components/table/CollectionRankingTable";
import NFTRankingTable from "../components/table/NFTRankingTable";
import UpcomingSalesTable from "../components/table/UpcomingSalesTable";
import { spacingLarge, spacingMedium, spacingSmall } from "../utils/format";

export default function HomePage({}) {
  const [tab, setTab] = useState<"Collection" | "Token" | "Upcoming">(
    "Collection"
  );

  return (
    <HomeLayout currLink={""}>
      <Stack spacing={spacingLarge}>
        {tab === "Upcoming" ? (
          <Stack direction="row">
            <Stack flexBasis="50%" spacing={spacingSmall}>
              <Typography variant="h4">Upcoming NFT Collections</Typography>
              <Typography variant="body1">
                Below is a compilation of the most exciting drops, listed by the
                release date and time and the blockchain that the collection is
                hosted on. Users can view its mint price, the number of assets,
                and other details.
              </Typography>
            </Stack>
          </Stack>
        ) : (
          <Stack direction="row">
            <Stack flexBasis="50%" spacing={spacingSmall}>
              <Typography variant="h4">
                Top Collectibles & NFTs Tokens by Market Capitalization
              </Typography>
              <Typography variant="body1">
                Listed below are the top crypto coins and tokens used for
                Collectibles & NFTs. They are listed in size by market
                capitalization. To reorder the list, simply click on one of the
                options - such as 24h or 7d - to see the sector from a different
                perspective.
              </Typography>
            </Stack>
          </Stack>
        )}

        <SelectionBar
          currSelection={tab}
          selections={[
            { value: "Collection", text: "Top Collections" },
            { value: "Token", text: "NFT Tokens" },
            { value: "Upcoming", text: "Upcoming Collections" },
          ]}
          handleChange={setTab}
          spacing={spacingMedium}
          light={true}
          useTextButton={true}
        />

        {tab === "Collection" ? (
          <CollectionRankingTable />
        ) : tab === "Token" ? (
          <NFTRankingTable />
        ) : (
          <UpcomingSalesTable />
        )}
      </Stack>
    </HomeLayout>
  );
}
