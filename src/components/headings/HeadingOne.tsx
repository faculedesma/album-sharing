import styled from "styled-components/native";
import { GenericText } from "../text/GenericText";
import { View } from "react-native-animatable";
import { appTheme } from "src/assets/styles/theme";
import { FontWeight, TextAlign } from "src/components/text/GenericText";

interface IHeadingOneProps {
  text: string;
  width?: number | string;
  align?: TextAlign;
  weight?: FontWeight;
}

export const HeadingOne = ({
  text,
  width = "auto",
  align = "left",
  weight = "bold",
}: IHeadingOneProps) => {
  return (
    <S.HeadingOne animation="fadeIn" duration={300} style={{ width: width }}>
      <GenericText
        size={36}
        weight={weight}
        color={appTheme.secondary}
        content={text}
        align={align}
        numberOfLines={4}
      />
    </S.HeadingOne>
  );
};

const S = {
  HeadingOne: styled(View)``,
};
