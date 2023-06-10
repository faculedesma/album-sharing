import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import { appTheme } from "src/assets/styles/theme";

interface ISpinnerProps {
  size?: "small" | "large";
  color?: string;
}

const Spinner = ({
  size = "small",
  color = appTheme.secondary,
}: ISpinnerProps) => {
  return (
    <S.Spinner>
      <ActivityIndicator color={color} size={size} />
    </S.Spinner>
  );
};

export default Spinner;

const S = {
  Spinner: styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  `,
};
