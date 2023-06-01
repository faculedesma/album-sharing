import styled from "styled-components/native";
import { ArrowRight } from "src/assets/svgs/ArrowRight";
import Spinner from "src/components/loaders/Spinner";
import { GenericText } from "../text/GenericText";
import { appTheme } from "src/assets/styles/theme";
import { BlurView } from "expo-blur";

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
    <S.ButtonContainer intensity={10} tint="light">
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
  ButtonContainer: styled(BlurView)`
    height: 60px;
    width: 100%;
    background-color: ${(p) => p.theme.black};
    border-radius: 4px;
    overflow: hidden;
  `,
  Button: styled.Pressable`
    height: 60px;
    width: 100%;
    align-items: center;
    justify-content: center;
  `,
  Icon: styled.View`
    align-items: center;
    justify-content: center;
  `,
};
