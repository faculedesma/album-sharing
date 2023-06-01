import { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { Stack, useRouter } from "expo-router";
import { Close } from "src/assets/svgs/Close";
import { Leave } from "src/assets/svgs/Leave";
import { Notification } from "src/assets/svgs/Notification";
import { appTheme } from "src/assets/styles/theme";
import { GenericText } from "../text/GenericText";
import { auth } from "../../../firebase";
import { GenericInput } from "../inputs/GenericInput";
import { BlurView } from "expo-blur";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";

interface IProfileProps {
  closeModal: () => void;
}

const Profile = ({ closeModal }: IProfileProps) => {
  const [bioText, setBioText] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const router = useRouter();

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const handleOnChangeBio = (value: string) => setBioText(value);

  const handleOnChangeNickname = (value: string) => setNickname(value);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        closeModal();
        router.replace("/login");
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error.message.split(":")[1].split(".")[0],
        });
        console.log(error);
        new Error(error.message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <S.Wrapper
        testID="profile-screen"
        colors={[appTheme.black, appTheme.primary]}
      >
        <Stack.Screen
          options={{ title: "Profile Screen", headerShown: false }}
        />
        <S.TitleContainer>
          <>
            <S.CloseContainer onPress={closeModal}>
              <Close />
            </S.CloseContainer>
            <S.Title testID="profile-screen-title">Profile</S.Title>
          </>
          <S.ProfileAvatar
            source={{
              uri: "https://lh3.googleusercontent.com/ogw/AOLn63FR1yAhWwMPVOxnKxNWJktQRftStxUNo2MUBx_RYg=s64-c-mo",
            }}
          ></S.ProfileAvatar>
        </S.TitleContainer>
        <S.Avatar intensity={10} tint="dark"></S.Avatar>
        <GenericInput
          value={nickname}
          maxLength={100}
          placeholder="nickname"
          textContentType="nickname"
          handleChangeText={handleOnChangeNickname}
        />
        <S.Bio testID="profile-screen-bio">
          <S.BioTitle>Bio</S.BioTitle>
          <GenericInput
            value={bioText}
            height={150}
            maxLength={200}
            multiline={true}
            placeholder="Add a little description about yourself"
            textContentType="none"
            handleChangeText={handleOnChangeBio}
          />
        </S.Bio>
        <TouchableOpacity onPress={closeModal}>
          <S.Item>
            <Notification />
            <GenericText size={16} weight="light" content="Notifications" />
            <S.Switch
              trackColor={{ false: appTheme.shades50, true: appTheme.shades50 }}
              thumbColor={isEnabled ? appTheme.highlight : appTheme.shades50}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </S.Item>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut}>
          <S.Item>
            <Leave />
            <GenericText size={16} weight="light" content="Logout" />
          </S.Item>
        </TouchableOpacity>
      </S.Wrapper>
    </TouchableWithoutFeedback>
  );
};

export default Profile;

const S = {
  Wrapper: styled(LinearGradient)`
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
    padding-top: 60px;
    padding-right: 5%;
    padding-left: 5%;
    z-index: 1;
    elevation: 1;
  `,
  CloseContainer: styled.Pressable`
    padding: 0 20px 30px 0;
    transform: translate(0, 15px);
  `,
  ProfileAvatar: styled.ImageBackground`
    height: 30px;
    width: 30px;
    background-color: ${(p) => p.theme.shades50}
    border: .5px ${(p) => p.theme.highlight}
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    right: 0;
  `,
  TitleContainer: styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: 36px;
  `,
  Avatar: styled(BlurView)`
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: 0.5px ${(p) => p.theme.highlight};
    align-self: flex-start;
    overflow: hidden;
    margin: 20px 0;
  `,
  Bio: styled.View`
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
  `,
  BioTitle: styled.Text`
    align-items: center;
    justify-content: space-between;
    color: ${(p) => p.theme.secondary};
    align-self: flex-start;
    font-family: circularStdLight;
  `,
  Item: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
  `,
  Switch: styled.Switch``,
};
