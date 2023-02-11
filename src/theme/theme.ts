import { createTheme } from "@mui/material";
import { componentOverrides } from "./overrides";
import { palette } from "./palette";
import typography from "./typography";

export const theme = createTheme({
  palette,
  direction: "rtl",
  components: componentOverrides,
  typography,
});
