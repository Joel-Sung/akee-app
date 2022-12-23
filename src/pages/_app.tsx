import { createTheme, ThemeProvider } from '@mui/material';
import { BarElement, CategoryScale, Chart, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import { CssBaseline } from '@mui/material';
import { deepPurple, purple } from '@mui/material/colors';
import "../styles/globals.css";

const theme = createTheme(
  {
    palette: {
      mode: 'dark',
      primary: {
        light: deepPurple[700],
        main: deepPurple[500],
        dark: deepPurple[300],
      },
      secondary: {
        light: purple[700],
        main: purple[500],
        dark: purple[300],
      },
    },
  }
);

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend, BarElement);

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
