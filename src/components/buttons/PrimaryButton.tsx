import styled from "styled-components/native";
import Spinner from "src/components/loaders/Spinner";
import { GenericText } from "../text/GenericText";
import { appTheme } from "src/assets/styles/theme";
import { BlurView } from "expo-blur";
import { Octicons } from "@expo/vector-icons";

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
        {icon && (
          <Octicons name="chevron-right" size={20} color={appTheme.secondary} />
        )}
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
};
