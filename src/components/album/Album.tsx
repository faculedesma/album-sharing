import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Stack } from "expo-router";
import { Close } from "src/assets/svgs/Close";
import { ArrowBack } from "src/assets/svgs/ArrowBack";
import { GenericText } from "../text/GenericText";
import Toast from "react-native-toast-message";

const accessToken =
  "BQDs1YuG18O4lZUZpOSo1VF4ztELn11--X8ZSsmv4aTdIoc05rLCKmldmIniANS9XB5HDwpr36HBvfe_APe8sZA3OgofeqtHWUxCxvanEQqAB1xpHBwkUoCS5AV5ckXF0QMyki6YV5yJbx9I_LOgUGBVPHZdAC4ozWwBbQEKTO7eS81-7FZ6";

interface IAlbumProps {
  id: string;
  closeModal: () => void;
}

interface ITrack {
  id: string;
  name: string;
  track_number: number;
}

interface ITrackProps {
  track: ITrack;
}

const TrackRow = ({ track }: ITrackProps) => {
  return (
    <S.TrackRowContainer>
      <S.TrackRow>
        <GenericText size={14} weight="bold" content={track.track_number} />
        <GenericText size={14} weight="light" content={track.name} />
        <S.TrackRowExpand>
          <S.ExpandIcon>
            <ArrowBack />
          </S.ExpandIcon>
        </S.TrackRowExpand>
      </S.TrackRow>
    </S.TrackRowContainer>
  );
};

export const Album = ({ id, closeModal }: IAlbumProps) => {
  const [albumData, setAlbumData] = useState<any>({});

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/albums/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAlbumData(data);
        } else {
          console.error("Error:", response.status);
          Toast.show({
            type: "error",
            text1: "There was an error fetching album data. Please try again.",
          });
          closeModal();
        }
      } catch (error) {
        console.error("Error:", error);
        Toast.show({
          type: "error",
          text1: "There was an error fetching album data. Please try again.",
        });
        closeModal();
      }
    };

    fetchAlbumData();
  }, []);

  if (!albumData.name) {
    return (
      <S.LoaderWrapper>
        <GenericText size={16} weight="light" content="Loading..." />
      </S.LoaderWrapper>
    );
  }

  return (
    <S.Wrapper testID="album-screen">
      <Stack.Screen options={{ title: "Album Screen", headerShown: false }} />
      <S.TitleContainer>
        <TouchableOpacity onPress={closeModal}>
          <Close />
        </TouchableOpacity>
        <S.Title
          testID="album-screen-title"
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {albumData.name}
        </S.Title>
      </S.TitleContainer>
      <S.Hero>
        <S.Cover
          source={{
            uri: albumData.images[1].url,
          }}
        ></S.Cover>
        <S.Item>
          <GenericText
            size={16}
            weight="light"
            content={albumData.artists[0].name}
          />
          <GenericText
            size={14}
            weight="bold"
            content={albumData.release_date.split("-")[0]}
          />
        </S.Item>
      </S.Hero>
      <S.Tracks>
        <S.SubTitle>Song lyrics</S.SubTitle>
        {albumData.tracks.items.map((track) => {
          return (
            <TrackRow
              key={track.id}
              track={{
                id: track.id,
                name: track.name,
                track_number: track.track_number,
              }}
            />
          );
        })}
      </S.Tracks>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.ScrollView`
    flex: 1;
    padding-right: ${(p) => p.theme.dimensions(5, "%")};
    padding-left: ${(p) => p.theme.dimensions(5, "%")};
    background-color: ${(p) => p.theme.primary};
    padding-top: ${(p) => p.theme.dimensions(64, "px")};
  `,
  LoaderWrapper: styled.View`
    height: ${(p) => p.theme.dimensions(100, "%")};
    width: ${(p) => p.theme.dimensions(100, "%")};
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-right: ${(p) => p.theme.dimensions(5, "%")};
    padding-left: ${(p) => p.theme.dimensions(5, "%")};
    background-color: ${(p) => p.theme.primary};
    padding-top: ${(p) => p.theme.dimensions(64, "px")};
  `,
  TitleContainer: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${(p) => p.theme.dimensions(16, "px")};
    margin-bottom: ${(p) => p.theme.dimensions(32, "px")};
    align-self: flex-start;
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: ${(p) => p.theme.dimensions(36, "px")};
    max-width: ${(p) => p.theme.dimensions(80, "%")};
  `,
  SubTitle: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdLight;
    font-size: ${(p) => p.theme.dimensions(20, "px")};
    margin-bottom: ${(p) => p.theme.dimensions(8, "px")};
  `,
  Hero: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${(p) => p.theme.dimensions(16, "px")};
    align-self: flex-start;
    margin-bottom: ${(p) => p.theme.dimensions(32, "px")};
  `,
  Cover: styled.ImageBackground`
    height: ${(p) => p.theme.dimensions(200, "px")};
    width: ${(p) => p.theme.dimensions(200, "px")};
    background-color: ${(p) => p.theme.shades50};
    overflow: hidden;
    border: ${(p) => p.theme.dimensions(0.5, "px")} ${(p) => p.theme.shades100};
    border-radius: ${(p) => p.theme.dimensions(4, "px")};
  `,
  Item: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${(p) => p.theme.dimensions(16, "px")};
  `,
  Tracks: styled.View`
    padding-bottom: ${(p) => p.theme.dimensions(74, "px")};
  `,
  TrackRowContainer: styled.View`
    height: ${(p) => p.theme.dimensions(50, "px")};
    width: ${(p) => p.theme.windowWidth};
    border: ${(p) => p.theme.dimensions(0.5, "px")} ${(p) => p.theme.shades100};
    padding-left: ${(p) => p.theme.dimensions(16, "px")};
    padding-right: ${(p) => p.theme.dimensions(16, "px")};
    transform: translate(-18px, 0);
  `,
  TrackRow: styled.View`
    height: ${(p) => p.theme.dimensions(100, "%")};
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: ${(p) => p.theme.dimensions(16, "px")};
  `,
  TrackRowExpand: styled.View``,
  ExpandIcon: styled.View`
    transform: rotate(-90deg);
  `,
};
