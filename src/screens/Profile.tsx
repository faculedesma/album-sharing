import { useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { appTheme } from "src/assets/styles/theme";
import { GenericText } from "src/components/text/GenericText";
import { GenericInput } from "src/components/inputs/GenericInput";
import { LinearGradient } from "expo-linear-gradient";
import { Octicons } from "@expo/vector-icons";
import { ALPHA_NUMERICAL_REGEX } from "src/utils/string";
import { useUserData } from "src/hooks/useUserData";
import Spinner from "src/components/loaders/Spinner";
import { useSessionStorage } from "src/hooks/useSessionStorage";

const Profile = () => {
  const [bioText, setBioText] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  const router = useRouter();
  const { user } = useUserData();
  const { clearStorage } = useSessionStorage();

  useEffect(() => {
    if (user) {
      setBioText(user.bio);
      setNickname(user.nickname);
      setIsEnabled(user.settings.notifications);
    }
  }, [user]);

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const handleOnChangeBio = (value: string) => {
    if (!value.match(ALPHA_NUMERICAL_REGEX)) {
      return;
    }
    setBioText(value);
  };

  const handleOnChangeNickname = (value: string) => {
    if (!value.match(ALPHA_NUMERICAL_REGEX)) {
      return;
    }
    setNickname(value);
  };

  const handleSignOut = () => {
    // handle sign out api call
    setTimeout(async () => {
      await clearStorage();
      router.replace("/login");
    }, 1000);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <S.Wrapper colors={[appTheme.black, appTheme.primary]}>
        {user.name ? (
          <>
            <S.ProfileTop>
              <S.ProfileImage
                source={{
                  uri: user.profile_image_uri,
                }}
              ></S.ProfileImage>
              <S.ProfileTopText>
                <GenericText
                  size={14}
                  weight="bold"
                  content={`${user.name} ${user.surname}`}
                  textTransform="uppercase"
                />
                <GenericText size={12} weight="light" content={user.email} />
              </S.ProfileTopText>
            </S.ProfileTop>
            <S.AvatarContainer>
              <S.Avatar source={{ uri: user.avatar_url }}></S.Avatar>
            </S.AvatarContainer>
            <GenericInput
              value={nickname}
              maxLength={100}
              placeholder="nickname"
              textContentType="nickname"
              handleChangeText={handleOnChangeNickname}
            />
            <S.Bio testID="profile-screen-bio">
              <S.BioTitle>Bio</S.BioTitle>
              <GenericInput
                value={bioText}
                height={175}
                maxLength={300}
                multiline={true}
                numberOfLines={10}
                placeholder="Add a little description about yourself"
                textContentType="none"
                handleChangeText={handleOnChangeBio}
              />
            </S.Bio>
            <S.Item>
              <Octicons name="bell" size={16} color={appTheme.secondary} />
              <GenericText size={16} weight="light" content="Notifications" />
              <S.Switch
                trackColor={{
                  false: appTheme.shades50,
                  true: appTheme.shades800,
                }}
                thumbColor={isEnabled ? appTheme.highlight : appTheme.shades50}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </S.Item>
            <TouchableOpacity onPress={handleSignOut}>
              <S.Item>
                <Octicons
                  name="sign-out"
                  size={16}
                  color={appTheme.secondary}
                />
                <GenericText size={16} weight="light" content="Logout" />
              </S.Item>
            </TouchableOpacity>
          </>
        ) : (
          <Spinner />
        )}
      </S.Wrapper>
    </TouchableWithoutFeedback>
  );
};

export default Profile;

const S = {
  Wrapper: styled(LinearGradient)`
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
    padding-right: 20px;
    padding-left: 20px;
    z-index: 1;
    elevation: 1;
  `,
  ProfileTop: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-betwen;
    margin-top: 20px;
    gap: 10px;
  `,
  ProfileTopText: styled.View`
    align-items: flex-start;
    justify-content: space-betwen;
    gap: 5px;
  `,
  ProfileImage: styled.ImageBackground`
    height: 40px;
    width: 40px;
    background-color: ${appTheme.shades50}
    border: .5px ${appTheme.highlight}
    border-radius: 50%;
    overflow: hidden;
  `,
  AvatarContainer: styled.View`
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: 0.5px ${appTheme.highlight}
    align-self: flex-start;
    overflow: hidden;
    align-items: center;
    justify-content: center;
  `,
  Avatar: styled.Image`
    height: 75px;
    width: 75px;
  `,
  Bio: styled.View`
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
  `,
  BioTitle: styled.Text`
    align-items: center;
    justify-content: space-between;
    color: ${appTheme.secondary}
    align-self: flex-start;
    font-family: circularStdLight;
  `,
  Item: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
  `,
  Switch: styled.Switch``,
};
