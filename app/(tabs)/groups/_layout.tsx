import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { appTheme } from "src/assets/styles/theme";
import { Octicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
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
              <TouchableOpacity onPress={() => router.push("/home/search")}>
                <Octicons name="search" size={20} color={appTheme.secondary} />
              </TouchableOpacity>
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
