import type { DefaultTheme } from "styled-components";
import { dimensions, height, width } from "src/assets/styles/dimensions";

export const appTheme: DefaultTheme = {
  background: "#FFFFFF",
  primary: "#FFFFFF",
  secondary: "#030303",
  red: "#FF4E45",
  green: "#00AAA7",
  green200: "#80D4D3",
  yellow: "#FBC02D",
  lightblue: "#3EA6FF",
  shades50: "#F2F2F2",
  shades100: "#E6E6E6",
  shades200: "#CDCDCD",
  shades400: "#9A9A9A",
  shades500: "#818181",
  shades700: "#4F4F4F",
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
