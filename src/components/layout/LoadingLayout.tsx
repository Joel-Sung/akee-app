import { Box, Typography } from "@mui/material";
import TitleLayout from "./TitleLayout";

export default function LoadingLayout({}) {
  return (
    <TitleLayout>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h1">Loading...</Typography>
      </Box>
    </TitleLayout>
  );
}
