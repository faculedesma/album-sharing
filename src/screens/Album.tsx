import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import styled from "styled-components/native";
import { useSearchParams } from "expo-router";
import { GenericText } from "src/components/text/GenericText";
import Toast from "react-native-toast-message";
import { View } from "react-native-animatable";
import Spinner from "src/components/loaders/Spinner";
import { LinearGradient } from "expo-linear-gradient";
import { appTheme } from "src/assets/styles/theme";
import { Octicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Pressable } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Comments } from "src/components/comments/Comments";
import commentJson from "src/data/comments.json";
import { useSpotifyAPI } from "src/hooks/useSpotifyAPI";
import { ITrack } from "src/types/album/album";
import { Recommend } from "src/components/recommend/Recommend";

const actions = {
  comments: {
    id: "comments",
    label: "Comments",
    snapPoints: ["50%"],
  },
  recommend: {
    id: "recommend",
    label: "Recommend",
    snapPoints: ["55%"],
  },
  share: {
    id: "share",
    label: "Share",
    snapPoints: ["50%"],
  },
};

interface ITrackProps {
  track: ITrack;
  open: () => void;
  updateAction: (id: string) => void;
}

const getSheetContent = (id: string) => {
  switch (id) {
    case "comments":
      return (
        <>
          <S.TrackCommentsTitle>
            <GenericText
              size={16}
              weight="bold"
              content={actions.comments.label}
            />
          </S.TrackCommentsTitle>
          <Comments comments={commentJson.comments} />
        </>
      );
    case "recommend":
      return (
        <>
          <S.TrackCommentsTitle>
            <GenericText
              size={16}
              weight="bold"
              content={actions.recommend.label}
            />
          </S.TrackCommentsTitle>
          <Recommend />
        </>
      );
    case "share":
      return (
        <>
          <S.TrackCommentsTitle>
            <GenericText
              size={16}
              weight="bold"
              content={actions.share.label}
            />
          </S.TrackCommentsTitle>
        </>
      );
  }
};

