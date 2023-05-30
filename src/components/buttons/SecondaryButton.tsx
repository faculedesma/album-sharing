import styled from "styled-components/native";
import { ArrowRight } from "src/assets/svgs/ArrowRight";
import { GenericText } from "../text/GenericText";
import { appTheme } from "src/assets/styles/theme";
import Spinner from "../loaders/Spinner";

interface ISecondaryProps {
  text: string;
  icon?: boolean;
  bold?: boolean;
  size?: string;
  color?: string;
  handlePress: () => void;
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
    <S.Button testID="secondary-button" onPress={handlePress}>
      <GenericText
        size={size === "sm" ? 12 : 16}
        weight={bold ? "bold" : "light"}
        color={color}
        content={loading ? <Spinner /> : text}
      />
      {icon && <ArrowRight />}
    </S.Button>
  );
}

const S = {
  Button: styled.Pressable`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    background-color: transparent;
  `,
  Icon: styled.View`
    align-items: center;
    justify-content: center;
  `,
};
