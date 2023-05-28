import styled from "styled-components/native";
import { Stack, useRouter } from "expo-router";
import SecondaryButton from "src/components/buttons/SecondaryButton";
import { appTheme } from "src/assets/styles/theme";
import Header from "src/components/header/Header";
import BottomNavbar from "src/components/bottom-navbar/BottomNavbar";
import { Plus } from "src/assets/svgs/Plus";
import { ArrowBack } from "src/assets/svgs/ArrowBack";

const groups = [
  {
    id: "los-pica",
    label: "Los Pica",
  },
  {
    id: "santa-maria",
    label: "Santa María",
  },
  {
    id: "whisky",
    label: "Whisky Cuarentena",
  },
  {
    id: "picaperros",
    label: "Los Picaperros",
  },
];

interface IGroupRowProps {
  user: string;
  color: string;
  isAdmin?: boolean;
}

interface IGroupChipProps {
  id: string;
  name: string;
}

const GroupRow = ({
  user,
  color = appTheme.highlight,
  isAdmin,
}: IGroupRowProps) => {
  return (
    <S.GroupRow>
      <S.Avatar style={{ backgroundColor: `${color}` }}></S.Avatar>
      <S.Username>
        <S.TextBold testID="home-screen-text">{user}</S.TextBold>
        {isAdmin && (
          <S.AdministratorChip>
            <S.TextBold
              testID="home-screen-text"
              style={{ fontSize: 10, color: appTheme.primary }}
            >
              Administrator
            </S.TextBold>
          </S.AdministratorChip>
        )}
      </S.Username>
    </S.GroupRow>
  );
};

const GroupChip = ({ id, name }: IGroupChipProps) => {
  return (
    <S.GroupChip testID="groups-screen-chip">
      <S.TextBold>{name}</S.TextBold>
    </S.GroupChip>
  );
};

const MyGroups = () => {
  const router = useRouter();

  return (
    <>
      <S.TitleContainer>
        {/* <S.Text
          onPress={() => {
            router.back();
          }}
        >
          <ArrowBack />
        </S.Text> */}
        <S.Title testID="groups-screen-latest-title">Groups</S.Title>
      </S.TitleContainer>
      <S.SubTitleContainer testID="grops-screen-latest-title">
        <S.Subheading>My Groups</S.Subheading>
        <Plus />
      </S.SubTitleContainer>
      <S.GroupChips>
        <S.GroupChipsContainer>
          <S.GroupChipsScroll
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {groups.map((group) => {
              return (
                <GroupChip key={group.id} id={group.id} name={group.label} />
              );
            })}
          </S.GroupChipsScroll>
        </S.GroupChipsContainer>
      </S.GroupChips>
      <S.GroupUsers>
        <GroupRow user="@chicha73" color={appTheme.green} />
        <GroupRow user="@brain_damage" color={appTheme.red} />
        <GroupRow user="@superyayiri" color={appTheme.yellow} />
        <GroupRow user="@chicha73" color={appTheme.green} />
        <GroupRow user="@brain_damage" color={appTheme.red} />
        <GroupRow user="@superyayiri" color={appTheme.yellow} isAdmin />
        <GroupRow user="@chicha73" color={appTheme.green} />
        <GroupRow user="@brain_damage" color={appTheme.red} />
        <GroupRow user="@superyayiri" color={appTheme.yellow} />
      </S.GroupUsers>
    </>
  );
};

export default function Groups() {
  return (
    <S.Wrapper testID="groups-screen">
      <Stack.Screen options={{ title: "Groups Screen", headerShown: false }} />
      <Header />
      <MyGroups />
      <BottomNavbar />
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
    padding-right: ${(p) => p.theme.dimensions(5, "%")};
    padding-left: ${(p) => p.theme.dimensions(5, "%")};
    gap: ${(p) => p.theme.dimensions(16, "px")};
  `,
  TitleContainer: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${(p) => p.theme.dimensions(16, "px")};
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: ${(p) => p.theme.dimensions(36, "px")};
  `,
  SubTitleContainer: styled.View`
    width: 90px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${(p) => p.theme.dimensions(8, "px")};
  `,
  SubTitle: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdLight;
    font-size: ${(p) => p.theme.dimensions(24, "px")};
  `,
  GroupChips: styled.View`
    height: ${(p) => p.theme.dimensions(30, "px")};
  `,
  GroupChipsContainer: styled.View`
    width: ${(p) => p.theme.windowWidth};
    flex: 1;
  `,
  GroupChipsScroll: styled.ScrollView`
    flex: 1;
    flex-direction: row;
  `,
  GroupChip: styled.View`
    height: ${(p) => p.theme.dimensions(30, "px")};
    flex: 1;
    align-items: center;
    justify-content: center;
    border: ${(p) => p.theme.dimensions(0.5, "px")} ${(p) => p.theme.shades200};
    border-radius: ${(p) => p.theme.dimensions(4, "px")};
    margin-right: ${(p) => p.theme.dimensions(12, "px")};
    padding-left: ${(p) => p.theme.dimensions(8, "px")};
    padding-right: ${(p) => p.theme.dimensions(8, "px")};
  `,
  AdministratorChip: styled.View`
    height: ${(p) => p.theme.dimensions(20, "px")};
    width: ${(p) => p.theme.dimensions(90, "px")};
    align-items: center;
    justify-content: center;
    border: ${(p) => p.theme.dimensions(0.5, "px")} ${(p) => p.theme.shades200};
    background-color: ${(p) => p.theme.green200};
    border-radius: ${(p) => p.theme.dimensions(4, "px")};
  `,
  GroupUsers: styled.View`
    align-items: center;
    justify-content: space-between;
    border: ${(p) => p.theme.dimensions(0.5, "px")} ${(p) => p.theme.shades200};
    border-radius: ${(p) => p.theme.dimensions(4, "px")};
    padding: ${(p) => p.theme.dimensions(16, "px")};
    margin-top: ${(p) => p.theme.dimensions(16, "px")};
    margin-bottom: ${(p) => p.theme.dimensions(16, "px")};
  `,
  GroupRow: styled.View`
    height: ${(p) => p.theme.dimensions(30, "px")};
    flex-direction: row;
    align-items: center;
    gap: ${(p) => p.theme.dimensions(16, "px")};
    margin-top: ${(p) => p.theme.dimensions(4, "px")};
    gap: ${(p) => p.theme.dimensions(16, "px")};
    margin-bottom: ${(p) => p.theme.dimensions(4, "px")};
  `,
  Avatar: styled.View`
    height: ${(p) => p.theme.dimensions(30, "px")};
    width: ${(p) => p.theme.dimensions(30, "px")};
    border-radius: ${(p) => p.theme.dimensions(50, "%")};
    border: ${(p) => p.theme.dimensions(0.5, "px")} ${(p) => p.theme.shades100};
  `,
  Username: styled.View`
    height: ${(p) => p.theme.dimensions(35, "px")};
    width: ${(p) => p.theme.dimensions(300, "px")};
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${(p) => p.theme.dimensions(4, "px")};
  `,
  Subheading: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdLight;
    font-size: ${(p) => p.theme.dimensions(16, "px")};
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
