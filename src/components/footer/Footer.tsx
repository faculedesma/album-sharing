import styled from "styled-components/native";
import { appTheme } from "src/assets/styles/theme";
import { Home } from "src/assets/svgs/Home";
import { Search } from "src/assets/svgs/Search";
import { Group } from "src/assets/svgs/Group";
import { Heart } from "src/assets/svgs/Heart";

const Footer = () => {
  return (
    <S.Footer>
      <S.Link>
        <Home />
        <S.Text>Home</S.Text>
      </S.Link>
      <S.Link>
        <Search />
        <S.Text>Search</S.Text>
      </S.Link>
      <S.Link>
        <Group />
        <S.Text>Group</S.Text>
      </S.Link>
      <S.Link>
        <Heart />
        <S.Text>Liked</S.Text>
      </S.Link>
    </S.Footer>
  );
};

export default Footer;

const S = {
  Footer: styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    height: ${(p) => p.theme.dimensions(90, "px")};
    width: ${(p) => p.theme.windowWidth};
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    border-width: ${(p) => p.theme.dimensions(0.5, "px")};
    border-top-color: ${(p) => p.theme.shades200};
    margin-top: ${(p) => p.theme.dimensions(24, "px")};
    padding-top: ${(p) => p.theme.dimensions(8, "px")};
  `,
  Link: styled.View`
    height: ${(p) => p.theme.dimensions(40, "px")};
    align-items: center;
    justify-content: space-between;
  `,
  Text: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdLight;
    font-weight: 300;
    font-size: ${(p) => p.theme.dimensions(12, "px")};
  `,
  TextBold: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: ${(p) => p.theme.dimensions(14, "px")};
  `,
};
