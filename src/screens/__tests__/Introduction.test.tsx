import React from "react";
import { ThemeProvider } from "styled-components/native";
import { appTheme } from "src/assets/styles/theme";
import Introduction from "src/screens/Introduction";

jest.mock("expo-router", () => ({ Stack: { Screen: "Screen" } }));
jest.mock("src/components/buttons/SecondaryButton", () => "SecondaryButton");

describe("src/screens/Introduction", () => {
  const IntroductionComponent = (
    <ThemeProvider theme={appTheme}>
      <Introduction />
    </ThemeProvider>
  );

  it("renders correctly", () => {});
});
