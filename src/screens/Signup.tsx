import { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components/native";
import { Stack, useRouter } from "expo-router";
import { Logo } from "src/assets/svgs/Logo";
import { EyeDisabled } from "src/assets/svgs/EyeDisabled";
import { Eye } from "src/assets/svgs/Eye";
import PrimaryButton from "src/components/buttons/PrimaryButton";
import { appTheme } from "src/assets/styles/theme";
import { auth } from "../../firebase";
import { GenericInput } from "src/components/inputs/GenericInput";
import Toast from "react-native-toast-message";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeat, setRepeat] = useState<string>("");
  const [hide, setHide] = useState<boolean>(true);
  const [hideRepeat, setHideRepeat] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleToggleHidde = () => setHide(!hide);

  const handleToggleHideRepeat = () => setHideRepeat(!hideRepeat);

  const handleSignUp = async () => {
    if (password !== repeat) {
      Toast.show({
        type: "error",
        text1: "Passwords must match",
      });
      return;
    }
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setLoading(false);
        console.log(response.user);
        router.push("/introduction");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        Toast.show({
          type: "error",
          text1: error.message.split(":")[1].split(".")[0],
        });
        new Error(error.message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <S.Wrapper testID="login-screen" behavior="padding">
        <Stack.Screen
          options={{ title: "Sign up Screen", headerShown: false }}
        />
        <S.SignupTop>
          <S.LogoContainer testID="signup-screen-logo">
            <Logo />
          </S.LogoContainer>
        </S.SignupTop>
        <S.Inputs testID="signup-screen-bio">
          <GenericInput
            value={email}
            maxLength={100}
            placeholder="Email"
            textContentType="username"
            handleChangeText={(value) => setEmail(value)}
          />
          <S.PasswordContainer>
            <GenericInput
              value={password}
              maxLength={100}
              placeholder="Password"
              secureTextEntry={hide}
              textContentType="password"
              handleChangeText={(value) => setPassword(value)}
            />
            <S.Icon onTouchStart={handleToggleHidde}>
              {hide ? <EyeDisabled /> : <Eye />}
            </S.Icon>
          </S.PasswordContainer>
          <S.PasswordContainer>
            <GenericInput
              value={repeat}
              maxLength={100}
              placeholder="Repeat password"
              secureTextEntry={hideRepeat}
              textContentType="password"
              handleChangeText={(value) => setRepeat(value)}
            />
            <S.Icon onTouchStart={handleToggleHideRepeat}>
              {hideRepeat ? <EyeDisabled /> : <Eye />}
            </S.Icon>
          </S.PasswordContainer>
          <S.SignupButton>
            <PrimaryButton
              text="Sign up"
              icon={false}
              bold={true}
              size="md"
              color={appTheme.primary}
              handlePress={handleSignUp}
              loading={loading}
            />
          </S.SignupButton>
        </S.Inputs>
      </S.Wrapper>
    </TouchableWithoutFeedback>
  );
}

const S = {
  Wrapper: styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,
  SignupTop: styled.View`
    align-items: center;
    justify-content: center;
    margin-bottom: 80px;
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
  Inputs: styled.View`
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 20px;
  `,
  PasswordContainer: styled.View`
    height: 50px;
    width: 100%;
  `,
  Icon: styled.View`
    position: absolute;
    bottom: 16px;
    right: 16px;
  `,
  SignupButton: styled.View`
    width: 100%;
    align-self: center;
  `,
};
