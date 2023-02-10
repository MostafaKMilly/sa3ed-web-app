import { Components } from "@mui/material";

export const MuiIconButtonOverrides: Components["MuiIconButton"] = {
  defaultProps: {
    disableRipple: true,
    disableTouchRipple: true,
  },
};
