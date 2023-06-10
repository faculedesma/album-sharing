import { useEffect, useState } from "react";
import styled from "styled-components/native";
import jsonData from "src/data/albums.json";
import { Link } from "expo-router";
import { IAlbum } from "src/types/album/album";
import { AlbumCover } from "../album/AlbumCover";
import { HeadingOne } from "../headings/HeadingOne";
import { HeadingTwo } from "../headings/HeadingTwo";

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
      <HeadingOne text="Birthdays" />
      <HeadingTwo text={currentDate} />
      <S.Results>
        <S.ResultsScroll
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {albums.map((album) => {
            return (
              <Link key={album.id} href={`/home/album?id=${album.id}`}>
                <AlbumCover album={album} />
              </Link>
            );
          })}
        </S.ResultsScroll>
      </S.Results>
    </S.Birthday>
  );
};

const S = {
  Birthday: styled.View`
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
  `,
  Results: styled.View`
    align-items: flex-start;
    justify-content: flex-start;
    height: 175px;
  `,
  ResultsScroll: styled.ScrollView`
    flex: 1;
    flex-direction: row;
    margin-top: 10px;
  `,
};
