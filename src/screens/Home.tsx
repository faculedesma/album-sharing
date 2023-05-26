import styled from "styled-components/native";
import { Stack } from "expo-router";
import SecondaryButton from "src/components/buttons/SecondaryButton";
import { appTheme } from "src/assets/styles/theme";
import { ImageBackground } from "react-native";

interface IRowProps {
  user: string;
  album: string;
  date: string;
  color: string;
}

const Header = () => {
  return (
    <S.Header>
      <S.Logo></S.Logo>
      <S.Profile></S.Profile>
    </S.Header>
  );
};

const Footer = () => {
  return (
    <S.Footer>
      <S.Logo></S.Logo>
      <S.Logo></S.Logo>
      <S.Logo></S.Logo>
      <S.Logo></S.Logo>
    </S.Footer>
  );
};

const Row = ({ user, album, date, color = appTheme.highlight }: IRowProps) => {
  return (
    <S.Row>
      <S.Avatar style={{ backgroundColor: `${color}` }}></S.Avatar>
      <S.Recommendation>
        <S.TextBold testID="home-screen-text">{user}</S.TextBold>
        <S.Text testID="home-screen-text">recommended</S.Text>
        <S.TextBold testID="home-screen-text">{album}</S.TextBold>
        <S.Text testID="home-screen-text">on</S.Text>
        <S.Text testID="home-screen-text">{date}.</S.Text>
      </S.Recommendation>
    </S.Row>
  );
};

const Latest = () => {
  return (
    <>
      <S.TitleContainer testID="home-screen-latest">
        <S.Title testID="home-screen-latest-title">Latest</S.Title>
        <S.Chip testID="home-screen-latest-group">
          <S.TextBold>Los Pica</S.TextBold>
        </S.Chip>
      </S.TitleContainer>
      <S.Card>
        <Row
          user="@chicha73"
          album="The Dark Side Of The Moon (Pink Floyd)"
          date="yesterday"
          color={appTheme.green}
        />
        <Row
          user="@brain_damage"
          album="Innervisions (Stevie Wonder)"
          date="tuesday"
          color={appTheme.red}
        />
        <Row
          user="@superyayiri"
          album="Animals (Pink Floyd)"
          date="may 12"
          color={appTheme.yellow}
        />
      </S.Card>
      <SecondaryButton href="/history" text="View all" />
    </>
  );
};

const Birthday = () => {
  return (
    <S.Birthday>
      <S.BirthdayHeading>
        <S.Title testID="home-screen-birthday-title">Today's birthday</S.Title>
        <S.SubTitle testID="home-screen-birthday-subtitle">
          May 25, 2023
        </S.SubTitle>
      </S.BirthdayHeading>
      <S.Results>
        <S.ResultsContainer>
          <S.ResultsScroll
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <S.AlbumCover></S.AlbumCover>
            <S.AlbumCover></S.AlbumCover>
            <S.AlbumCover></S.AlbumCover>
          </S.ResultsScroll>
        </S.ResultsContainer>
      </S.Results>
    </S.Birthday>
  );
};

export default function HomeScreen() {
  return (
    <S.Wrapper testID="home-screen">
      <Stack.Screen options={{ title: "Home Screen", headerShown: false }} />
      <Header />
      <Latest />
      <Birthday />
      <Footer />
    </S.Wrapper>
  );
}

const S = {
  Header: styled.View`
    height: ${(p) => p.theme.dimensions(40, "px")};
    width: ${(p) => p.theme.dimensions(100, "%")};
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: ${(p) => p.theme.dimensions(32, "px")};
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
  Wrapper: styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: ${(p) => p.theme.dimensions(50, "px")};
    padding-right: ${(p) => p.theme.dimensions(5, "%")};
    padding-left: ${(p) => p.theme.dimensions(5, "%")};
  `,
  Birthday: styled.View`
    height: ${(p) => p.theme.dimensions(320, "px")};
    margin-top: ${(p) => p.theme.dimensions(32, "px")};
  `,
  BirthdayHeading: styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
    gap: ${(p) => p.theme.dimensions(16, "px")};
  `,
  Results: styled.View`
    height: ${(p) => p.theme.dimensions(160, "px")};
    width: ${(p) => p.theme.dimensions(100, "%")};
  `,
  ResultsContainer: styled.View`
    width: ${(p) => p.theme.windowWidth};
    flex: 1;
  `,
  ResultsScroll: styled.ScrollView`
    flex: 1;
    flex-direction: row;
  `,
  AlbumCover: styled.View`
    height: ${(p) => p.theme.dimensions(160, "px")};
    width: ${(p) => p.theme.dimensions(160, "px")};
    background-color: ${(p) => p.theme.shades200};
    border-radius: ${(p) => p.theme.dimensions(4, "px")};
    margin-right: ${(p) => p.theme.dimensions(12, "px")};
  `,
  TitleContainer: styled.View`
    width: ${(p) => p.theme.dimensions(100, "%")};
    // margin-top: ${(p) => p.theme.dimensions(32, "px")};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: ${(p) => p.theme.dimensions(36, "px")};
  `,
  SubTitle: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdLight;
    font-size: ${(p) => p.theme.dimensions(24, "px")};
  `,
  Chip: styled.View`
    height: ${(p) => p.theme.dimensions(25, "px")};
    width: ${(p) => p.theme.dimensions(75, "px")};
    align-items: center;
    justify-content: center;
    border: ${(p) => p.theme.dimensions(0.5, "px")} ${(p) => p.theme.shades200};
    border-radius: ${(p) => p.theme.dimensions(4, "px")};
  `,
  Card: styled.View`
    height: ${(p) => p.theme.dimensions(220, "px")};
    align-items: center;
    justify-content: space-between;
    border: ${(p) => p.theme.dimensions(0.5, "px")} ${(p) => p.theme.shades200};
    border-radius: ${(p) => p.theme.dimensions(4, "px")};
    padding: ${(p) => p.theme.dimensions(16, "px")};
    margin-top: ${(p) => p.theme.dimensions(16, "px")};
    margin-bottom: ${(p) => p.theme.dimensions(16, "px")};
  `,
  Row: styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${(p) => p.theme.dimensions(16, "px")};
    margin-bottom: ${(p) => p.theme.dimensions(10, "px")};
  `,
  Avatar: styled.View`
    height: ${(p) => p.theme.dimensions(40, "px")};
    width: ${(p) => p.theme.dimensions(40, "px")};
    border-radius: ${(p) => p.theme.dimensions(50, "%")};
  `,
  Recommendation: styled.View`
    height: ${(p) => p.theme.dimensions(35, "px")};
    width: ${(p) => p.theme.dimensions(300, "px")};
    flex: 1;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: ${(p) => p.theme.dimensions(4, "px")};
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
  Footer: styled.View`
    height: ${(p) => p.theme.dimensions(60, "px")};
    width: ${(p) => p.theme.dimensions(100, "%")};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: ${(p) => p.theme.dimensions(24, "px")};
    padding-left: ${(p) => p.theme.dimensions(32, "px")};
    padding-right: ${(p) => p.theme.dimensions(32, "px")};
  `,
};
