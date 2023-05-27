import styled from "styled-components/native";
import { Stack } from "expo-router";
import SecondaryButton from "src/components/buttons/SecondaryButton";

export default function Introduction() {
  return (
    <S.Wrapper testID="intro-screen">
      <Stack.Screen
        options={{ title: "Introducion Screen", headerShown: false }}
      />
      <S.Title testID="intro-screen-title">Choose Avatar</S.Title>
      <SecondaryButton href="/home" text="" />
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-right: ${(p) => p.theme.dimensions(5, "%")};
    padding-left: ${(p) => p.theme.dimensions(5, "%")};
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: ${(p) => p.theme.dimensions(36, "px")};
  `,
};
