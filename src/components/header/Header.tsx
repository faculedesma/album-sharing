import styled from "styled-components/native";

const Header = () => {
  return (
    <S.Header>
      <S.Logo></S.Logo>
      <S.Profile></S.Profile>
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
  Logo: styled.View`
    height: ${(p) => p.theme.dimensions(30, "px")};
    width: ${(p) => p.theme.dimensions(30, "px")};
    background-color: ${(p) => p.theme.highlight}
    border-radius: ${(p) => p.theme.dimensions(50, "%")};
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
    font-weight: 300;
    font-size: ${(p) => p.theme.dimensions(14, "px")};
  `,
  TextBold: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: ${(p) => p.theme.dimensions(14, "px")};
  `,
};
