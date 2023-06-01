import { Svg, Path } from "react-native-svg";
import { Appearance } from "react-native";

export const ArrowRight = () => {
  return (
    <Svg width={11} height={8} viewBox="0 0 11 8" fill="none">
      <Path
        d="M10.3536 4.18693C10.5488 3.99167 10.5488 3.67508 10.3536 3.47982L7.17157 0.29784C6.97631 0.102578 6.65973 0.102578 6.46447 0.29784C6.2692 0.493102 6.2692 0.809685 6.46447 1.00495L9.29289 3.83337L6.46447 6.6618C6.2692 6.85706 6.2692 7.17365 6.46447 7.36891C6.65973 7.56417 6.97631 7.56417 7.17157 7.36891L10.3536 4.18693ZM0 4.33337L10 4.33337V3.33337L0 3.33337L0 4.33337Z"
        fill={Appearance.getColorScheme() === "light" ? "#030303" : "#FFFFFF"}
      />
    </Svg>
  );
};
