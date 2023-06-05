import { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components/native";
import { Stack, useRouter } from "expo-router";
import SecondaryButton from "src/components/buttons/SecondaryButton";
import { Logo } from "src/components/logo/Logo";
import { appTheme } from "src/assets/styles/theme";
import { GenericInput } from "src/components/inputs/GenericInput";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import AvatarOnePNG from "src/assets/images/avatar-one.png";
import AvatarTwoPNG from "src/assets/images/avatar-two.png";
import AvatarThreePNG from "src/assets/images/avatar-three.png";
import AvatarFourPNG from "src/assets/images/avatar-four.png";
import AvatarFivePNG from "src/assets/images/avatar-five.png";
import AvatarSixPNG from "src/assets/images/avatar-six.png";
import AvatarSevenPNG from "src/assets/images/avatar-seven.png";
import AvatarEightPNG from "src/assets/images/avatar-eight.png";

const avatars = [
  {
    id: "one",
    image: AvatarOnePNG,
  },
  {
    id: "two",
    image: AvatarTwoPNG,
  },
  {
    id: "three",
    image: AvatarThreePNG,
  },
  {
    id: "four",
    image: AvatarFourPNG,
  },
  {
    id: "five",
    image: AvatarFivePNG,
  },
  {
    id: "six",
    image: AvatarSixPNG,
  },
  {
    id: "seven",
    image: AvatarSevenPNG,
  },
  {
    id: "eight",
    image: AvatarEightPNG,
  },
];

export default function Introduction() {
  const [bioText, setBioText] = useState<string>("");
  const [nickname, setNickname] = useState<string>("@");
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>("one");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleOnChangeBio = (value: string) => setBioText(value);

  const handleOnChangeNickname = (value: string) => setNickname(value);

  const handleFinishSignUp = async () => {
    if (!nickname) {
      Toast.show({
        type: "error",
        text1: "Please enter a nickname",
      });
      return;
    }
    if (!bioText) {
      Toast.show({
        type: "error",
        text1: "Please enter a bio",
      });
      return;
    }
    router.push("/home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <S.Wrapper testID="intro-screen" behavior="padding">
        <Logo />
        <S.Title testID="intro-screen-title">Choose avatar</S.Title>
        <GenericInput
          value={nickname}
          maxLength={100}
          textContentType="nickname"
          placeholder="Nickname"
          handleChangeText={handleOnChangeNickname}
        />
        <S.AvatarOptions testID="intro-screen-options">
          {avatars.map((avatar) => {
            return (
              <S.Circle
                key={avatar.id}
                style={{
                  borderColor:
                    avatar.id === selectedAvatarId
                      ? appTheme.highlight
                      : appTheme.shades800,
                }}
                onPress={() => setSelectedAvatarId(avatar.id)}
              >
                <S.AvatarImage source={avatar.image}></S.AvatarImage>
              </S.Circle>
            );
          })}
        </S.AvatarOptions>
        <S.Bio testID="intro-screen-bio">
          <S.BioTitle>Bio</S.BioTitle>
          <GenericInput
            value={bioText}
            height={150}
            maxLength={200}
            multiline={true}
            numberOfLines={5}
            textContentType="none"
            placeholder="Add a little description about yourself"
            handleChangeText={handleOnChangeBio}
          />
        </S.Bio>
        <S.ContinueButton>
          <SecondaryButton
            text="Continue"
            icon={false}
            bold={true}
            size="md"
            handlePress={handleFinishSignUp}
          />
        </S.ContinueButton>
        <S.IntroductionBackground colors={[appTheme.black, appTheme.primary]} />
      </S.Wrapper>
    </TouchableWithoutFeedback>
  );
}

const S = {
  Wrapper: styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-left: 20px;
    padding-right: 20px;
    gap: 20px;
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: 36px;
    margin-bottom: 20px;
  `,
  LogoContainer: styled.View`
    height: 100px;
    width: 100px;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-radius: 50%;
    border: 0.5px ${(p) => p.theme.highlight};
    overflow: visible;
  `,
  AvatarOptions: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    overflow: hidden;
  `,
  Circle: styled.Pressable`
    height: 75px;
    width: 75px;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-radius: 50%;
    border: 0.5px ${appTheme.shades800};
  `,
  AvatarImage: styled.ImageBackground`
    height: 40px;
    width: 40px;
    overflow: visible;
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
    gap: 4px;
    color: ${(p) => p.theme.secondary};
    align-self: flex-start;
    font-family: circularStdLight;
  `,
  ContinueButton: styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
  `,
  IntroductionBackground: styled(LinearGradient)`
    width: ${appTheme.windowWidth};
    height: ${appTheme.windowHeight};
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    elevation: -1;
  `,
};
