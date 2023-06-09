import styled from "styled-components/native";
import { appTheme } from "src/assets/styles/theme";
import { GenericText } from "src/components/text/GenericText";
import { View } from "react-native-animatable";
import { Octicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { HeadingOne } from "src/components/headings/HeadingOne";
import { HeadingTwo } from "src/components/headings/HeadingTwo";

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
            <GenericText size={10} weight="bold" content="Administrator" />
          </S.AdministratorChip>
        )}
      </S.Username>
    </S.GroupRow>
  );
};

const GroupChip = ({ name }: IGroupChipProps) => {
  return (
    <S.GroupChip intensity={10} tint="light">
      <GenericText size={14} weight="bold" content={name} />
    </S.GroupChip>
  );
};

const MyGroups = () => {
  return (
    <S.Groups animation="fadeIn" easing="ease-in-out" duration={400}>
      <HeadingOne text="Groups" />
      <S.HeadingTwoContainer>
        <HeadingTwo text="My Groups" />
        <Octicons name="plus" size={20} color={appTheme.secondary} />
      </S.HeadingTwoContainer>
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
        <GroupRow user="@chicha73" color="transparent" />
        <GroupRow user="@brain_damage" color="transparent" />
        <GroupRow user="@superyayiri" color="transparent" />
        <GroupRow user="@chicha73" color="transparent" />
        <GroupRow user="@brain_damage" color="transparent" />
        <GroupRow user="@superyayiri" color="transparent" isAdmin />
        <GroupRow user="@chicha73" color="transparent" />
        <GroupRow user="@brain_damage" color="transparent" />
        <GroupRow user="@superyayiri" color="transparent" />
      </S.GroupUsers>
    </S.Groups>
  );
};

const Groups = () => {
  return (
    <S.Wrapper>
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
    margin-top: 20px;
  `,
  Groups: styled(View)`
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
  `,
  HeadingTwoContainer: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
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
    height: 30px;
    width: 90px;
    align-items: center;
    justify-content: center;
    border-width: 0.5px;
    border-color: ${appTheme.green};
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
};
