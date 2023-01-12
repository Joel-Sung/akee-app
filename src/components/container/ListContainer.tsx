import { Paper } from "@mui/material";
import type { ReactNode } from "react";
import { heightMinLarge, heightMinSmall, paddingMedium, paperElevation, widthLarge, widthMinLarge, widthMinSmall, widthMinVerySmall, widthSmall, widthVerySmall } from "../../utils/format";

interface ListContainerProps {
  isSmall?: boolean;
  isVerySmall?: boolean;
  smallComponentSpan?: number;
  largeComponentSpan?: number;
  children: ReactNode;
}
export default function ListContainer(props: ListContainerProps) {
  const {
    isSmall = false,
    isVerySmall = false,
    smallComponentSpan = 0,
    largeComponentSpan = 1,
    children
  } = props;

  return (
    <Paper
      elevation={paperElevation}
      sx={{ 
        padding: paddingMedium,
        width: isVerySmall ? widthVerySmall : isSmall ? widthSmall : widthLarge,
        minWidth: isVerySmall ? widthMinVerySmall : isSmall ? widthMinSmall : widthMinLarge,
        height: smallComponentSpan * heightMinSmall + largeComponentSpan * heightMinLarge,
        // minHeight: isVerySmall ? heightMinSmall : heightMinLarge,
      }}
    >
      {children}
    </Paper>
  )
}