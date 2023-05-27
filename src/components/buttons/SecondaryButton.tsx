import styled from "styled-components/native";
import { Link } from "expo-router";
import { ArrowRight } from "src/assets/svgs/ArrowRight";

interface ISecondaryProps {
  href: string;
  text: string;
}

export default function SecondaryButton({ href, text }: ISecondaryProps) {
  return (
    <S.ButtonLink testID="secondary-button" href={href}>
      <S.Button testID="secondary-button">
        <S.ButtonText testID="secondary-button-text">{text}</S.ButtonText>
        <ArrowRight />
      </S.Button>
    </S.ButtonLink>
  );
}

const S = {
  ButtonLink: styled(Link)`
    align-self: flex-end;
  `,
  Button: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
