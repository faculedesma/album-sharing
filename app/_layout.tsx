import "expo-dev-client";
import { ThemeProvider as NavProvider } from "@react-navigation/native";
import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import styled, { ThemeProvider } from "styled-components/native";
import { appTheme, navTheme } from "src/assets/styles/theme";
import Spinner from "src/components/loaders/Spinner";
import useAppLoading from "src/hooks/useAppLoading";
import Toast from "react-native-toast-message";
import LoginPatternPNG from "src/assets/images/bg-login.png";
import { LinearGradient } from "expo-linear-gradient";

export default function RootLayout() {
  const appLoaded = useAppLoading();

  const pathname = usePathname();

  if (!appLoaded) return <Spinner />;

  return (
    <ThemeProvider theme={appTheme}>
      <StatusBar style="light" />
      <S.AppWrapper>
        <NavProvider value={navTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen
              name="introduction"
              options={{ headerShown: false }}
            />
          </Stack>
        </NavProvider>
        <Toast position="top" topOffset={80} />
      </S.AppWrapper>
      <S.AppBackground colors={[appTheme.black, appTheme.primary]} />
      {pathname === "/login" ||
      pathname === "/introduction" ||
      pathname === "/signup" ? (
        <S.AppBackgroundImage source={LoginPatternPNG}></S.AppBackgroundImage>
      ) : null}
    </ThemeProvider>
  );
}

const S = {
  AppWrapper: styled.View`
    width: ${appTheme.windowWidth};
    height: ${appTheme.windowHeight};
    flex: 1;
    padding-right: 5%;
    padding-left: 5%;
  `,
  AppBackground: styled(LinearGradient)`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    elevation: -1;
  `,
  AppBackgroundImage: styled.ImageBackground`
    width: ${appTheme.windowWidth};
    height: ${appTheme.windowHeight};
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    elevation: -1;
    opacity: 0.5;
  `,
};
