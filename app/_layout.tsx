import "expo-dev-client";
import { ThemeProvider as NavProvider } from "@react-navigation/native";
import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import styled, { ThemeProvider } from "styled-components/native";
import { appTheme, navTheme } from "src/assets/styles/theme";
import Spinner from "src/components/loaders/Spinner";
import useAppLoading from "src/hooks/useAppLoading";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import { Octicons } from "@expo/vector-icons";
import { Pressable, TouchableOpacity } from "react-native";
import { GenericText } from "src/components/text/GenericText";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function RootLayout() {
  const appLoaded = useAppLoading();
  const router = useRouter();

  if (!appLoaded) return <Spinner />;

  return (
    <ThemeProvider theme={appTheme}>
      <StatusBar style="light" />
      <BottomSheetModalProvider>
        <S.AppWrapper>
          <NavProvider value={navTheme}>
            <Stack>
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen
                name="signup"
                options={{
                  headerTitle: "",
                  headerRight: () => null,
                  headerStyle: {
                    backgroundColor: appTheme.black,
                  },
                  headerShadowVisible: false,
                  headerLeft: () => (
                    <Pressable onPress={() => router.replace("/login")}>
                      <Octicons
                        name="chevron-left"
                        size={20}
                        color={appTheme.secondary}
                      />
                    </Pressable>
                  ),
                }}
              />
              <Stack.Screen
                name="introduction"
                options={{
                  headerTitle: "",
                  headerStyle: {
                    backgroundColor: appTheme.black,
                  },
                  headerShadowVisible: false,
                  headerRight: () => null,
                  headerLeft: () => (
                    <Pressable onPress={() => router.replace("/signup")}>
                      <Octicons
                        name="chevron-left"
                        size={20}
                        color={appTheme.secondary}
                      />
                    </Pressable>
                  ),
                }}
              />
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerTitle: "",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="profile"
                options={{
                  presentation: "fullScreenModal",
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: appTheme.black,
                  },
                  headerShadowVisible: false,
                  headerTitle: "",
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                      <S.ProfileHeaderLeft>
                        <Octicons
                          name="x"
                          size={40}
                          color={appTheme.secondary}
                        />
                        <GenericText
                          size={36}
                          weight="bold"
                          content="Profile"
                        />
                      </S.ProfileHeaderLeft>
                    </TouchableOpacity>
                  ),
                }}
              />
            </Stack>
          </NavProvider>
          <Toast position="top" topOffset={80} />
        </S.AppWrapper>
      </BottomSheetModalProvider>
      <S.AppBackground colors={[appTheme.black, appTheme.primary]} />
    </ThemeProvider>
  );
}

const S = {
  AppWrapper: styled.View`
    width: ${appTheme.windowWidth};
    height: ${appTheme.windowHeight};
    flex: 1;
    overflow: visible;
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
  Header: styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  HeaderLeft: styled.View`
    height: 30px;
    width: 30px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  `,
  ProfileHeaderLeft: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  `,
  HeaderRight: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  `,
  LogoImage: styled.ImageBackground`
    height: 20px;
    width: 25px;
    align-self: center;
  `,
  ProfileContainer: styled.Button``,
  ProfileAvatar: styled.ImageBackground`
    height: 30px;
    width: 30px;
    background-color: ${(p) => p.theme.shades50}
    border: .5px ${(p) => p.theme.highlight}
    border-radius: 50%;
    overflow: hidden;
  `,
};
