import { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components/native";
import { Stack } from "expo-router";
import SecondaryButton from "src/components/buttons/SecondaryButton";
import { Logo } from "src/assets/svgs/Logo";
import { appTheme } from "src/assets/styles/theme";
import { GenericInput } from "src/components/inputs/GenericInput";

export default function Introduction() {
  const [bioText, setBioText] = useState<string>("");

  const handleOnChangeBio = (value: string) => setBioText(value);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <S.Wrapper testID="intro-screen" behavior="padding">
        <Stack.Screen
          options={{ title: "Introducion Screen", headerShown: false }}
        />
        <S.LogoContainer testID="intro-screen-logo">
          <Logo />
        </S.LogoContainer>
        <S.Title testID="intro-screen-title">Choose avatar</S.Title>
        <S.AvatarOptions testID="intro-screen-options">
          <S.Circle style={{ backgroundColor: appTheme.red }}></S.Circle>
          <S.Circle style={{ backgroundColor: appTheme.green }}></S.Circle>
          <S.Circle style={{ backgroundColor: appTheme.yellow }}></S.Circle>
          <S.Circle style={{ backgroundColor: appTheme.green }}></S.Circle>
          <S.Circle style={{ backgroundColor: appTheme.red }}></S.Circle>
          <S.Circle style={{ backgroundColor: appTheme.lightblue }}></S.Circle>
          <S.Circle style={{ backgroundColor: appTheme.yellow }}></S.Circle>
          <S.Circle style={{ backgroundColor: appTheme.lightblue }}></S.Circle>
        </S.AvatarOptions>
        <S.Bio testID="intro-screen-bio">
          <S.BioTitle>Bio</S.BioTitle>
          <GenericInput
            value={bioText}
            height={175}
            maxLength={150}
            multiline={true}
            numberOfLines={5}
            textContentType="none"
            placeholder="Add a little description about yourself"
            handleChangeText={handleOnChangeBio}
          />
        </S.Bio>
        <S.ContinueButton>
          <SecondaryButton
            href="/home"
            text="Continue"
            icon={false}
            bold={true}
            size="md"
            handlePress={() => console.log("finishing sign up")}
          />
        </S.ContinueButton>
      </S.Wrapper>
    </TouchableWithoutFeedback>
  );
}

const S = {
  Wrapper: styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-right: ${(p) => p.theme.dimensions(5, "%")};
    padding-left: ${(p) => p.theme.dimensions(5, "%")};
    gap: ${(p) => p.theme.dimensions(16, "px")};
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: ${(p) => p.theme.dimensions(36, "px")};
    margin-bottom: ${(p) => p.theme.dimensions(16, "px")};
  `,
  LogoContainer: styled.View`
    height: ${(p) => p.theme.dimensions(100, "px")};
    width: ${(p) => p.theme.dimensions(100, "px")};
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-radius: ${(p) => p.theme.dimensions(50, "%")};
    border: ${(p) => p.theme.dimensions(0.5, "px")} ${(p) => p.theme.highlight};
    overflow: visible;
  `,
  AvatarOptions: styled.View`
    width: ${(p) => p.theme.dimensions(100, "%")};
    height: ${(p) => p.theme.dimensions(200, "px")};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: ${(p) => p.theme.dimensions(8, "px")};
    padding-left: ${(p) => p.theme.dimensions(16, "px")};
  `,
  Circle: styled.View`
    height: ${(p) => p.theme.dimensions(75, "px")};
    width: ${(p) => p.theme.dimensions(75, "px")};
    background-color: ${(p) => p.theme.highlight}
    border-radius: ${(p) => p.theme.dimensions(50, "%")};
    border: ${(p) => p.theme.dimensions(0.5, "px")} ${(p) => p.theme.shades200};
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
  ContinueButton: styled.Text`
    align-self: center;
    margin-top: ${(p) => p.theme.dimensions(16, "px")};b
  `,
};
