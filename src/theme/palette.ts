import {
  PaletteOptions,
  SimplePaletteColorOptions,
  CommonColors,
} from "@mui/material";

const primary: SimplePaletteColorOptions = {
  main: "#97d5c8",
  light: "#b6e2d9",
  dark: "#5b8078",
  contrastText: "#1D1D1D",
};

const secondary: SimplePaletteColorOptions = {
  main: "#5a6f80",
  dark: "#36434d",
  light: "#adb7c0",
};

const common: CommonColors = {
  black: "#1D1D1D",
  white: "#FFFFFF",
};

export const palette: PaletteOptions = {
  primary,
  secondary,
  common,
};
