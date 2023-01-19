import { Typography } from "@mui/material";
import HomeLayout from "../components/layout/HomeLayout";

export default function PredictionsPage({}) {
  return (
    <HomeLayout currLink={'predictions'}>
      <Typography variant="h4">Predictions</Typography>
    </HomeLayout>
  )
}
