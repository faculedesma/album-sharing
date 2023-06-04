import { useState, useEffect } from "react";
import { useSessionStorage } from "./useSessionStorage";

export const useSpotifyAPI = () => {
  const [token, setToken] = useState<string>("");

  const { storeData, getData } = useSessionStorage();

  useEffect(() => {
    const getAccessToken = async () => {
      const sessionToken = await getData("spotify_token");

      if (sessionToken) {
        setToken(sessionToken);
        return;
      }

      const authParams = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
      };

      try {
        const response = await fetch(
          "https://accounts.spotify.com/api/token",
          authParams
        );
        const data = await response.json();
        setToken(data.access_token);
        storeData("spotify_token", data.access_token);
      } catch (e) {
        throw new Error();
      }
    };

    getAccessToken();
  }, []);

  return { token };
};
