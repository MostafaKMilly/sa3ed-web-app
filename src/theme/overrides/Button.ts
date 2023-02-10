import { alpha, Components, Theme } from "@mui/material";
export const MuiButtonOverrides: Components<
  Omit<Theme, "components">
>["MuiButton"] = {
  defaultProps: {
    variant: "contained",
    disableRipple: true,
    disableElevation: true,
    disableFocusRipple: true,
  },
  styleOverrides: {
    root: ({ ownerState }) => ({
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 10,
      paddingRight: ownerState.endIcon ? 10 : 16,
      paddingLeft: ownerState.startIcon ? 10 : 16,
      textTransform: "initial",
      height: 36,
      minWidth: 145,
    }),
    contained: ({ ownerState, theme }) => {
      const color = ownerState.color ?? "inherit";
      return {
        "&:disabled": {
          backgroundColor:
            color === "inherit"
              ? "inherit"
              : alpha(theme.palette[color].main, 0.3),
          color: "#fff",
        },
      };
    },
  },
};
