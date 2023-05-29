import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Modal } from "react-native";
import jsonData from "../../data/albums.json";
import { Album } from "../album/Album";
import { GenericText } from "../text/GenericText";

interface IAlbum {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
}

export const Birthday = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [modalAlbum, setModalAlbum] = useState<boolean>(false);
  const [selectedAlbum, setSelectedAlbum] = useState<string>("");

  const openModalAlbum = () => setModalAlbum(true);

  const closeModalAlbum = () => setModalAlbum(false);

  useEffect(() => {
    const parsedAlbums = jsonData.albums.items.map((album: any) => {
      return {
        id: album.id,
        name: album.name,
        artist: album.artists[0].name,
        imageUrl: album.images[1].url,
      };
    });
    setAlbums(parsedAlbums);
  }, []);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toDateString());
  }, []);

  const handleOpenAlbum = (id: string) => {
    setSelectedAlbum(id);
    openModalAlbum();
  };

  const handleCloseAlbum = () => {
    setSelectedAlbum("");
    closeModalAlbum();
  };

  return (
    <S.Birthday>
      <S.BirthdayHeading>
        <S.Title testID="home-screen-birthday-title">Today's birthday</S.Title>
        <S.SubTitle testID="home-screen-birthday-subtitle">
          {currentDate}
        </S.SubTitle>
      </S.BirthdayHeading>
      <S.Results>
        <S.ResultsContainer>
          <S.ResultsScroll
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {albums.map((album) => {
              return (
                <S.AlbumContainer
                  key={album.id}
                  onPress={() => handleOpenAlbum(album.id)}
                >
                  <S.AlbumCover
                    source={{
                      uri: album.imageUrl,
                    }}
                  ></S.AlbumCover>
                  <S.AlbumLabels>
                    <GenericText size={14} weight="bold" content={album.name} />
                    <GenericText
                      size={14}
                      weight="light"
                      content={album.name}
                    />
                  </S.AlbumLabels>
                </S.AlbumContainer>
              );
            })}
          </S.ResultsScroll>
        </S.ResultsContainer>
      </S.Results>
      <Modal visible={modalAlbum} animationType="slide" transparent={true}>
        <Album id={selectedAlbum} closeModal={handleCloseAlbum} />
      </Modal>
    </S.Birthday>
  );
};

const S = {
  Title: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: ${(p) => p.theme.dimensions(36, "px")};
  `,
  SubTitle: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdLight;
    font-size: ${(p) => p.theme.dimensions(20, "px")};
  `,
  Birthday: styled.View`
    margin-top: ${(p) => p.theme.dimensions(20, "px")};
  `,
  BirthdayHeading: styled.View`
    align-items: flex-start;
    justify-content: flex-start;
    gap: ${(p) => p.theme.dimensions(16, "px")};
    margin-bottom: ${(p) => p.theme.dimensions(16, "px")};
  `,
  Results: styled.View`
    height: ${(p) => p.theme.dimensions(181, "px")};
  `,
  ResultsContainer: styled.View`
    width: ${(p) => p.theme.windowWidth};
    flex: 1;
  `,
  ResultsScroll: styled.ScrollView`
    flex: 1;
    flex-direction: row;
  `,
  AlbumContainer: styled.TouchableOpacity`
    align-items: flex-start;
    justify-content: space-between;
    gap: ${(p) => p.theme.dimensions(16, "px")};
  `,
  AlbumCover: styled.ImageBackground`
    height: ${(p) => p.theme.dimensions(125, "px")};
    width: ${(p) => p.theme.dimensions(125, "px")};
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${(p) => p.theme.shades50};
    overflow: hidden;
    border: ${(p) => p.theme.dimensions(0.5, "px")} ${(p) => p.theme.shades100};
    border-radius: ${(p) => p.theme.dimensions(4, "px")};
    margin-right: ${(p) => p.theme.dimensions(12, "px")};
  `,
  AlbumLabels: styled.View`
    height: ${(p) => p.theme.dimensions(40, "px")};
    max-width: ${(p) => p.theme.dimensions(125, "px")};
    gap: ${(p) => p.theme.dimensions(8, "px")};
    align-items: flex-start;
    justify-content: space-between;
  `,
};
