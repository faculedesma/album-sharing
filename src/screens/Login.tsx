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

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hide, setHide] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleToggleHidde = () => setHide(!hide);

  const handleSignIn = async () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setLoading(false);
        console.log(response.user);
        router.push("/home");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        new Error(error.message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <S.Wrapper testID="login-screen" behavior="padding">
        <Stack.Screen options={{ title: "Login Screen", headerShown: false }} />
        <S.LoginTop>
          <S.LogoContainer testID="login-screen-logo">
            <Logo />
          </S.LogoContainer>
          <S.Title testID="login-screen-title">Sharing</S.Title>
        </S.LoginTop>
        <S.Inputs testID="intro-screen-bio">
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
        </S.Inputs>
        <S.ForgotPassword>
          <SecondaryButton
            href="/introduction"
            text="Forgot password?"
            icon={false}
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
            href="/signup"
            text="Sign up"
            icon={false}
            bold={true}
            size="md"
          />
        </S.SignupButton>
      </S.Wrapper>
    </TouchableWithoutFeedback>
  );
}

const S = {
  Wrapper: styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-right: ${(p) => p.theme.dimensions(5, "%")};
    padding-left: ${(p) => p.theme.dimensions(5, "%")};
    gap: ${(p) => p.theme.dimensions(16, "px")};
  `,
  LoginTop: styled.View`
    align-items: center;
    justify-content: center;
    margin-bottom: ${(p) => p.theme.dimensions(64, "px")};
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.secondary};
    font-family: circularStdBold;
    font-size: ${(p) => p.theme.dimensions(36, "px")};
    margin-top: ${(p) => p.theme.dimensions(16, "px")};
  `,
  LogoContainer: styled.View`
    height: ${(p) => p.theme.dimensions(100, "px")};
    width: ${(p) => p.theme.dimensions(100, "px")};
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-radius: ${(p) => p.theme.dimensions(50, "%")};
    border: ${(p) => p.theme.dimensions(0.5, "px")} ${(p) => p.theme.highlight};
    overflow: visible;
  `,
  Inputs: styled.View`
    align-items: center;
    justify-content: space-between;
    width: ${(p) => p.theme.dimensions(100, "%")};
    gap: ${(p) => p.theme.dimensions(16, "px")};
  `,
  PasswordContainer: styled.View`
    height: ${(p) => p.theme.dimensions(50, "px")};
    width: ${(p) => p.theme.dimensions(100, "%")};
  `,
  Icon: styled.View`
    position: absolute;
    bottom: ${(p) => p.theme.dimensions(16, "px")};
    right: ${(p) => p.theme.dimensions(16, "px")};
  `,
  ForgotPassword: styled.View`
    align-self: flex-end;
  `,
  LoginButton: styled.View`
    width: ${(p) => p.theme.dimensions(100, "%")};
    align-self: center;
  `,
  SignupButton: styled.View`
    align-self: center;
  `,
};
