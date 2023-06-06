import styled from "styled-components/native";
import { GenericText } from "../text/GenericText";
import { View } from "react-native-animatable";
import { appTheme } from "src/assets/styles/theme";
import { FontWeight } from "src/components/text/GenericText";

interface IHeadingTwoProps {
  text: string;
  weight?: FontWeight;
}

export const HeadingTwo = ({ text, weight = "light" }: IHeadingTwoProps) => {
  return (
    <S.HeadingTwo animation="fadeIn" duration={300}>
      <GenericText
        size={20}
        weight={weight}
        color={appTheme.secondary}
        content={text}
      />
    </S.HeadingTwo>
  );
};

const S = {
  HeadingTwo: styled(View)``,
};
