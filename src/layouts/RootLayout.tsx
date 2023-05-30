import "expo-dev-client";
import { ThemeProvider as NavProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import styled, { ThemeProvider } from "styled-components/native";
import { appTheme, navTheme } from "src/assets/styles/theme";
import Spinner from "src/components/loaders/Spinner";
import useAppLoading from "src/hooks/useAppLoading";
import Toast from "react-native-toast-message";
import AppBG from "src/assets/images/app-bg.png";

export default function RootLayout() {
  const appLoaded = useAppLoading();

  if (!appLoaded) return <Spinner />;

  return (
    <ThemeProvider theme={appTheme}>
      <StatusBar style="dark" />
      <S.App>
        <S.AppWrapper>
          <NavProvider value={navTheme}>
            <Stack />
          </NavProvider>
          <Toast position="top" topOffset={80} />
        </S.AppWrapper>
        <S.AppBackground source={AppBG}></S.AppBackground>
      </S.App>
    </ThemeProvider>
  );
}

const S = {
  App: styled.View`
    width: ${appTheme.windowWidth};
    height: ${appTheme.windowHeight};
  `,
  AppWrapper: styled.View`
    flex: 1;
    padding-right: ${(p) => p.theme.dimensions(5, "%")};
    padding-left: ${(p) => p.theme.dimensions(5, "%")};
    z-index: 2;
    elevation: 2;
  `,
  AppBackground: styled.ImageBackground`
    width: ${appTheme.windowWidth};
    height: ${appTheme.windowHeight};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    elevation: 1;
    opacity: 0.05;
    transform: scale(2);
  `,
};
