import { ReactElement } from "react";
import { appTheme } from "src/assets/styles/theme";
import styled from "styled-components/native";

interface ITextrops {
  size: FontSize;
  weight: FontWeight;
  color?: string;
  content: string | number | ReactElement;
  ellipsizeMode?: string;
  numberOfLines?: number;
}

type FontSize = 10 | 12 | 14 | 16 | 20;
type FontWeight = "book" | "bold" | "light" | "medium";

export const GenericText = ({
  size,
  weight,
  color = appTheme.secondary,
  content,
  ellipsizeMode = undefined,
  numberOfLines = undefined,
}: ITextrops) => {
  switch (weight) {
    case "light":
      return (
        <S.TextLight
          style={{
            color: color,
            fontSize: size,
          }}
        >
          {content}
        </S.TextLight>
      );
    case "bold":
      return (
        <S.TextBold
          style={{
            color: color,
            fontSize: size,
          }}
        >
          {content}
        </S.TextBold>
      );
    case "book":
      return (
        <S.TextBook
          style={{
            color: color,
            fontSize: size,
          }}
        >
          {content}
        </S.TextBook>
      );
    case "medium":
      return (
        <S.TextMedium
          style={{
            color: color,
            fontSize: size,
          }}
        >
          {content}
        </S.TextMedium>
      );
  }
};

const S = {
  TextLight: styled.Text`
    font-family: circularStdLight;
  `,
  TextBold: styled.Text`
    font-family: circularStdBold;
  `,
  TextBook: styled.Text`
    font-family: circularStdBook;
  `,
  TextMedium: styled.Text`
    font-family: circularStdMedium;
  `,
};
