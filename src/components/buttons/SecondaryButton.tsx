import styled from "styled-components/native";
import { GenericText } from "../text/GenericText";
import { appTheme } from "src/assets/styles/theme";
import Spinner from "../loaders/Spinner";
import { Octicons } from "@expo/vector-icons";

interface ISecondaryProps {
  text: string;
  icon?: boolean;
  bold?: boolean;
  size?: string;
  color?: string;
  handlePress?: () => void;
  loading?: boolean;
}

export default function SecondaryButton({
  text,
  icon = true,
  bold = false,
  size = "sm",
  color = appTheme.secondary,
  handlePress,
  loading = false,
}: ISecondaryProps) {
  return (
    <S.Button testID="secondary-button" onPress={handlePress && handlePress}>
      <GenericText
        size={size === "sm" ? 12 : 16}
        weight={bold ? "bold" : "light"}
        color={color}
        content={loading ? <Spinner /> : text}
      />
      {icon && (
        <Octicons name="arrow-right" size={16} color={appTheme.secondary} />
      )}
    </S.Button>
  );
}

const S = {
  Button: styled.Pressable`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    z-index: 1;
    elevation: 1;
    gap: 10px;
  `,
};
