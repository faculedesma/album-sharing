import styled from "styled-components/native";
import { ArrowRight } from "src/assets/svgs/ArrowRight";
import Spinner from "src/components/loaders/Spinner";
import { GenericText } from "../text/GenericText";
import { appTheme } from "src/assets/styles/theme";

interface IPrimaryProps {
  text: string;
  icon?: boolean;
  bold?: boolean;
  size?: string;
  color?: string;
  handlePress: () => void;
  loading?: boolean;
}

export default function PrimaryButton({
  text,
  icon = true,
  bold = false,
  size = "sm",
  color = appTheme.secondary,
  handlePress,
  loading = false,
}: IPrimaryProps) {
  return (
    <S.ButtonContainer>
      <S.Button testID="primary-button" onPress={handlePress}>
        <GenericText
          size={size === "sm" ? 12 : 16}
          weight={bold ? "bold" : "light"}
          color={color}
          content={loading ? <Spinner /> : text}
        />
        <S.Icon>{icon && <ArrowRight />}</S.Icon>
      </S.Button>
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
  Button: styled.Pressable``,
  Icon: styled.View`
    align-items: center;
    justify-content: center;
  `,
};
