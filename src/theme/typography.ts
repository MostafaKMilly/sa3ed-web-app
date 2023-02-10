import { TypographyOptions } from "@mui/material/styles/createTypography";

const PRIMARY_FONT = "Tajawal , sans-serif";

const typography: TypographyOptions = {
  fontFamily: PRIMARY_FONT,
  fontWeightBold: 700,
  allVariants: {
    letterSpacing: 0,
    fontWeight: 700,
    fontFamily: PRIMARY_FONT,
  },
  h1: {
    fontSize: 35,
  },
  h2: {
    fontSize: 30,
  },
  h3: {
    fontSize: 20,
  },
  h4: {
    fontSize: 16,
  },
  body1: {
    fontSize: 15,
  },
  body2: {
    fontSize: 14,
  },
  button: {
    fontFamily: PRIMARY_FONT,
    fontWeight: 700,
    fontSize: 15,
  },
};

export default typography;
