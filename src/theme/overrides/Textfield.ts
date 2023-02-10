import { Components, Theme } from "@mui/material";
export const MuiTextFieldOverrides: Components<
  Omit<Theme, "components">
>["MuiTextField"] = {
  defaultProps: {
    variant: "outlined",
    hiddenLabel: true,
  },
  variants: [
    {
      props: {
        variant: "outlined",
      },
      style: ({ theme }) => ({
        "& .MuiFormLabel-root": {
          display: "none",
        },

        "& .MuiInputBase-root": {
          borderRadius: 6,
          color: theme.palette.common.black,
          minHeight: 45,
          overflow: "hidden",
        },
        "& .MuiFilledInput-root::after .MuiFilledInput-root::before": {
          display: "none",
        },
      }),
    },
    {
      props: {
        select: true,
      },
      style: ({ theme }) => ({
        "& .MuiInputBase-root .MuiSvgIcon-root ": {
          background: theme.palette.common.black,
          width: "34px",
          height: "35px",
          margin: "-6px",
          color: theme.palette.primary.light,
          borderRadius: "10px",
          border: `2px solid ${theme.palette.primary.light}`,
        },
      }),
    },
  ],
};
