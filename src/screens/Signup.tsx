import { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { Logo } from "src/components/logo/Logo";
import PrimaryButton from "src/components/buttons/PrimaryButton";
import { appTheme } from "src/assets/styles/theme";
import { GenericInput } from "src/components/inputs/GenericInput";
import Toast from "react-native-toast-message";
import { Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
    if (password !== repeat) {
      Toast.show({
        type: "error",
        text1: "Passwords must match",
      });
      setLoading(false);
      return;
    }
    router.push({
      pathname: "/introduction",
      params: {
        email,
        password,
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <S.Wrapper behavior="padding">
        <S.LogoContainer>
          <Logo />
        </S.LogoContainer>
        <S.Inputs>
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
              <Octicons
                name={hide ? "eye-closed" : "eye"}
                size={16}
                color={appTheme.secondary}
              />
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
        <S.SingupBackground colors={[appTheme.black, appTheme.primary]} />
      </S.Wrapper>
    </TouchableWithoutFeedback>
  );
}

const S = {
  Wrapper: styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 90px;
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
  SingupBackground: styled(LinearGradient)`
    width: ${appTheme.windowWidth};
    height: ${appTheme.windowHeight};
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    elevation: -1;
  `,
};
