import { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components/native";
import { Stack, useRouter } from "expo-router";
import { Logo } from "src/components/logo/Logo";
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
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Please enter an email",
      });
      setLoading(false);
      return;
    }
    if (!password) {
      Toast.show({
        type: "error",
        text1: "Please enter a password",
      });
      setLoading(false);
      return;
    }
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
        setEmail("");
        setPassword("");
        setRepeat("");
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
        <S.LogoContainer>
          <Logo />
        </S.LogoContainer>
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
              color={appTheme.secondary}
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
  LogoContainer: styled.View`
    margin-bottom: 80px;
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
