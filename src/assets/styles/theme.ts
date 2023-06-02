import type { DefaultTheme } from "styled-components";
import { dimensions, height, width } from "src/assets/styles/dimensions";

export const appTheme: DefaultTheme = {
  background: "transparent",
  primary: "#18171C",
  secondary: "#F4F4F4",
  red: "#FF4E45",
  green: "#AFD0BF",
  green500: "#D7E7DF",
  green100: "#F7FAF9",
  yellow: "#FBC02D",
  shades50: "#F2F2F2",
  shades100: "#E6E6E6",
  shades200: "#CDCDCD",
  shades400: "#9A9A9A",
  shades500: "#818181",
  shades700: "#4F4F4F",
  shades800: "#353535",
  black: "#000000",
  highlight: "#AFD0BF",
  dimensions,
  windowHeight: `${height}px`,
  windowWidth: `${width}px`,
};

export const navTheme = {
  dark: false,
  colors: {
    background: appTheme.background,
    border: appTheme.secondary,
    card: appTheme.background,
    notification: appTheme.highlight,
    primary: appTheme.primary,
    secondary: appTheme.secondary,
    text: appTheme.secondary,
  },
};
