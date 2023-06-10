import styled from "styled-components/native";
import { appTheme } from "src/assets/styles/theme";
import { GenericText } from "src/components/text/GenericText";
import { Link } from "expo-router";
import { IUser } from "src/types/user/user";

interface IRecommendationRowProps {
  user: Partial<IUser>;
  album: {
    id: string;
    name: string;
    artist: string;
  };
  date: string;
  color: string;
}

export const RecommendationRow = ({
  user,
  album,
  date,
  color = appTheme.highlight,
}: IRecommendationRowProps) => {
  return (
    <S.RecommendationRow>
      <S.RecommendationRowAvatar
        source={{ uri: user.profile_image_uri }}
      ></S.RecommendationRowAvatar>
      <S.RecommendationRowText>
        <GenericText size={14} weight="bold" content={`@${user.nickname}`} />
        <GenericText size={14} weight="light" content="recommended" />
        <Link
          href={{
            pathname: "/home/album",
            params: {
              id: album.id,
            },
          }}
        >
          <GenericText
            size={14}
            weight="bold"
            content={`${album.name} - ${album.artist}`}
          />
        </Link>
        <GenericText size={14} weight="light" content="on" />
        <GenericText size={14} weight="light" content={date} />
      </S.RecommendationRowText>
    </S.RecommendationRow>
  );
};

const S = {
  RecommendationRow: styled.View`
    height: 50px;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
  `,
  RecommendationRowAvatar: styled.ImageBackground`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: ${appTheme.highlight}
    background: transparent;
    overflow: hidden;
  `,
  RecommendationRowText: styled.View`
    flex: 1;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 4px;
  `,
};
