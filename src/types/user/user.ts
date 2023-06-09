interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  nickname: string;
  bio: string;
  avatar_url: string;
  profile_image_uri: string;
  settings: {
    notifications: boolean;
  };
}

export { IUser };
