import { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Link, useSearchParams } from "expo-router";
import { GenericText } from "src/components/text/GenericText";
import Toast from "react-native-toast-message";
import { View } from "react-native-animatable";
import Spinner from "src/components/loaders/Spinner";
import { LinearGradient } from "expo-linear-gradient";
import { appTheme } from "src/assets/styles/theme";
import { Octicons } from "@expo/vector-icons";

const accessToken =
  "BQBMI-N5fWO7N66VeMSUU3z4QRKfkqRAq0Hogxughe-zsCZoJP5bQp71kLaiU95VJDXma-47hZindVHoOJVPpYKPNFqLDgXmKY86C_OCHe15YEk-y12cIKvjCXkmcIj8mdP8D1ytm49p2ZSW65ZItPD_s3cPr7SPNv_Zxjduki1Gvh_WePhI";

interface ITrack {
  id: string;
  name: string;
  track_number: number;
}

interface ITrackProps {
  track: ITrack;
}

const TrackRow = ({ track }: ITrackProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleExpandSong = () => setIsExpanded(!isExpanded);

  return (
    <>
      <S.TrackRowContainer onPress={handleExpandSong}>
        <S.TrackRow animation="fadeInUp" duration={600}>
          <GenericText size={14} weight="bold" content={track.track_number} />
          <GenericText size={14} weight="light" content={track.name} />
          <S.TrackRowExpand>
            <S.ExpandIcon>
              <Octicons
                name="chevron-left"
                size={16}
                color={appTheme.secondary}
              />
            </S.ExpandIcon>
          </S.TrackRowExpand>
        </S.TrackRow>
      </S.TrackRowContainer>
      <S.ExpandedContent style={{ display: isExpanded ? "flex" : "none" }}>
        <GenericText
          size={14}
          weight="light"
          content="Here are the row lyrics  Here are the row lyrics  Here are the row lyrics  Here are the row lyrics  Here are the row lyrics"
          numberOfLines={100}
        />
      </S.ExpandedContent>
    </>
  );
};

const Album = () => {
  const [albumData, setAlbumData] = useState<any>({});
  const { id } = useSearchParams();

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
        }
      } catch (error) {
        console.error("Error:", error);
        Toast.show({
          type: "error",
          text1: "There was an error fetching album data. Please try again.",
        });
      }
    };

    fetchAlbumData();
  }, []);

  if (!albumData.name) {
    return (
      <S.LoaderWrapper>
        <Spinner />
      </S.LoaderWrapper>
    );
  }

  return (
    <S.Wrapper testID="album-screen">
      <S.Hero animation="fadeInUp" duration={700}>
        <S.Cover
          source={{
            uri: albumData.images[1].url,
          }}
        ></S.Cover>
        <S.Title
          testID="album-screen-title"
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {albumData.name}
        </S.Title>
        <S.HeroRight>
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
          <S.Description>
            <GenericText
              size={14}
              weight="light"
              numberOfLines={10}
              content="Wish You Were Here —in Spanish: I wish you were here— is the ninth studio album by the British rock band Pink Floyd, released in September 1975 and inspired by the material they composed during their 1974 European tour and recorded in the Abbey Road Studios, London."
            />
          </S.Description>
        </S.HeroRight>
        <S.HeroBackgroundImage
          source={{ uri: albumData.images[1].url }}
        ></S.HeroBackgroundImage>
        <S.HeroLinearGradient colors={["transparent", appTheme.primary]} />
      </S.Hero>
      <S.Tracks>
        <S.SubTitle animation="fadeInUp" duration={500}>
          <GenericText size={20} weight="bold" content="Song lyrics" />
        </S.SubTitle>
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

export default Album;

const S = {
  Wrapper: styled.ScrollView`
    flex: 1;
    background-color: ${appTheme.primary};
    padding-top: 60px;
    padding-right: 5%;
    padding-left: 5%;
  `,
  LoaderWrapper: styled.View`
    height: 100%;
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${appTheme.primary};
    padding-top: 60px;
  `,
  CloseContainer: styled.Pressable`
    position: absolute;
    left: 0;
    top: 0;
    elevation: 2;
    z-index: 2;
    padding: 0 30px 30px 0;
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: 36px;
    width: 80%;
    text-align: center;
    elevation: 2;
    z-index: 2;
  `,
  SubTitle: styled(View)`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: 20px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
    justify-content; space-between;
    gap: 20px;
  `,
  HeroLinearGradient: styled(LinearGradient)`
    width: 400px;
    height: 400px;
    position: absolute;
    top: -80px;
    elevation: -1;
    z-index: -1;
  `,
  HeroBackgroundImage: styled.ImageBackground`
    width: 400px;
    height: 400px;
    position: absolute;
    top: -80px;
    elevation: -1;
    z-index: -1;
    opacity: 0.6;
  `,
  Hero: styled(View)`
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 30px;
  `,
  HeroRight: styled(View)`
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  `,
  Cover: styled.ImageBackground`
    height: 150px;
    width: 150px;
    background-color: ${(p) => p.theme.shades50};
    overflow: hidden;
    border-radius: 4px;
    margin-top: 50px;
  `,
  Item: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
  `,
  Description: styled.View`
    width: 90%;
  `,
  Tracks: styled.View`
    padding-bottom: 80px;
  `,
  TrackRowContainer: styled.Pressable`
    height: 50px;
    width: ${(p) => p.theme.windowWidth};
    border-bottom-width: 0.5px;
    border-bottom-color: ${appTheme.shades800};
    transform: translate(-20px, 0);
  `,
  TrackRow: styled(View)`
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    padding-left: 20px;
  `,
  TrackRowExpand: styled.View``,
  ExpandIcon: styled.View`
    transform: rotate(-90deg);
  `,
  ExpandedContent: styled(View)`
    display: none;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
  `,
};
