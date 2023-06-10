import { useState, useEffect } from "react";
import { useSessionStorage } from "./useSessionStorage";
import { IUser } from "src/types/user/user";

const defaultUser = {
  id: "",
  name: "",
  surname: "",
  email: "@",
  nickname: "",
  bio: "",
  avatar_url: "",
  profile_image_uri: "",
  settings: {
    notifications: true,
  },
};

export const useUserData = () => {
  const [user, setUser] = useState<IUser>(defaultUser);

  const { getData } = useSessionStorage();

  useEffect(() => {
    const getUserData = async () => {
      const sessionUser = (await getData("user")) as string;
      if (sessionUser) {
        const parsedUser = JSON.parse(sessionUser) as IUser;
        setUser(parsedUser);
      }
    };

    getUserData();
  }, []);

  return { user };
};
