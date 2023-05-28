import { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { Stack } from "expo-router";
import { Close } from "src/assets/svgs/Close";
import { Leave } from "src/assets/svgs/Leave";
import { Notification } from "src/assets/svgs/Notification";
import { appTheme } from "src/assets/styles/theme";

export default function Profile({ closeModal }) {
  const [bioText, setBioText] = useState<string>(
    "Here is the description of the user"
  );
  const [username, setUsername] = useState<string>("@chicha73");
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const handleOnChangeBio = (value) => setBioText(value);

  const handleOnChangeUsername = (value) => setBioText(value);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <S.Wrapper testID="intro-screen">
        <Stack.Screen
          options={{ title: "Introducion Screen", headerShown: false }}
        />
        <S.TitleContainer>
          <TouchableOpacity onPress={closeModal}>
            <Close />
          </TouchableOpacity>
          <S.Title testID="intro-screen-title">Profile</S.Title>
        </S.TitleContainer>
        <S.Avatar></S.Avatar>
        <S.UsernameInput
          value={username}
          maxLength={100}
          placeholder="Username"
          onChangeText={handleOnChangeUsername}
        ></S.UsernameInput>
        <S.Bio testID="intro-screen-bio">
          <S.BioTitle>Bio</S.BioTitle>
          <S.BioInput
            value={bioText}
            maxLength={150}
            multiline={true}
            placeholder="Add a little description about yourself"
            onChangeText={handleOnChangeBio}
          ></S.BioInput>
          <S.BioMaxChar>{bioText?.length}/150</S.BioMaxChar>
        </S.Bio>
        <TouchableOpacity onPress={closeModal}>
          <S.Item>
            <Notification />
            <S.Text>Notifications</S.Text>
            <S.Switch
              trackColor={{ false: appTheme.shades50, true: appTheme.shades50 }}
              thumbColor={isEnabled ? appTheme.highlight : appTheme.shades200}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </S.Item>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeModal}>
          <S.Item>
            <Leave />
            <S.Text>Logout</S.Text>
          </S.Item>
        </TouchableOpacity>
      </S.Wrapper>
    </TouchableWithoutFeedback>
  );
}

const S = {
  Wrapper: styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
    padding-right: ${(p) => p.theme.dimensions(5, "%")};
    padding-left: ${(p) => p.theme.dimensions(5, "%")};
    gap: ${(p) => p.theme.dimensions(16, "px")};
    background-color: ${(p) => p.theme.primary};
    padding-top: ${(p) => p.theme.dimensions(64, "px")};
  `,
  TitleContainer: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${(p) => p.theme.dimensions(16, "px")};
    align-self: flex-start;
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: ${(p) => p.theme.dimensions(36, "px")};
  `,
  Avatar: styled.View`
    height: ${(p) => p.theme.dimensions(100, "px")};
    width: ${(p) => p.theme.dimensions(100, "px")};
    background-color: ${(p) => p.theme.highlight}
    border-radius: ${(p) => p.theme.dimensions(50, "%")};
    border: ${(p) => p.theme.dimensions(0.5, "px")} ${(p) => p.theme.shades200};
    align-self: flex-start;
  `,
  Bio: styled.View`
    align-items: center;
    justify-content: space-between;
    width: ${(p) => p.theme.dimensions(100, "%")};
    gap: ${(p) => p.theme.dimensions(4, "px")};
  `,
  BioTitle: styled.Text`
    align-items: center;
    justify-content: space-between;
    gap: ${(p) => p.theme.dimensions(4, "px")};
    color: ${(p) => p.theme.secondary};
    align-self: flex-start;
    font-family: circularStdLight;
  `,
  BioInput: styled.TextInput`
    height: ${(p) => p.theme.dimensions(175, "px")};
    width: ${(p) => p.theme.dimensions(100, "%")};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: ${(p) => p.theme.dimensions(16, "px")};
    border: ${(p) => p.theme.dimensions(0.5, "px")} ${(p) => p.theme.shades200};
    border-radius: ${(p) => p.theme.dimensions(4, "px")};
    font-family: circularStdLight;
  `,
  UsernameInput: styled.TextInput`
    height: ${(p) => p.theme.dimensions(50, "px")};
    width: ${(p) => p.theme.dimensions(100, "%")};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: ${(p) => p.theme.dimensions(16, "px")};
    border: ${(p) => p.theme.dimensions(0.5, "px")} ${(p) => p.theme.shades200};
    border-radius: ${(p) => p.theme.dimensions(4, "px")};
    font-family: circularStdLight;
  `,
  BioMaxChar: styled.Text`
    position: absolute;
    bottom: ${(p) => p.theme.dimensions(4, "px")};
    right: ${(p) => p.theme.dimensions(4, "px")};
    color: ${(p) => p.theme.secondary};
    font-family: circularStdLight;
  `,
  Item: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${(p) => p.theme.dimensions(16, "px")};
  `,
  Switch: styled.Switch``,
  Text: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdLight;
    font-size: ${(p) => p.theme.dimensions(16, "px")};
  `,
};
