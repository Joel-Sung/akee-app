import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCollectionDetails } from "../../api/home/homeCalls";
import { spacingMedium } from "../../utils/format";
import EmptySpace from "../util/EmptySpace";
import { ValueCard } from "../util/ValueCard";

export interface CollectionDetailsBarProps {
  cid: string;
  collName: string;
  collDesc: string;
  logoSrc: string;
  bannerSrc: string;
}
export default function CollectionDetailsBar(props: CollectionDetailsBarProps) {
  const { cid, collName, collDesc, logoSrc, bannerSrc } = props;

  const [collFloorPrice, setCollFloorPrice] = useState<number>(0);
  const [collVolume, setCollVolume] = useState<number>(0);
  const [collMktCap, setCollMktCap] = useState<number>(0);
  const [collHolders, setCollHolders] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      await getCollectionDetails(cid).then((collDetails) => {
        if (collDetails !== undefined) {
          setCollFloorPrice(
            collDetails.data.data.floorPrice === null
              ? 0
              : collDetails.data.data.floorPrice.tokenPrice
          );
          setCollVolume(collDetails.data.data.volumeEth);
          setCollMktCap(collDetails.data.data.marketCapEth);
          setCollHolders(collDetails.data.data.holderNum);
        } else {
          setCollFloorPrice(0);
          setCollVolume(0);
          setCollMktCap(0);
          setCollHolders(0);
        }
      });
    }
    fetchData();
  }, []);

  return (
    <Stack spacing="3vh">
      <img
        src={bannerSrc}
        style={{
          objectFit: "cover",
          zIndex: -1,
          position: "absolute",
          width: "100%",
          height: "10rem",
          left: 0,
        }}
      />

      <EmptySpace height={40} />

      <img
        src={logoSrc}
        className="rounded-full"
        style={{
          height: "20vh",
          width: "20vh",
          border: "5px solid lightblue",
        }}
      />

      <div className="flex flex-col">
        <div className="flex flex-col xl:flex-row xl:justify-between">
          <Typography variant="h3" className="mb-[2vh]">
            {collName}
          </Typography>
          <Stack direction="row" spacing={spacingMedium} className="mb-[2vh]">
            <ValueCard
              title={"Floor Price"}
              value={collFloorPrice}
              isETHValue={true}
              isShorten={true}
            />
            <ValueCard
              title={"Total Volume"}
              value={collVolume}
              isETHValue={true}
              isShorten={true}
            />
            <ValueCard
              title={"Market Cap"}
              value={collMktCap}
              isETHValue={true}
              isShorten={true}
            />
            <ValueCard title={"Holders"} value={collHolders} />
          </Stack>
        </div>
        <Typography className="xl:w-[50%]">{collDesc}</Typography>
      </div>
    </Stack>
  );
}
