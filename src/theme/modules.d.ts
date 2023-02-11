declare module "@mui/material/Button/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
  interface ButtonPropsVariantOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/styles/createPalette" {
  export interface PaletteOptions {
    tertiary?: PaletteColorOptions;
  }
  export interface Palette {
    tertiary: PaletteColor;
  }
}

declare module "@mui/material/Textfield/Textfield" {
  export interface TextFieldPropsColorOverrides {
    tertiary?: true;
  }
}
