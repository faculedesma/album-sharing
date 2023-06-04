import { useState, useEffect } from "react";
import { useSessionStorage } from "./useSessionStorage";
import { CLIENT_ID, CLIENT_SECRET } from "@env";

export const useSpotifyAPI = () => {
  const [token, setToken] = useState<string>("");
  const [expires, setExpires] = useState<boolean>(false);

  const { storeData, getData } = useSessionStorage();

  useEffect(() => {
    const getAccessToken = async () => {
      const sessionToken = await getData("spotify_token");

      if (sessionToken) {
        setToken(sessionToken);
        console.log("entro");
        return;
      }

      const authParams = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
      };

      try {
        const response = await fetch(
          "https://accounts.spotify.com/api/token",
          authParams
        );
        const data = await response.json();
        setToken(data.access_token);
        setExpires(data.expires_in);
        storeData("spotify_token", data.access_token);
      } catch (e) {
        throw new Error();
      }
    };

    getAccessToken();
  }, []);

  return { token, expires };
};
