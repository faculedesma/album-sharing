import { useState } from "react";
import styled from "styled-components/native";
import { Link } from "expo-router";
import { ArrowRight } from "src/assets/svgs/ArrowRight";
import Spinner from "src/components/loaders/Spinner";
import { GenericText } from "../text/GenericText";
import { appTheme } from "src/assets/styles/theme";

interface IPrimaryProps {
  href: string;
  text: string;
  icon?: boolean;
  bold?: boolean;
  size?: string;
  color?: string;
  handlePress?: () => void;
}

export default function PrimaryButton({
  href,
  text,
  icon = true,
  bold = false,
  size = "sm",
  color = appTheme.secondary,
  handlePress = undefined,
}: IPrimaryProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLinkPress = async () => {
    setLoading(true);
    await setTimeout(() => {
      setLoading(false);
      handlePress && handlePress();
    }, 3000);
  };

  return (
    <S.ButtonContainer>
      <S.ButtonLink
        testID="primary-button"
        href={href}
        onPress={handlePress && handleLinkPress}
      >
        <GenericText
          size={size === "sm" ? 12 : 16}
          weight={bold ? "bold" : "light"}
          color={color}
          content={loading ? <Spinner /> : text}
        />

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
  Icon: styled.View`
    align-items: center;
    justify-content: center;
  `,
};
