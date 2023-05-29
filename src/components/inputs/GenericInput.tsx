import styled from "styled-components/native";
import { appTheme } from "src/assets/styles/theme";

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
  return (
    <S.InputContainer
      style={{
        height: height,
      }}
    >
      <S.Input
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        placeholderTextColor={appTheme.shades200}
        multiline={multiline}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
        onChangeText={handleChangeText}
        autoCapitalize="none"
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}
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
  InputContainer: styled.View`
    width: ${(p) => p.theme.dimensions(100, "%")};
    border: ${(p) => p.theme.dimensions(0.5, "px")} ${(p) => p.theme.shades200};
    border-radius: ${(p) => p.theme.dimensions(4, "px")};
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
