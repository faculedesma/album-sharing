import { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components/native";
import { Stack, useRouter } from "expo-router";
import { Logo } from "src/assets/svgs/Logo";
import { EyeDisabled } from "src/assets/svgs/EyeDisabled";
import { Eye } from "src/assets/svgs/Eye";
import SecondaryButton from "src/components/buttons/SecondaryButton";
import PrimaryButton from "src/components/buttons/PrimaryButton";
import { appTheme } from "src/assets/styles/theme";
import { auth } from "../../firebase";
import { GenericInput } from "src/components/inputs/GenericInput";
import Toast from "react-native-toast-message";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hide, setHide] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleToggleHidde = () => setHide(!hide);

  const handleSignIn = async () => {
    setLoading(true);
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Please enter an username",
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
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setLoading(false);
        console.log(response.user);
        router.push("/home");
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error.message.split(":")[1].split(".")[0],
        });
        setLoading(false);
        console.log(error);
        new Error(error.message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <S.Wrapper testID="login-screen" behavior="padding">
        <Stack.Screen options={{ title: "Login Screen", headerShown: false }} />
        <S.LogoContainer testID="login-screen-logo">
          <Logo />
        </S.LogoContainer>
        <S.LoginInputs testID="login-screen-inputs">
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
          <S.ForgotPassword>
            <SecondaryButton
              text="Forgot password?"
              icon={false}
              handlePress={() => console.log("Forgotten")}
            />
          </S.ForgotPassword>
          <S.LoginButton>
            <PrimaryButton
              text="Log in"
              icon={false}
              bold={true}
              size="md"
              color={appTheme.primary}
              handlePress={handleSignIn}
              loading={loading}
            />
          </S.LoginButton>
          <S.SignupButton>
            <SecondaryButton
              text="Sign up"
              icon={false}
              bold={true}
              size="md"
              handlePress={() => router.push("/signup")}
            />
          </S.SignupButton>
        </S.LoginInputs>
      </S.Wrapper>
    </TouchableWithoutFeedback>
  );
}

const S = {
  Wrapper: styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 20px;
  `,
  LogoContainer: styled.View`
    height: 100px;
    width: 100px;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-radius: 50%;
    border: 1px ${(p) => p.theme.highlight};
    margin-bottom: 80px;
  `,
  LoginInputs: styled.View`
    justify-content: space-between;
    width: 100%;
    gap: 20px;
  `,
  PasswordContainer: styled.View`
    width: 100%;
  `,
  Icon: styled.View`
    position: absolute;
    bottom: 16px;
    right: 16px;
  `,
  ForgotPassword: styled.View`
    align-self: flex-end;
  `,
  LoginButton: styled.View`
    width: 100%;
    align-self: center;
  `,
  SignupButton: styled.View`
    align-self: center;
  `,
};
