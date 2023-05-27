import { useState } from "react";
import styled from "styled-components/native";
import { Link } from "expo-router";
import { ArrowRight } from "src/assets/svgs/ArrowRight";

interface ISecondaryProps {
  href: string;
  text: string;
  icon?: boolean;
  bold?: boolean;
  size?: string;
  handlePress?: () => void;
}

export default function SecondaryButton({
  href,
  text,
  icon = true,
  bold = false,
  size = "sm",
  handlePress = undefined,
}: ISecondaryProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLinkPress = async () => {
    setLoading(true);
    await setTimeout(() => {
      setLoading(false);
      handlePress && handlePress();
    }, 3000);
  };

  return (
    <S.ButtonLink
      testID="secondary-button"
      href={href}
      onPress={handlePress && handleLinkPress}
    >
      <S.Button testID="secondary-button">
        {bold ? (
          <S.ButtonTextBold
            testID="secondary-button-text-bold"
            style={{
              fontSize: size === "sm" ? 12 : 16,
              opacity: loading ? 0.5 : 1,
            }}
          >
            {text}
          </S.ButtonTextBold>
        ) : (
          <S.ButtonText
            testID="secondary-button-text-bold"
            style={{
              fontSize: size === "sm" ? 12 : 16,
              opacity: loading ? 0.5 : 1,
            }}
          >
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
    width: ${(p) => p.theme.dimensions(100, "%")};
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
