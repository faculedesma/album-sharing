import styled from "styled-components/native";
import { Search } from "src/assets/svgs/Search";
import { Logo } from "src/assets/svgs/Logo";

const Header = () => {
  return (
    <S.Header>
      <S.HeaderLeft>
        <Logo />
      </S.HeaderLeft>
      <S.HeaderRight>
        <Search />
        <S.Profile></S.Profile>
      </S.HeaderRight>
    </S.Header>
  );
};

export default Header;

const S = {
  Header: styled.View`
    height: ${(p) => p.theme.dimensions(40, "px")};
    width: ${(p) => p.theme.dimensions(100, "%")};
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: ${(p) => p.theme.dimensions(48, "px")};
    margin-bottom: ${(p) => p.theme.dimensions(24, "px")};
  `,
  HeaderRight: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${(p) => p.theme.dimensions(24, "px")};
  `,
  HeaderLeft: styled.View`
    height: ${(p) => p.theme.dimensions(30, "px")};
    width: ${(p) => p.theme.dimensions(30, "px")};
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  `,
  Profile: styled.View`
    height: ${(p) => p.theme.dimensions(30, "px")};
    width: ${(p) => p.theme.dimensions(30, "px")};
    background-color: ${(p) => p.theme.highlight}
    border-radius: ${(p) => p.theme.dimensions(50, "%")};
  `,
  Text: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdLight;
    font-size: ${(p) => p.theme.dimensions(14, "px")};
  `,
  TextBold: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: ${(p) => p.theme.dimensions(14, "px")};
  `,
};
