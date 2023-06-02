import { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { Stack, useRouter } from "expo-router";
import { appTheme } from "src/assets/styles/theme";
import { GenericText } from "src/components/text/GenericText";
import { auth } from "../../firebase";
import { GenericInput } from "src/components/inputs/GenericInput";
import { BlurView } from "expo-blur";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import { Octicons } from "@expo/vector-icons";

const Profile = () => {
  const [bioText, setBioText] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

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
      <S.Wrapper
        testID="profile-screen"
        colors={[appTheme.black, appTheme.primary]}
      >
        <S.Avatar intensity={10} tint="dark"></S.Avatar>
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
            trackColor={{ false: appTheme.shades50, true: appTheme.shades50 }}
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
    padding-right: 5%;
    padding-left: 5%;
    z-index: 1;
    elevation: 1;
  `,
  ProfileAvatar: styled.ImageBackground`
    height: 30px;
    width: 30px;
    background-color: ${(p) => p.theme.shades50}
    border: .5px ${(p) => p.theme.highlight}
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    right: 0;
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: 36px;
  `,
  Avatar: styled(BlurView)`
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: 0.5px ${(p) => p.theme.highlight};
    align-self: flex-start;
    overflow: hidden;
    margin: 20px 0;
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
    color: ${(p) => p.theme.secondary};
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
