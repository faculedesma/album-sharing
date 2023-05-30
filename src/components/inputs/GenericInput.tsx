import styled from "styled-components/native";
import { appTheme } from "src/assets/styles/theme";
import { BlurView } from "expo-blur";
import { useState } from "react";

interface IGenericInputProps {
  value: string;
  height?: number;
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
        borderColor: focused ? appTheme.highlight : appTheme.shades100,
      }}
      intensity={20}
      tint="light"
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
  InputContainer: styled(BlurView)`
    width: ${(p) => p.theme.dimensions(100, "%")};
    border-width: ${(p) => p.theme.dimensions(1, "px")};
    border-color: ${(p) => p.theme.shades100};
    border-radius: ${(p) => p.theme.dimensions(4, "px")};
    overflow: hidden;
    padding: ${(p) => p.theme.dimensions(16, "px")};
  `,
  Input: styled.TextInput`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-family: circularStdLight;
  `,
  InputMaxChar: styled.Text`
    position: absolute;
    bottom: ${(p) => p.theme.dimensions(4, "px")};
    right: ${(p) => p.theme.dimensions(4, "px")};
    color: ${(p) => p.theme.secondary};
    font-family: circularStdLight;
  `,
};
