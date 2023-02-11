import {
  createTheme,
  PaletteColor,
  PaletteColorOptions,
  Theme,
} from "@mui/material";
import { componentOverrides } from "./overrides";
import { palette } from "./palette";
import typography from "./typography";
import "./modules";

export const theme = createTheme({
  palette,
  direction: "rtl",
  components: componentOverrides,
  typography,
});
