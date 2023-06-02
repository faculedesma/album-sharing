import styled from "styled-components/native";
import { appTheme } from "src/assets/styles/theme";
import { GenericText } from "src/components/text/GenericText";
import { View } from "react-native-animatable";
import { Octicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

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
    <S.GroupChip testID="groups-screen-chip" intensity={10} tint="light">
      <GenericText size={14} weight="bold" content={name} />
    </S.GroupChip>
  );
};

const MyGroups = () => {
  return (
    <S.Groups animation="fadeIn" easing="ease-in-out" duration={400}>
      <S.TitleContainer>
        <S.Title testID="groups-screen-latest-title">Groups</S.Title>
      </S.TitleContainer>
      <S.SubTitleContainer testID="grops-screen-latest-title">
        <S.Subheading>My Grous</S.Subheading>
        <Octicons name="plus" size={20} color={appTheme.secondary} />
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
    </S.Groups>
  );
};

const Groups = () => {
  return (
    <S.Wrapper testID="groups-screen">
      <MyGroups />
    </S.Wrapper>
  );
};

export default Groups;

const S = {
  Wrapper: styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 20px;
    padding-right: 20px;
    background: transparent;
  `,
  Groups: styled(View)`
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
  `,
  TitleContainer: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
    gap: 10px;
  `,
  Subheading: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdLight;
    font-size: 24px;
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
  GroupChip: styled(BlurView)`
    height: 30px;
    flex: 1;
    align-items: center;
    justify-content: center;
    border: 0.5px ${(p) => p.theme.shades700};
    border-radius: 4px;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
    overflow: hidden;
  `,
  AdministratorChip: styled.View`
    height: 20px;
    width: 90px;
    align-items: center;
    justify-content: center;
    background-color: ${(p) => p.theme.green};
    border-radius: 4px;
  `,
  GroupUsers: styled.View`
    align-items: center;
    justify-content: space-between;
    border: 0.5px ${(p) => p.theme.shades500};
    border-radius: 4px;
    padding: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    gap: 10px;
  `,
  GroupRow: styled.View`
    height: 30px;
    flex-direction: row;
    align-items: center;
    gap: 10px;
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
