import styled from "styled-components/native";
import { Stack } from "expo-router";
import { appTheme } from "src/assets/styles/theme";
import Header from "src/components/header/Header";
import BottomNavbar from "src/components/bottom-navbar/BottomNavbar";
import { Plus } from "src/assets/svgs/Plus";
import { GenericText } from "src/components/text/GenericText";

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
        <GenericText size={14} weight="bold" content={user} />

        {isAdmin && (
          <S.AdministratorChip>
            <GenericText
              size={12}
              weight="bold"
              content="Administrator"
              color={appTheme.primary}
            />
          </S.AdministratorChip>
        )}
      </S.Username>
    </S.GroupRow>
  );
};

const GroupChip = ({ name }: IGroupChipProps) => {
  return (
    <S.GroupChip testID="groups-screen-chip">
      <GenericText size={14} weight="bold" content={name} />
    </S.GroupChip>
  );
};

const MyGroups = () => {
  return (
    <>
      <S.TitleContainer>
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
    gap: 16px;
  `,
  TitleContainer: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: 36px;
  `,
  SubTitleContainer: styled.View`
    width: 90px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  `,
  SubTitle: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdLight;
    font-size: 20px;
  `,
  GroupChips: styled.View`
    height: 30px;
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
    height: 30px;
    flex: 1;
    align-items: center;
    justify-content: center;
    border: 0.5px ${(p) => p.theme.shades200};
    border-radius: 4px;
    margin-right: 12px;
    padding-left: 8px;
    padding-right: 8px;
  `,
  AdministratorChip: styled.View`
    height: 20px;
    width: 90px;
    align-items: center;
    justify-content: center;
    border: 0.5px ${(p) => p.theme.shades200};
    background-color: ${(p) => p.theme.green200};
    border-radius: 4px;
  `,
  GroupUsers: styled.View`
    align-items: center;
    justify-content: space-between;
    border: 0.5px ${(p) => p.theme.shades200};
    border-radius: 4px;
    padding: 16px;
    margin-top: 16px;
    margin-bottom: 16px;
  `,
  GroupRow: styled.View`
    height: 30px;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    margin-top: 4px;
    gap: 16px;
    margin-bottom: 4px;
  `,
  Avatar: styled.View`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 0.5px ${(p) => p.theme.shades100};
  `,
  Username: styled.View`
    height: 35px;
    width: 300px;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
  `,
  Subheading: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdLight;
    font-size: 16px;
  `,
};
