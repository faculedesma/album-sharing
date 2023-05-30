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
import Toast from "react-native-toast-message";
import { BlurView } from "expo-blur";

interface IProfileProps {
  closeModal: () => void;
}

export default function Profile({ closeModal }: IProfileProps) {
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
      <S.Wrapper testID="profile-screen" intensity={10} tint="light">
        <Stack.Screen
          options={{ title: "Profile Screen", headerShown: false }}
        />
        <S.TitleContainer>
          <S.CloseIcon onPress={closeModal}>
            <Close />
          </S.CloseIcon>
          <S.Title testID="profile-screen-title">Profile</S.Title>
        </S.TitleContainer>
        <S.Avatar></S.Avatar>
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
              thumbColor={isEnabled ? appTheme.highlight : appTheme.shades100}
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
}

const S = {
  Wrapper: styled(BlurView)`
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
    background-color: ${(p) => p.theme.primary};
    padding-top: 60px;
    padding-right: 5%;
    padding-left: 5%;
  `,
  CloseIcon: styled.TouchableOpacity``,
  TitleContainer: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    align-self: flex-start;
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: 36px;
  `,
  Avatar: styled.View`
    height: 100px;
    width: 100px;
    background-color: ${(p) => p.theme.highlight}
    border-radius: 50%;
    border: .5px ${(p) => p.theme.shades200};
    align-self: flex-start;
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
