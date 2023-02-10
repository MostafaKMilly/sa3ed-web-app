import { Components, Theme } from "@mui/material";

export const MuiFormLableOverrides: Components<
  Omit<Theme, "components">
>["MuiFormLabel"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.common.black,
      ...theme.typography.body1,
    }),
  },
};
