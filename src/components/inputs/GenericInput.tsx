import styled from "styled-components/native";
import { appTheme } from "src/assets/styles/theme";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

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
  isBottomSheet?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoFocus?: boolean;
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
  isBottomSheet = false,
  autoCapitalize = "none",
  autoFocus = false,
}: IGenericInputProps) => {
  const [focused, setFoucsed] = useState<boolean>(false);

  if (isBottomSheet) {
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
        <S.BottomSheetTextInput
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={appTheme.shades400}
          onChangeText={handleChangeText}
          autoCapitalize={autoCapitalize}
          onFocus={() => setFoucsed(true)}
          onBlur={() => setFoucsed(false)}
          autoFocus={autoFocus}
          numberOfLines={numberOfLines}
          multiline={multiline}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry}
        />
        {multiline && (
          <S.InputMaxChar>
            {value?.length}/{maxLength}
          </S.InputMaxChar>
        )}
      </S.InputContainer>
    );
  }

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
        autoCapitalize={autoCapitalize}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}
        onFocus={() => setFoucsed(true)}
        onBlur={() => setFoucsed(false)}
        autoFocus={autoFocus}
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
    color: ${appTheme.secondary}
    border-width: 0.5px;
    border-color: ${appTheme.shades800};
    font-size: 14px;
  `,
  BottomSheetTextInput: styled(BottomSheetTextInput)`
    width: 100%;
    height: 100%
    border-radius: 4px;
    overflow: hidden;
    padding-left: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-family: circularStdLight;
    color: ${appTheme.secondary}
    border-width: 0.5px;
    border-color: ${appTheme.shades800};
    font-size: 14px;
  `,
  InputMaxChar: styled.Text`
    position: absolute;
    bottom: 4px;
    right: 4px;
    color: ${appTheme.secondary}
    font-family: circularStdLight;
  `,
};
