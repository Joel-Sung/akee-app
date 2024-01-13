import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { SelectionBar } from "../components/bar/SelectionBar";
import HomeLayout from "../components/layout/HomeLayout";
import CollectionRankingTable from "../components/table/CollectionRankingTable";
import NFTRankingTable from "../components/table/NFTRankingTable";
import UpcomingSalesTable from "../components/table/UpcomingSalesTable";
import { spacingLarge, spacingSmall } from "../utils/format";

function Header({ title, description }) {
  return (
    <Stack spacing={spacingSmall} className="max-w-[600px]">
      <Typography variant="h4">{title}</Typography>
      <Typography variant="body1">{description}</Typography>
    </Stack>
  );
}
export default function HomePage({}) {
  const [tab, setTab] = useState<"Collection" | "Token" | "Upcoming">(
    "Collection"
  );

  return (
    <HomeLayout>
      <Stack spacing={spacingLarge}>
        {tab === "Collection" ? (
          <Header
            title="Top Collectibles & NFTs Tokens by Market Capitalization"
            description="
              Listed below are the top crypto coins and tokens used for
              Collectibles & NFTs. They are listed in size by market
              capitalization. To reorder the list, simply click on one of the
              column headers to toggle ascending or descending. Click on a row
              to find out more about the Collection.
            "
          />
        ) : tab === "Token" ? (
          <Header
            title="Top Collectibles & NFTs Tokens by Market Capitalization"
            description="
              Listed below are the top crypto coins and tokens used for
              Collectibles & NFTs. They are listed in size by market
              capitalization. To reorder the list, simply click on one of the
              column headers to toggle ascending or descending.
            "
          />
        ) : (
          <Header
            title="Upcoming NFT Collections"
            description="
              Below is a compilation of the most exciting drops, listed by the
              release date and time and the blockchain that the collection is
              hosted on. Users can view its mint price, the number of assets,
              and other details.
            "
          />
        )}

        <SelectionBar
          currSelection={tab}
          selections={[
            { value: "Collection", text: "Top Collections" },
            { value: "Token", text: "NFT Tokens" },
            { value: "Upcoming", text: "Upcoming Collections" },
          ]}
          handleChange={setTab}
          light={true}
          useTextButton={true}
          spacing="3vw"
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
