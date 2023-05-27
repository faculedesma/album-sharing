import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import { appTheme } from "src/assets/styles/theme";

export default function Spinner() {
  return (
    <S.Spinner testID="spinner">
      <ActivityIndicator
        testID="activity-indicator"
        color={appTheme.primary}
        size="small"
      />
    </S.Spinner>
  );
}

const S = {
  Spinner: styled.View`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  `,
};
