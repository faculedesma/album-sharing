import { useState } from "react";
import styled from "styled-components/native";
import { Link } from "expo-router";
import { ArrowRight } from "src/assets/svgs/ArrowRight";
import { GenericText } from "../text/GenericText";
import { appTheme } from "src/assets/styles/theme";
import Spinner from "../loaders/Spinner";

interface ISecondaryProps {
  href: string;
  text: string;
  icon?: boolean;
  bold?: boolean;
  size?: string;
  color?: string;
  handlePress?: () => void;
}

export default function SecondaryButton({
  href,
  text,
  icon = true,
  bold = false,
  size = "sm",
  color = appTheme.secondary,
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
        <GenericText
          size={size === "sm" ? 12 : 16}
          weight={bold ? "bold" : "light"}
          color={color}
          content={loading ? <Spinner /> : text}
        />
        {icon && <ArrowRight />}
      </S.Button>
    </S.ButtonLink>
  );
}

const S = {
  ButtonLink: styled(Link)`
    width: ${(p) => p.theme.dimensions(100, "%")};
  `,
  Button: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${(p) => p.theme.dimensions(8, "px")};
    background-color: transparent;
  `,
  Icon: styled.View`
    align-items: center;
    justify-content: center;
  `,
};
