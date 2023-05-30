import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Modal } from "react-native";
import jsonData from "../../data/albums.json";
import { Album } from "../album/Album";
import { GenericText } from "../text/GenericText";
import { View, Text } from "react-native-animatable";

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
      <S.Title testID="birthday-title" animation="fadeInDown" duration={1200}>
        Today's birthday
      </S.Title>
      <S.SubTitle
        testID="birthday-subtitle"
        animation="fadeInDown"
        duration={1300}
      >
        {currentDate}
      </S.SubTitle>
      <S.Results animation="fadeInDown" duration={1500}>
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
  Title: styled(Text)`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: 36px;
  `,
  SubTitle: styled(Text)`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdLight;
    font-size: 20px;
  `,
  Birthday: styled.View`
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
  `,
  Results: styled(View)`
    height: 180px;
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
    gap: 10px;
  `,
  AlbumCover: styled.ImageBackground`
    width: 125px;
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${(p) => p.theme.shades50};
    overflow: hidden;
    border: 0.5px ${(p) => p.theme.shades100};
    border-radius: 4px;
    margin-right: 10px;
  `,
  AlbumLabels: styled.View`
    max-width: 125px;
    gap: 10px;
    align-items: flex-start;
    justify-content: space-between;
  `,
};
