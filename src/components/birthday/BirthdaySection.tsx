import { useEffect, useState } from "react";
import styled from "styled-components/native";
import jsonData from "../../data/albums.json";
import { GenericText } from "../text/GenericText";
import { View, Text } from "react-native-animatable";
import { Link } from "expo-router";

interface IAlbum {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
}

export const Birthday = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [currentDate, setCurrentDate] = useState<string>("");

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

  return (
    <S.Birthday>
      <S.Title testID="birthday-title" animation="fadeIn" duration={400}>
        Birthdays
      </S.Title>
      <S.SubTitle testID="birthday-subtitle" animation="fadeIn" duration={500}>
        {currentDate}
      </S.SubTitle>
      <S.Results animation="fadeIn" duration={600}>
        <S.ResultsScroll
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {albums.map((album) => {
            return (
              <Link key={album.id} href={`/album?id=${album.id}`}>
                <S.AlbumContainer>
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
              </Link>
            );
          })}
        </S.ResultsScroll>
      </S.Results>
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
    gap: 10px;
  `,
  Results: styled(View)`
    width: ${(p) => p.theme.windowWidth};
    height: 200px;
    align-items: flex-start;
    justify-content: flex-start;
  `,
  ResultsScroll: styled.ScrollView`
    flex: 1;
    flex-direction: row;
    margin-top: 10px;
  `,
  AlbumContainer: styled.View`
    align-items: flex-start;
    justify-content: space-between;
    padding-right: 10px;
  `,
  AlbumCover: styled.ImageBackground`
    height: 110px;
    width: 110px;
    background-color: ${(p) => p.theme.shades800};
    background-size: cover;
    overflow: hidden;
    border-radius: 4px;
  `,
  AlbumLabels: styled.View`
    max-width: 110px;
    gap: 5px;
    align-items: flex-start;
    justify-content: space-between;
  `,
};
