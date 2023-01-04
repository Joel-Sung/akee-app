import { Box, Typography } from "@mui/material";
import { TitleNavBar } from "../../types/navBarTypes";
import TitleLayout from "./TitleLayout";

interface LoadingLayoutProps {
  currTab: TitleNavBar,
}
export default function LoadingLayout(props: LoadingLayoutProps) { 
  const { 
    currTab, 
  } = props;

  return (
    <TitleLayout currLink={currTab}>
      <Box sx={{ 
          display: 'flex', 
          alignItems:'center', 
          justifyContent:'center',
        }}
      >
        <Typography variant="h1">Loading...</Typography>
      </Box>
    </TitleLayout>
  )
}
