import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import LogoPNG from "src/assets/images/logo.png";

export const Logo = () => {
  return (
    <S.LogoContainer intensity={10} tint="light">
      <S.LogoImage source={LogoPNG}></S.LogoImage>
    </S.LogoContainer>
  );
};

const S = {
  LogoContainer: styled(BlurView)`
    height: 100px;
    width: 100px;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-radius: 50%;
    border: 1px ${(p) => p.theme.highlight};
    overflow: hidden;
  `,
  LogoImage: styled.ImageBackground`
    height: 30px;
    width: 40px;
  `,
};