const TrackRow = ({ track, open, updateAction }: ITrackProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleExpandSong = () => setIsExpanded(!isExpanded);

  const handleOpenComments = () => {
    updateAction("comments");
    open();
  };

  if (track.id === "track-header") {
    return (
      <S.TrackRowContainer>
        <S.TrackRowLeft>
          <GenericText size={16} weight="bold" content={track.track_number} />
          <GenericText size={16} weight="light" content={track.name} />
        </S.TrackRowLeft>
      </S.TrackRowContainer>
    );
  }

  return (
    <>
      <S.TrackRowContainer onPress={handleExpandSong}>
        <S.TrackRow>
          <S.TrackRowLeft>
            <GenericText size={16} weight="bold" content={track.track_number} />
            <GenericText size={16} weight="light" content={track.name} />
            <S.TrackRowExpand>
              <S.ExpandIcon>
                <Octicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={16}
                  color={appTheme.secondary}
                />
              </S.ExpandIcon>
            </S.TrackRowExpand>
          </S.TrackRowLeft>
          <S.TrackRowRight>
            <Pressable onPress={handleOpenComments}>
              <Octicons name="comment" size={16} color={appTheme.secondary} />
            </Pressable>
          </S.TrackRowRight>
        </S.TrackRow>
      </S.TrackRowContainer>
      <S.ExpandedContent
        style={{ display: isExpanded ? "flex" : "none" }}
        intensity={20}
        tint="light"
      >
        <GenericText
          size={16}
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
  const [actionId, setActionId] = useState<string>("recommend");
  const { id } = useSearchParams();

  const { token } = useSpotifyAPI();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => actions[actionId].snapPoints, [actionId]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleUpdateActionId = (id: string) => setActionId(id);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/albums/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAlbumData(data);
        } else {
          Toast.show({
            type: "error",
            text1: "There was an error fetching album data. Please try again.",
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "There was an error fetching album data. Please try again.",
        });
      }
    };

    if (token) {
      fetchAlbumData();
    }
  }, [token]);

  if (!albumData.name) {
    return (
      <S.LoaderWrapper>
        <Spinner />
      </S.LoaderWrapper>
    );
  }

  return (
    <S.Wrapper testID="album-screen" nestedScrollEnabled={false}>
      <S.Hero animation="fadeInDown" duration={300}>
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
              size={16}
              weight="bold"
              content={albumData.release_date.split("-")[0]}
            />
          </S.Item>
          <S.Description>
            <GenericText
              size={14}
              weight="light"
              numberOfLines={10}
              align="center"
              content="Wish You Were Here —in Spanish: I wish you were here— is the ninth studio album by the British rock band Pink Floyd, released in September 1975 and inspired by the material they composed during their 1974 European tour and recorded in the Abbey Road Studios, London."
            />
          </S.Description>
        </S.HeroRight>
        <S.HeroActions>
          <S.HeroActionsIcon>
            <Octicons name="heart" size={20} color={appTheme.secondary} />
          </S.HeroActionsIcon>
          <S.HeroActionsIcon
            style={{ width: 60, height: 60 }}
            onPress={() => {
              handlePresentModalPress();
              handleUpdateActionId("recommend");
            }}
          >
            <Octicons name="plus" size={24} color={appTheme.secondary} />
          </S.HeroActionsIcon>
          <S.HeroActionsIcon>
            <Octicons
              name="link"
              size={20}
              color={appTheme.secondary}
              onPress={() => {
                handlePresentModalPress();
                handleUpdateActionId("share");
              }}
            />
          </S.HeroActionsIcon>
        </S.HeroActions>
        <S.HeroBackgroundImage
          source={{ uri: albumData.images[1].url }}
        ></S.HeroBackgroundImage>
        <S.HeroLinearGradient colors={["transparent", appTheme.primary]} />
      </S.Hero>
      <S.SubTitle animation="fadeIn" duration={300}>
        <GenericText size={20} weight="bold" content="Song lyrics" />
      </S.SubTitle>
      <S.TracksContainer animation="fadeIn" duration={300}>
        <S.Tracks>
          <TrackRow
            key="track-header"
            track={{
              id: "track-header",
              name: "TITLE",
              track_number: "#",
            }}
            open={() => null}
            updateAction={() => null}
          />
          {albumData.tracks.items.map((track: ITrack) => {
            return (
              <TrackRow
                key={track.id}
                track={{
                  id: track.id,
                  name: track.name,
                  track_number: track.track_number,
                }}
                open={handlePresentModalPress}
                updateAction={handleUpdateActionId}
              />
            );
          })}
        </S.Tracks>
      </S.TracksContainer>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        keyboardBlurBehavior="restore"
        backgroundStyle={{
          backgroundColor: appTheme.secondary900,
        }}
        handleIndicatorStyle={{ backgroundColor: appTheme.secondary }}
      >
        {getSheetContent(actionId)}
      </BottomSheetModal>
    </S.Wrapper>
  );
};

export default Album;

const S = {
  Wrapper: styled.ScrollView`
    flex: 1;
    background-color: ${appTheme.primary};
    padding-top: 60px;
    padding-right: 20px;
    padding-left: 20px;
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
    margin-bottom: 20px;
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
  HeroActions: styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  `,
  HeroActionsIcon: styled.Pressable`
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border-width: 0.5px;
    border-color: ${appTheme.highlight};
    background-color: transparent;
  `,
  Cover: styled.ImageBackground`
    height: 150px;
    width: 150px;
    background-color: ${appTheme.shades500}
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
  TracksContainer: styled(View)``,
  Tracks: styled.ScrollView`
    padding-bottom: 80px;
  `,
  TrackRowContainer: styled.Pressable`
    height: 50px;
    width: 100%;
  `,
  TrackRow: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  `,
  TrackRowLeft: styled.View`
    max-width: 220px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
  `,
  TrackRowRight: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  `,
  TrackComments: styled.View`
    padding-bottom: 150px;
  `,
  TrackCommentsTitle: styled.View`
    width: 100%;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-bottom-width: 0.25px;
    border-bottom-color: ${appTheme.shades500};
    margin-bottom: 20px;
  `,
  TrackRowExpand: styled.View``,
  ExpandIcon: styled.View``,
  ExpandedContent: styled(BlurView)`
    align-items: center;
    justify-content: center;
    padding: 30px 0;
  `,
};
