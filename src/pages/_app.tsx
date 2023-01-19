import { createTheme, ThemeProvider } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement, registerables as registerablesJS, Title,
  Tooltip
} from 'chart.js';
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import { CssBaseline } from '@mui/material';
import { blue, lightBlue } from '@mui/material/colors';
import "../styles/globals.css";

const theme = createTheme(
  {
    typography: {
      fontSize: 14,
    },
    palette: {
      mode: 'dark',
      primary: {
        light: blue[300],
        main: blue[500],
        dark: blue[700],
      },
      secondary: {
        light: lightBlue[300],
        main: lightBlue[500],
        dark: lightBlue[700],
      },
    },
  }
);

ChartJS.register(...registerablesJS);
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Filler,
  Title, 
  Tooltip, 
  Legend, 
  BarElement
);

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <CssBaseline enableColorScheme />
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
