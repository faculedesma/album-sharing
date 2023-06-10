import styled from "styled-components/native";
import { appTheme } from "src/assets/styles/theme";
import { GenericInput } from "src/components/inputs/GenericInput";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSpotifyAPI } from "src/hooks/useSpotifyAPI";
import { IAlbum } from "src/types/album/album";
import Toast from "react-native-toast-message";
import { ERROR_FETCH_ALBUMS } from "src/constants/albumConstants";
import { AlbumCover } from "src/components/album/AlbumCover";
import { Link } from "expo-router";
import { GenericText } from "src/components/text/GenericText";
import { Pressable } from "react-native";
import Spinner from "src/components/loaders/Spinner";

interface ISearch {
  id: string;
  text: string;
}

const searchHistory = [
  {
    id: "one",
    text: "pink flo",
  },
  {
    id: "two",
    text: "pink floyd pulse 1995",
  },
  {
    id: "three",
    text: "bocanada",
  },
  {
    id: "four",
    text: "siempre es ho",
  },
  {
    id: "five",
    text: "gustavo cerati",
  },
  {
    id: "six",
    text: "cerati",
  },
  {
    id: "seven",
    text: "is there anybody out there",
  },
  {
    id: "eight",
    text: "hey you",
  },
  {
    id: "nine",
    text: "innervisions",
  },
  {
    id: "ten",
    text: "stevie wonder",
  },
];

export const SearchHeaderRight = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const router = useRouter();
  const { search } = useLocalSearchParams();

  const handleSearch = (value: string) => {
    router.setParams({ search: searchValue });
    setSearchValue(value);
  };

  const clearSearch = () => {
    router.setParams({ search: "" });
    setSearchValue("");
  };

  return (
    <S.SearchInputContainer>
      <GenericInput
        value={searchValue}
        width={320}
        height={40}
        maxLength={200}
        placeholder="Search for an album"
        textContentType="none"
        handleChangeText={(value) => handleSearch(value)}
        autoFocus={true}
      />
      {searchValue.length ? (
        <S.SearchIconClear onPress={clearSearch}>
          <Octicons name="x" size={20} color={appTheme.secondary} />
        </S.SearchIconClear>
      ) : null}
    </S.SearchInputContainer>
  );
};

const Search = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [history, setHistory] = useState<ISearch[]>([]);
  const { token } = useSpotifyAPI();

  const { search } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setHistory(searchHistory);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchAlbumsBySearch = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${search}&type=album&limit=30`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const parsedAlbums = data.albums.items.map((album: any) => {
            return {
              id: album.id,
              name: album.name,
              artist: album.artists[0].name,
              imageUrl: album.images[1].url,
            };
          });
          setAlbums(parsedAlbums);
        } else {
          Toast.show({
            type: "error",
            text1: ERROR_FETCH_ALBUMS,
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: ERROR_FETCH_ALBUMS,
        });
      }
    };

    if (token && search && search.length >= 3) {
      fetchAlbumsBySearch();
    }
  }, [search]);

  const handleSearchByHistory = (text: string) => {
    router.setParams({ search: text });
  };

  return (
    <>
      <S.Wrapper>
        {search?.length ? (
          <S.SearchResults>
            <S.SearchResultsScroll
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
            </S.SearchResultsScroll>
          </S.SearchResults>
        ) : null}
        <S.SearchHistory>
          <GenericText size={16} weight="light" content="Recent searches" />
          {history.length ? (
            history.map((search) => {
              return (
                <S.SearchHistoryRow key={search.id}>
                  <Octicons
                    name="issue-reopened"
                    size={16}
                    color={appTheme.secondary}
                  />
                  <Pressable onPress={() => handleSearchByHistory(search.text)}>
                    <GenericText
                      size={16}
                      weight="light"
                      content={search.text}
                    />
                  </Pressable>
                </S.SearchHistoryRow>
              );
            })
          ) : (
            <Spinner />
          )}
        </S.SearchHistory>
      </S.Wrapper>
      <S.WrapperBackground colors={[appTheme.black, appTheme.primary]} />
    </>
  );
};

export default Search;

const S = {
  Wrapper: styled.ScrollView`
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 100px;
    margin-top: 20px;
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
  SearchInputContainer: styled.View``,
  SearchIconClear: styled.TouchableOpacity`
    position: absolute;
    top: 10px;
    right: 10px;
  `,
  SearchResults: styled.View`
    height: 175px;
    align-items: flex-start;
    justify-content: flex-start;
    border-bottom-width: 0.5px;
    border-bottom-color: ${appTheme.shades800};
  `,
  SearchResultsScroll: styled.ScrollView`
    flex: 1;
    flex-direction: row;
  `,
  SearchHistory: styled.View`
    flex: 1;
    justify-content: flex-start;
    margin-top: 20px;
    margin-bottom: 20px;
  `,
  SearchHistoryRow: styled.View`
    width: 100%;
    height: 30px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    margin-top: 10px;
  `,
};
