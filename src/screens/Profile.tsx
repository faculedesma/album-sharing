import { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { appTheme } from "src/assets/styles/theme";
import { GenericText } from "src/components/text/GenericText";
import { auth } from "../../firebase";
import { GenericInput } from "src/components/inputs/GenericInput";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import { Octicons } from "@expo/vector-icons";
import AvatarThreePNG from "src/assets/images/avatar-four.png";

const Profile = () => {
  const [bioText, setBioText] = useState<string>(
    "Hi! I'm a person who loves progressive rock and roll music. I love to travel with my headphones while a vinyl is playing. I'm a fan of searching song experiences and meaning by the artist after hearing them."
  );
  const [nickname, setNickname] = useState<string>("@chicha37");
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  const router = useRouter();

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const handleOnChangeBio = (value: string) => setBioText(value);

  const handleOnChangeNickname = (value: string) => setNickname(value);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        router.back();
        router.replace("/login");
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error.message.split(":")[1].split(".")[0],
        });
        console.log(error);
        new Error(error.message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <S.Wrapper colors={[appTheme.black, appTheme.primary]}>
        <S.ProfileTop>
          <S.ProfileImage
            source={{
              uri: "https://lh3.googleusercontent.com/ogw/AOLn63FR1yAhWwMPVOxnKxNWJktQRftStxUNo2MUBx_RYg=s64-c-mo",
            }}
          ></S.ProfileImage>
          <S.ProfileTopText>
            <GenericText size={14} weight="bold" content="FACUNDO LEDESMA" />
            <GenericText
              size={12}
              weight="light"
              content="faculedesma1993@gmail.com"
            />
          </S.ProfileTopText>
        </S.ProfileTop>
        <S.AvatarContainer>
          <S.Avatar source={AvatarThreePNG}></S.Avatar>
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
            height={150}
            maxLength={200}
            multiline={true}
            placeholder="Add a little description about yourself"
            textContentType="none"
            handleChangeText={handleOnChangeBio}
          />
        </S.Bio>
        <S.Item>
          <Octicons name="bell" size={16} color={appTheme.secondary} />
          <GenericText size={16} weight="light" content="Notifications" />
          <S.Switch
            trackColor={{ false: appTheme.shades50, true: appTheme.shades800 }}
            thumbColor={isEnabled ? appTheme.highlight : appTheme.shades50}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </S.Item>
        <TouchableOpacity onPress={handleSignOut}>
          <S.Item>
            <Octicons name="sign-out" size={16} color={appTheme.secondary} />
            <GenericText size={16} weight="light" content="Logout" />
          </S.Item>
        </TouchableOpacity>
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
  Avatar: styled.ImageBackground`
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
