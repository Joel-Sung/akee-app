import { Typography } from "@mui/material";
import HomeLayout from "../components/layout/HomeLayout";

export default function LaunchesPage({}) {
  return (
    <HomeLayout currLink={'launches'}>
      <Typography variant="h4">Launches</Typography>
    </HomeLayout>
  )
}
