import { useEffect, useState } from "react";
import styled from "styled-components/native";
import Spinner from "src/components/loaders/Spinner";
import grousJson from "src/data/groups.json";
import { IGroup } from "src/types/groups/groups";
import GroupChips from "src/components/groups/GroupChips";
import { GenericInput } from "../inputs/GenericInput";
import PrimaryButton from "../buttons/PrimaryButton";
import { appTheme } from "src/assets/styles/theme";

export const Recommend = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setGroups(grousJson.groups);
    }, 1000);
  }, []);

  const handleSelectChip = (id: string) => {
    if (!selected.includes(id)) {
      setSelected([...selected, id]);
    } else {
      setSelected([...selected].filter((selectedId) => selectedId !== id));
    }
  };

  const handleSubmitRecommendation = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  if (!groups.length) {
    return (
      <S.Recommend>
        <Spinner />
      </S.Recommend>
    );
  }

  return (
    <S.Recommend>
      <GroupChips
        groups={groups}
        selected={selected}
        handlePressChip={handleSelectChip}
      />
      <GenericInput
        value={notes}
        height={180}
        maxLength={400}
        multiline={true}
        numberOfLines={5}
        textContentType="none"
        handleChangeText={(value) => setNotes(value)}
        isBottomSheet={true}
        placeholder="Add a note"
      />
      <S.RecommendSubmit>
        <PrimaryButton
          text="Send"
          icon={false}
          bold={true}
          size="md"
          color={appTheme.secondary}
          handlePress={handleSubmitRecommendation}
          loading={submitting}
        />
      </S.RecommendSubmit>
    </S.Recommend>
  );
};

const S = {
  Recommend: styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    padding-top: 15px;
    padding-left: 10px;
    padding-right: 10px;
    gap: 20px;
  `,
  RecommendSubmit: styled.View`
    width: 100%;
    align-self: flex-end;
  `,
};
