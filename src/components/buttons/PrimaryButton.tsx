import styled from "styled-components/native";
import { Link } from "expo-router";
import { ArrowRight } from "src/assets/svgs/ArrowRight";

interface IPrimaryProps {
  href: string;
  text: string;
  icon?: boolean;
  bold?: boolean;
  size?: string;
}

export default function PrimaryButton({
  href,
  text,
  icon = true,
  bold = false,
  size = "sm",
}: IPrimaryProps) {
  return (
    <S.ButtonContainer>
      <S.ButtonLink testID="primary-button" href={href}>
        {bold ? (
          <S.ButtonTextBold
            testID="primary-button-text-bold"
            style={{
              fontSize: size === "sm" ? 12 : 16,
            }}
          >
            {text}
          </S.ButtonTextBold>
        ) : (
          <S.ButtonText
            testID="primary-button-text-bold"
            style={{
              fontSize: size === "sm" ? 12 : 16,
            }}
          >
            {text}
          </S.ButtonText>
        )}
        <S.Icon>{icon && <ArrowRight />}</S.Icon>
      </S.ButtonLink>
    </S.ButtonContainer>
  );
}

const S = {
  ButtonContainer: styled.View`
    height: ${(p) => p.theme.dimensions(60, "px")};
    width: ${(p) => p.theme.dimensions(100, "%")};
    align-items: center;
    gap: ${(p) => p.theme.dimensions(8, "px")};
    justify-content: center;
    background-color: ${(p) => p.theme.secondary};
    border-radius: ${(p) => p.theme.dimensions(4, "px")};
    overflow: hidden;
  `,
  ButtonLink: styled(Link)``,
  ButtonText: styled.Text`
    color: ${(p) => p.theme.primary};
    font-family: circularStdLight;
    font-size: ${(p) => p.theme.dimensions(14, "px")};
    text-align: center;
  `,
  ButtonTextBold: styled.Text`
    color: ${(p) => p.theme.primary};
    font-family: circularStdBold;
    font-size: ${(p) => p.theme.dimensions(14, "px")};
    text-align: center;
  `,
  Icon: styled.View`
    align-items: center;
    justify-content: center;
  `,
};
