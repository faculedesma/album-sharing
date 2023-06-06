import styled from "styled-components/native";
import { GenericText } from "../text/GenericText";
import { View } from "react-native-animatable";
import { appTheme } from "src/assets/styles/theme";
import { FontWeight } from "src/components/text/GenericText";

interface IHeadingThreeProps {
  text: string;
  weight?: FontWeight;
}

export const HeadingThree = ({
  text,
  weight = "light",
}: IHeadingThreeProps) => {
  return (
    <S.HeadingThree animation="fadeIn" duration={300}>
      <GenericText
        size={16}
        weight={weight}
        color={appTheme.secondary}
        content={text}
      />
    </S.HeadingThree>
  );
};

const S = {
  HeadingThree: styled(View)``,
};
