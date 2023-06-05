import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { appTheme } from "src/assets/styles/theme";
import { Octicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { GenericText } from "src/components/text/GenericText";
import LogoPNG from "src/assets/images/logo.png";

const StackLayout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerRight: () => (
            <S.HeaderRight>
              <Octicons name="search" size={20} color={appTheme.secondary} />
              <TouchableOpacity onPress={() => router.push("/profile")}>
                <S.ProfileAvatar
                  source={{
                    uri: "https://lh3.googleusercontent.com/ogw/AOLn63FR1yAhWwMPVOxnKxNWJktQRftStxUNo2MUBx_RYg=s64-c-mo",
                  }}
                ></S.ProfileAvatar>
              </TouchableOpacity>
            </S.HeaderRight>
          ),
          headerLeft: () => (
            <S.HeaderLeft>
              <S.LogoImage source={LogoPNG}></S.LogoImage>
            </S.HeaderLeft>
          ),
        }}
      />
      <Stack.Screen
        name="history"
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerRight: () => null,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <S.ProfileHeaderLeft>
                <Octicons
                  name="chevron-left"
                  size={40}
                  color={appTheme.secondary}
                />
                <GenericText size={36} weight="bold" content="History" />
              </S.ProfileHeaderLeft>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="album"
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerRight: () => null,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <S.ProfileHeaderLeft>
                <Octicons
                  name="chevron-left"
                  size={20}
                  color={appTheme.secondary}
                />
              </S.ProfileHeaderLeft>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default StackLayout;

const S = {
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
