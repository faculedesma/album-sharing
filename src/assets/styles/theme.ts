import type { DefaultTheme } from "styled-components";
import { dimensions, height, width } from "src/assets/styles/dimensions";

export const appTheme: DefaultTheme = {
  background: "#FFFFFF",
  primary: "#FFFFFF",
  secondary: "#030303",
  red: "#FF4E45",
  green: "#00AAA7",
  yellow: "#FBC02D",
  shades200: "#CDCDCD",
  shades400: "#CDCDCD",
  shades500: "#CDCDCD",
  shades700: "#CDCDCD",
  highlight: "#80D4D3",
  dimensions,
  windowHeight: `${height}px`,
  windowWidth: `${width}px`,
  wrapper: `${width * 0.9}px`,
};

export const navTheme = {
  dark: false,
  colors: {
    background: appTheme.background,
    border: appTheme.secondary,
    card: appTheme.background,
    notification: appTheme.highlight,
    primary: appTheme.primary,
    text: appTheme.secondary,
  },
};
