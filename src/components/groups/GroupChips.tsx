import styled from "styled-components/native";
import { appTheme } from "src/assets/styles/theme";
import { GenericText } from "src/components/text/GenericText";
import { BlurView } from "expo-blur";
import { Pressable } from "react-native";
import Spinner from "src/components/loaders/Spinner";
import { IGroup } from "src/types/groups/groups";

interface IGroupChipsProps {
  groups: IGroup[];
  selected: string[];
  handlePressChip: (id: string) => void;
}

const GroupChips = ({
  groups,
  selected,
  handlePressChip,
}: IGroupChipsProps) => {
  return (
    <S.GroupsContainer>
      {groups.map((group) => {
        return (
          <S.Group
            key={group.id}
            intensity={10}
            tint="light"
            style={{
              borderWidth: selected.includes(group.id) ? 0.5 : 0,
              borderColor: selected.includes(group.id)
                ? appTheme.highlight
                : "transparent",
            }}
          >
            <Pressable onPress={() => handlePressChip(group.id)}>
              <GenericText
                size={14}
                weight="bold"
                content={group.name}
                color={
                  selected.includes(group.id)
                    ? appTheme.highlight
                    : appTheme.secondary
                }
              />
            </Pressable>
          </S.Group>
        );
      })}
    </S.GroupsContainer>
  );
};

export default GroupChips;

const S = {
  GroupsContainer: styled.View`
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
  `,
  Group: styled(BlurView)`
    height: 30px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;
    overflow: hidden;
    transform: translate(-1px, 0);
  `,
};
