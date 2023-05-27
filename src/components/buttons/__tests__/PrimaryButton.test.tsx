import React from "react";
import { create, type ReactTestRendererJSON } from "react-test-renderer";
import { ThemeProvider } from "styled-components/native";
import { appTheme } from "src/assets/styles/theme";
import SecondaryButton from "src/components/buttons/PrimaryButton";

jest.mock("expo-router", () => ({ Link: "Link" }));

describe("src/components/LinkButton", () => {
  const LinkButtonComponent = (
    <ThemeProvider theme={appTheme}>
      <SecondaryButton href="/" text="test" />
    </ThemeProvider>
  );

  it("renders correctly", () => {
    const linkButton = create(
      LinkButtonComponent
    ).toJSON() as ReactTestRendererJSON;
    const linkButtonText = linkButton.children![0] as ReactTestRendererJSON;

    expect(linkButton.type).toBe("Link");
    expect(linkButton.props.testID).toBe("link-button");
    expect(linkButton!.props.href).toBe("/");

    expect(linkButtonText.type).toBe("Text");
    expect(linkButtonText!.children![0]).toBe("test");
    expect(linkButtonText!.props.testID).toBe("link-button-text");
  });
});
