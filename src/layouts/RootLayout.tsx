import "expo-dev-client";
import { ThemeProvider as NavProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import styled, { ThemeProvider } from "styled-components/native";
import { appTheme, navTheme } from "src/assets/styles/theme";
import Spinner from "src/components/loaders/Spinner";
import useAppLoading from "src/hooks/useAppLoading";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const appLoaded = useAppLoading();

  if (!appLoaded) return <Spinner />;

  return (
    <ThemeProvider theme={appTheme}>
      <StatusBar style="dark" />
      <S.AppWrapper>
        <NavProvider value={navTheme}>
          <Stack />
        </NavProvider>
        <Toast position="top" topOffset={80} />
      </S.AppWrapper>
    </ThemeProvider>
  );
}

const S = {
  AppWrapper: styled.View`
    flex: 1;
    width: ${appTheme.windowWidth};
    flex-direction: column;
    background-color: ${appTheme.background};
  `,
};
