import { Components, Theme } from "@mui/material";
import { MuiButtonOverrides } from "./Button";
import { CssBaselineOverrides } from "./CssBaseLine";
import { MuiFormLableOverrides } from "./FormLabel";
import { MuiTextFieldOverrides } from "./Textfield";
import { MuiIconButtonOverrides } from "./IconButton";

export const componentOverrides: Components<Theme> = {
  MuiTextField: MuiTextFieldOverrides,
  MuiButton: MuiButtonOverrides,
  MuiCssBaseline: CssBaselineOverrides,
  MuiFormLabel: MuiFormLableOverrides,
  MuiIconButton: MuiIconButtonOverrides,
};
