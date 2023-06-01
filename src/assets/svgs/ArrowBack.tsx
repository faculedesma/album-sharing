import { Svg, Path } from "react-native-svg";
import { Appearance } from "react-native";

export const ArrowBack = () => {
  return (
    <Svg width="9" height="15" viewBox="0 0 9 15" fill="none">
      <Path
        d="M0.292893 6.79289C-0.097631 7.18342 -0.097631 7.81658 0.292893 8.20711L6.65685 14.5711C7.04738 14.9616 7.68054 14.9616 8.07107 14.5711C8.46159 14.1805 8.46159 13.5474 8.07107 13.1569L2.41421 7.5L8.07107 1.84315C8.46159 1.45262 8.46159 0.819457 8.07107 0.428932C7.68054 0.0384078 7.04738 0.0384078 6.65685 0.428932L0.292893 6.79289ZM2 6.5H1L1 8.5H2L2 6.5Z"
        fill={Appearance.getColorScheme() === "light" ? "#030303" : "#FFFFFF"}
      />
    </Svg>
  );
};
