import styled from "styled-components/native";
import { Link } from "expo-router";
import { ArrowRight } from "src/assets/svgs/ArrowRight";

interface ISecondaryProps {
  href: string;
  text: string;
  icon?: boolean;
  bold?: boolean;
}

export default function SecondaryButton({
  href,
  text,
  icon = true,
  bold = false,
}: ISecondaryProps) {
  return (
    <S.ButtonLink testID="secondary-button" href={href}>
      <S.Button testID="secondary-button">
        {bold ? (
          <S.ButtonTextBold testID="secondary-button-text-bold">
            {text}
          </S.ButtonTextBold>
        ) : (
          <S.ButtonText testID="secondary-button-text-bold">
            {text}
          </S.ButtonText>
        )}
        {icon && <ArrowRight />}
      </S.Button>
    </S.ButtonLink>
  );
}

const S = {
  ButtonLink: styled(Link)`
    align-self: flex-end;
    padding-top: ${(p) => p.theme.dimensions(8, "px")};
    padding-bottom: ${(p) => p.theme.dimensions(8, "px")};
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
    font-family: circularStdLight;
    font-size: ${(p) => p.theme.dimensions(14, "px")};
  `,
  ButtonTextBold: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: ${(p) => p.theme.dimensions(14, "px")};
  `,
  Icon: styled.View`
    align-items: center;
    justify-content: center;
  `,
};
