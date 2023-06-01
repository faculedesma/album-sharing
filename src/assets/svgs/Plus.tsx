import { Svg, Path } from "react-native-svg";
import { Appearance } from "react-native";

export const Plus = () => {
  return (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <Path
        d="M6 10.8116V0.84375"
        stroke={Appearance.getColorScheme() === "light" ? "#030303" : "#FFFFFF"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M1 5.82812L11 5.82812"
        stroke={Appearance.getColorScheme() === "light" ? "#030303" : "#FFFFFF"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};
