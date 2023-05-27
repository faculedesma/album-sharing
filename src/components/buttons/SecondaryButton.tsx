import styled from "styled-components/native";
import { Link } from "expo-router";
import { ArrowRight } from "src/assets/svgs/ArrowRight";

interface ISecondaryProps {
  href: string;
  text: string;
}

export default function SecondaryButton({ href, text }: ISecondaryProps) {
  return (
    <S.Button testID="secondary-button">
      <S.ButtonText testID="secondary-button-text">{text}</S.ButtonText>
      <ArrowRight />
    </S.Button>
  );
}

const S = {
  Button: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    align-self: flex-end;
    gap: ${(p) => p.theme.dimensions(8, "px")};
    background-color: transparent;
  `,
  ButtonText: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-weight: 300;
  `,
  Icon: styled.View`
    align-items: center;
    justify-content: center;
  `,
};
