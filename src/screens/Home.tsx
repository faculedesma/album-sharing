import { useEffect, useState } from "react";
import styled from "styled-components/native";
import SecondaryButton from "src/components/buttons/SecondaryButton";
import { appTheme } from "src/assets/styles/theme";
import { Birthday } from "src/components/birthday/BirthdaySection";
import { GenericText } from "src/components/text/GenericText";
import { BlurView } from "expo-blur";
import { View } from "react-native-animatable";
import recommendationsJson from "src/data/recommendations.json";
import { Link, useRouter } from "expo-router";
import groupsJson from "src/data/groups.json";
import { Pressable } from "react-native";
import { Modal } from "react-native";

interface IGroup {
  id: string;
  name: string;
}

interface IRowProps {
  user: string;
  album: {
    id: string;
    name: string;
  };
  date: string;
  color: string;
}

const GrousList = (props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={false}>
      <S.GroupModal style={{ marginTop: "auto" }} intensity={50} tint="dark">
        <S.GroupModalScroll>
          {props.groups.map((group) => (
            <S.GroupRow
              key={group.id}
              onPress={() => props.handleSelectGroup(group.id)}
            >
              <GenericText
                key={group.id}
                size={24}
                weight="light"
                align="center"
                content={group.name}
              />
            </S.GroupRow>
          ))}
        </S.GroupModalScroll>
      </S.GroupModal>
    </Modal>
  );
};

const Row = ({ user, album, date, color = appTheme.highlight }: IRowProps) => {
  return (
    <S.Row animation="bounceIn" easing="ease-in-cubic" duration={600}>
      <S.Avatar style={{ backgroundColor: `transparent` }}></S.Avatar>
      <S.RowRecommendation>
        <GenericText size={14} weight="bold" content={user} />
        <GenericText size={14} weight="light" content="recommended" />
        <Link
          href={{
            pathname: "/home/album",
            params: {
              id: album.id,
            },
          }}
        >
          <GenericText size={14} weight="bold" content={album.name} />
        </Link>
        <GenericText size={14} weight="light" content="on" />
        <GenericText size={14} weight="light" content={date} />
      </S.RowRecommendation>
    </S.Row>
  );
};

const Latest = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<IGroup>({});

  const router = useRouter();

  useEffect(() => {
    const fetchedGroups = groupsJson.groups;
    setGroups(fetchedGroups);
    setSelectedGroup(fetchedGroups[0]);
  }),
    [];

  const handleSelectGroup = (id: string) => {
    const updatedGroup = groups.find((gr) => gr.id === id);
    setSelectedGroup(updatedGroup!);
  };

  return (
    <>
      <S.Latest animation="fadeIn" duration={500}>
        <S.LatestTop testID="home-screen-latest">
          <S.Title testID="home-screen-latest-title">Latest</S.Title>
          <S.Group
            testID="home-screen-latest-group"
            intensity={20}
            tint="light"
          >
            <Pressable onPress={() => null}>
              <GenericText
                size={14}
                weight="bold"
                content={selectedGroup.name}
              />
            </Pressable>
          </S.Group>
        </S.LatestTop>
        <S.LatestCard intensity={40} tint="dark">
          {recommendationsJson.recommendations.map((rec) => {
            return (
              <Row
                key={rec.id}
                user={rec.nickname}
                album={{
                  id: rec.album_id,
                  name: rec.album_name,
                }}
                date={rec.date}
                color={appTheme.green}
              />
            );
          })}
        </S.LatestCard>
        <S.ViewAllButton>
          <SecondaryButton
            text="View all"
            handlePress={() => router.push("/home/history")}
          />
        </S.ViewAllButton>
      </S.Latest>
      <GrousList groups={groups} handleSelectGroup={handleSelectGroup} />
    </>
  );
};

const Home = () => {
  return (
    <S.Wrapper testID="home-screen">
      <Latest />
      <Birthday />
    </S.Wrapper>
  );
};

export default Home;

const S = {
  Wrapper: styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 30px;
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
    gap: 10px;
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
    border: 0.5px ${(p) => p.theme.shades400};
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;
    overflow: hidden;
    transform: translate(-1px, 0);
  `,
  GroupModalScroll: styled.ScrollView`
    margin-top: 40px;
  `,
  GroupModal: styled(BlurView)`
    height: 30%;
  `,
  GroupRow: styled.Pressable`
    height: 50px;
  `,
  LatestCard: styled(BlurView)`
    height: 200px;
    align-items: center;
    justify-content: space-between;
    border-width: 0.5px;
    border-color: ${(p) => p.theme.shades700};
    border-radius: 4px;
    overflow: hidden;
    padding: 20px;
  `,
  Row: styled(View)`
    height: 40px;
    flex-direction: row;
    align-items: flex-start;
    margin-top: 4px;
    gap: 20px;
  `,
  Avatar: styled.View`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: 1px ${(p) => p.theme.highlight};
    background: transparent;
  `,
  RowRecommendation: styled.View`
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
