import styled from "styled-components/native";
import { GenericText } from "../text/GenericText";
import { IAlbum } from "src/types/album/album";
import { appTheme } from "src/assets/styles/theme";
import Spinner from "../loaders/Spinner";

interface IAlbumProps {
  album: IAlbum;
}

export const AlbumCover = ({ album }: IAlbumProps) => {
  return (
    <S.AlbumContainer>
      {album.imageUrl ? (
        <S.AlbumCover
          source={{
            uri: album.imageUrl,
          }}
        ></S.AlbumCover>
      ) : (
        <Spinner />
      )}
      <S.AlbumLabels>
        <GenericText size={14} weight="bold" content={album.name} />
        <GenericText size={14} weight="light" content={album.artist} />
      </S.AlbumLabels>
    </S.AlbumContainer>
  );
};

const S = {
  AlbumContainer: styled.View`
    align-items: flex-start;
    justify-content: space-between;
    padding-right: 10px;
    gap: 10px;
  `,
  AlbumCover: styled.ImageBackground`
    height: 110px;
    width: 110px;
    background-color: ${appTheme.shades800}
    background-size: cover;
    overflow: hidden;
    border-radius: 4px;
    margin-top: 5px;
  `,
  AlbumLabels: styled.View`
    max-width: 110px;
    align-items: flex-start;
    justify-content: space-between;
  `,
};
