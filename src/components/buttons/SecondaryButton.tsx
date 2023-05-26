import styled from "styled-components/native";
import { Link } from "expo-router";
import { SvgUri } from "react-native-svg";

interface ISecondaryProps {
  href: string;
  text: string;
}

export default function SecondaryButton({ href, text }: ISecondaryProps) {
  return (
    <S.Button testID="secondary-button">
      <S.ButtonText testID="secondary-button-text">{text}</S.ButtonText>
      <SvgUri
        width="14px"
        height="14px"
        uri="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/debian.svg"
      />
    </S.Button>
  );
}

const S = {
  Button: styled.View`
    width: ${(p) => p.theme.dimensions(75, "px")};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    align-self: flex-end;
    background-color: transparent;
  `,
  ButtonText: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-weight: 300;
  `,
  Icon: styled.View`
    align-items: center;
    justify-content: center;
  `,
};
