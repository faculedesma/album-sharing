import styled from "styled-components/native";
import { Stack } from "expo-router";
import SecondaryButton from "src/components/buttons/SecondaryButton";
import { appTheme } from "src/assets/styles/theme";
import Header from "src/components/header/Header";
import BottomNavbar from "src/components/bottom-navbar/BottomNavbar";
import { Birthday } from "src/components/birthday/BirthdaySection";
import { GenericText } from "src/components/text/GenericText";
import { BlurView } from "expo-blur";
import { View } from "react-native-animatable";

interface IRowProps {
  user: string;
  album: string;
  date: string;
  color: string;
}

const Row = ({ user, album, date, color = appTheme.highlight }: IRowProps) => {
  return (
    <S.Row animation="bounceIn" easing="ease-in-cubic" duration={1000}>
      <S.Avatar style={{ backgroundColor: `${color}` }}></S.Avatar>
      <S.RowRecommendation>
        <GenericText size={14} weight="bold" content={user} />
        <GenericText size={14} weight="light" content="recommended" />
        <GenericText size={14} weight="bold" content={album} />
        <GenericText size={14} weight="light" content="on" />
        <GenericText size={14} weight="light" content={date} />
      </S.RowRecommendation>
    </S.Row>
  );
};

const Latest = () => {
  return (
    <S.Latest animation="bounceInDown" duration={2000}>
      <S.LatestTop testID="home-screen-latest">
        <S.Title testID="home-screen-latest-title">Latest</S.Title>
        <S.Group testID="home-screen-latest-group" intensity={10} tint="light">
          <GenericText size={14} weight="bold" content="Los Pica" />
        </S.Group>
      </S.LatestTop>
      <S.LatestCard intensity={5} tint="light">
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
      </S.LatestCard>
      <S.ViewAllButton>
        <SecondaryButton
          text="View all"
          handlePress={() => console.log("view all recommendations")}
        />
      </S.ViewAllButton>
    </S.Latest>
  );
};

export default function HomeScreen() {
  return (
    <S.Wrapper testID="home-screen">
      <Stack.Screen options={{ title: "Home Screen", headerShown: false }} />
      <Header />
      <Latest />
      <Birthday />
      <BottomNavbar />
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: 36px;
  `,
  SubTitle: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdLight;
    font-size: 20px;
  `,
  Latest: styled(View)`
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
  `,
  LatestTop: styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  Group: styled(BlurView)`
    height: 30px;
    align-items: center;
    justify-content: center;
    border: 0.5px ${(p) => p.theme.shades200};
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;
  `,
  LatestCard: styled(BlurView)`
    align-items: center;
    justify-content: space-between;
    border-width: 0.5px;
    border-color: ${(p) => p.theme.shades200};
    border-radius: 4px;
    overflow: hidden;
    padding: 20px;
    gap: 20px;
  `,
  Row: styled(View)`
    height: 40px;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    margin-top: 4px;
    gap: 20px;
  `,
  Avatar: styled.View`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: 0.5px ${(p) => p.theme.shades100};
  `,
  RowRecommendation: styled.View`
    max-height: 50px;
    width: 300px;
    flex: 1;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 4px;
  `,
  ViewAllButton: styled.Text`
    width: 60px;
    align-self: flex-end;
  `,
};
