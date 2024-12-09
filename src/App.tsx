import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ThemeProvider, CssBaseline, responsiveFontSizes } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { theme } from "./theme";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const queryClient = new QueryClient();

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer rtl />
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={responsiveFontSizes(theme)}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <RouterProvider router={router(queryClient)} />
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}

export default App;
