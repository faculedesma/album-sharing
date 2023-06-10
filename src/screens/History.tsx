import styled from "styled-components/native";
import { appTheme } from "src/assets/styles/theme";
import { GenericText } from "src/components/text/GenericText";
import { BlurView } from "expo-blur";
import recommendationsJson from "src/data/recommendations.json";
import { Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RecommendationRow } from "src/components/recommend/RecommendationRow";
import Spinner from "src/components/loaders/Spinner";

const HistoryList = () => {
  return (
    <>
      <S.History>
        <S.HistoryTop>
          <S.Group intensity={20} tint="light">
            <Pressable>
              <GenericText size={14} weight="bold" content="Los Pica" />
            </Pressable>
          </S.Group>
        </S.HistoryTop>
        <S.HistoryList>
          {recommendationsJson.recommendations.length ? (
            recommendationsJson.recommendations.map((rec) => {
              return (
                <RecommendationRow
                  key={rec.id}
                  user={rec.user}
                  album={{
                    id: rec.album_id,
                    name: rec.album_name,
                    artist: rec.artist,
                  }}
                  date={rec.date}
                  color={appTheme.green}
                />
              );
            })
          ) : (
            <Spinner />
          )}
        </S.HistoryList>
      </S.History>
    </>
  );
};

const History = () => {
  return (
    <>
      <S.Wrapper>
        <HistoryList />
      </S.Wrapper>
      <S.WrapperBackground colors={[appTheme.black, appTheme.primary]} />
    </>
  );
};

export default History;

const S = {
  Wrapper: styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 120px;
  `,
  WrapperBackground: styled(LinearGradient)`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    elevation: -1;
  `,
  History: styled.View`
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  `,
  HistoryTop: styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  Group: styled(BlurView)`
    height: 30px;
    align-items: center;
    justify-content: center;
    border: 0.5px ${(p) => p.theme.shades400};
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;
    overflow: hidden;
    transform: translate(-1px, 0);
  `,
  HistoryList: styled.ScrollView`
    width: 100%;
    border-width: 0.5px;
    border-color: ${(p) => p.theme.shades700};
    border-radius: 4px;
    overflow: hidden;
    padding: 20px;
  `,
};
