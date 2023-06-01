import { Svg, Path } from "react-native-svg";
import { Appearance } from "react-native";

export const Close = () => {
  return (
    <Svg width="22" height="23" viewBox="0 0 22 23" fill="none">
      <Path
        d="M0.999819 21.5052L21.0698 1.49976"
        stroke={Appearance.getColorScheme() === "light" ? "#030303" : "#FFFFFF"}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M0.999821 1.49489L21.0698 21.5004"
        stroke={Appearance.getColorScheme() === "light" ? "#030303" : "#FFFFFF"}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </Svg>
  );
};
