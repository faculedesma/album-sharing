import { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import SecondaryButton from "src/components/buttons/SecondaryButton";
import PrimaryButton from "src/components/buttons/PrimaryButton";
import { appTheme } from "src/assets/styles/theme";
import { auth } from "../../firebase";
import { GenericInput } from "src/components/inputs/GenericInput";
import Toast from "react-native-toast-message";
import { Logo } from "src/components/logo/Logo";
import { Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Login = () => {
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
        <S.LogoContainer>
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
              <Octicons
                name={hide ? "eye-closed" : "eye"}
                size={16}
                color={appTheme.secondary}
              />
            </S.Icon>
          </S.PasswordContainer>
          <S.ForgotPassword>
            <SecondaryButton
              text="Forgot password?"
              icon={false}
              handlePress={() => console.log("forgotten")}
            />
          </S.ForgotPassword>
          <S.LoginButton>
            <PrimaryButton
              text="Log in"
              icon={false}
              bold={true}
              size="md"
              color={appTheme.secondary}
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
              handlePress={() => router.replace("/signup")}
            />
          </S.SignupButton>
        </S.LoginInputs>
        <S.LoginBackground colors={[appTheme.black, appTheme.primary]} />
      </S.Wrapper>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const S = {
  Wrapper: styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-left: 20px;
    padding-right: 20px;
    gap: 20px;
  `,
  LogoContainer: styled.View`
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
    bottom: 0;
    right: 0;
    padding-bottom: 16px;
    padding-right: 16px;
    padding-left: 16px;
  `,
  ForgotPassword: styled.View`
    align-self: flex-end;
  `,
  LoginButton: styled.View`
    width: 100%;
    align-self: center;
  `,
  SignupButton: styled.View``,
  LoginBackground: styled(LinearGradient)`
    width: ${appTheme.windowWidth};
    height: ${appTheme.windowHeight};
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    elevation: -1;
  `,
};
