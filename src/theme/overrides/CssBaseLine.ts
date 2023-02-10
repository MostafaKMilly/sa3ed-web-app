import { Components, Theme } from "@mui/material";

export const CssBaselineOverrides: Components<Theme>["MuiCssBaseline"] = {
  styleOverrides: {
    "html , body": {
      margin: 0,
      padding: 0,
      backgroundColor: "#E5E4E4",
      height: "100%",
    },
    "#root": {
      height: "100%",
      overflow: "auto",
    },
    "&": {
      scrollbarWidth: "thin",
      scrollbarColor: "#bfbfbf transparent",
    },
    "&::-webkit-scrollbar": {
      width: "7px",
      height: "7px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
      borderRadius: "20px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#bfbfbf",
      borderRadius: "20px",
    },
  },
};
