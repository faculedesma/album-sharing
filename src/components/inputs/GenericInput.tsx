import styled from "styled-components/native";
import { appTheme } from "src/assets/styles/theme";
import { BlurView } from "expo-blur";
import { useState } from "react";

interface IGenericInputProps {
  value: string;
  height?: number;
  width?: number | string;
  maxLength?: number;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  ellipsizeMode?: string;
  autoCorrect?: boolean;
  textContentType: string;
  secureTextEntry?: boolean;
  handleChangeText: (value: string) => void;
}

export const GenericInput = ({
  value,
  height = 50,
  width = "100%",
  maxLength = 100,
  placeholder = "",
  multiline = false,
  numberOfLines = 1,
  ellipsizeMode = "head",
  autoCorrect = false,
  textContentType,
  secureTextEntry = false,
  handleChangeText,
}: IGenericInputProps) => {
  const [focused, setFoucsed] = useState<boolean>(false);

  return (
    <S.InputContainer
      style={{
        height: height,
        width: width,
        borderColor: focused ? appTheme.highlight : appTheme.shades100,
      }}
      intensity={20}
      tint="dark"
    >
      <S.Input
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        placeholderTextColor={appTheme.shades400}
        multiline={multiline}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
        onChangeText={handleChangeText}
        autoCapitalize="none"
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}
        onFocus={() => setFoucsed(true)}
        onBlur={() => setFoucsed(false)}
      />
      {multiline && (
        <S.InputMaxChar>
          {value?.length}/{maxLength}
        </S.InputMaxChar>
      )}
    </S.InputContainer>
  );
};

const S = {
  InputContainer: styled(BlurView)``,
  Input: styled.TextInput`
    width: 100%;
    height: 100%
    border-radius: 4px;
    overflow: hidden;
    padding-left: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-family: circularStdLight;
    color: ${(p) => p.theme.secondary};
    border-width: 0.5px;
    border-color: ${appTheme.shades800};
    font-size: 14px;
  `,
  InputMaxChar: styled.Text`
    position: absolute;
    bottom: 4px;
    right: 4px;
    color: ${(p) => p.theme.secondary};
    font-family: circularStdLight;
  `,
};
