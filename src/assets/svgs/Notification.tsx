import { Svg, Path } from "react-native-svg";
import { Appearance } from "react-native";

export const Notification = () => {
  return (
    <Svg width="19" height="21" viewBox="0 0 19 21" fill="none">
      <Path
        d="M3.64901 1.48221C3.92137 1.17114 3.88918 0.698881 3.5771 0.427394C3.26503 0.155907 2.79125 0.187998 2.51888 0.499071L1.22707 1.97448C0.494313 2.81139 0.0800828 3.87846 0.056846 4.98903L0.000166375 7.69795C-0.0084705 8.11074 0.320241 8.45236 0.734365 8.46097C1.14849 8.46957 1.4912 8.14192 1.49984 7.72913L1.55652 5.02021C1.57242 4.26034 1.85584 3.53024 2.3572 2.95762L3.64901 1.48221Z"
        fill={Appearance.getColorScheme() === "light" ? "#030303" : "#FFFFFF"}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.45721 6.75299C3.59611 4.53939 5.43771 2.81495 7.66278 2.81495H8.2202V2.06736C8.2202 1.51685 8.66791 1.07057 9.2202 1.07057C9.77248 1.07057 10.2202 1.51685 10.2202 2.06736V2.81495H10.7776C13.0027 2.81495 14.8443 4.5394 14.9832 6.75299L15.2042 10.2751C15.2884 11.6179 15.7407 12.912 16.5118 14.0164C17.2085 15.0142 16.5882 16.3924 15.3773 16.5372L11.9702 16.9447V18.0159C11.9702 19.5298 10.739 20.7571 9.2202 20.7571C7.70141 20.7571 6.4702 19.5298 6.4702 18.0159V16.9447L3.06307 16.5372C1.85214 16.3924 1.23192 15.0142 1.9286 14.0164C2.69966 12.912 3.15195 11.6179 3.23621 10.2751L3.45721 6.75299ZM7.66278 4.31012C6.22978 4.31012 5.04374 5.42071 4.95429 6.84632L4.73329 10.3684C4.63189 11.9843 4.08764 13.5416 3.15979 14.8705C3.10943 14.9426 3.15426 15.0422 3.24179 15.0527L6.97945 15.4998C8.46794 15.6778 9.97245 15.6778 11.4609 15.4998L15.1986 15.0527C15.2861 15.0422 15.331 14.9426 15.2806 14.8705C14.3527 13.5416 13.8085 11.9843 13.7071 10.3684L13.4861 6.84632C13.3966 5.42071 12.2106 4.31012 10.7776 4.31012H7.66278ZM9.2202 19.2619C8.52984 19.2619 7.9702 18.704 7.9702 18.0159V17.2683H10.4702V18.0159C10.4702 18.704 9.91055 19.2619 9.2202 19.2619Z"
        fill={Appearance.getColorScheme() === "light" ? "#030303" : "#FFFFFF"}
      />
      <Path
        d="M14.8633 0.427394C14.5512 0.698881 14.519 1.17114 14.7914 1.48221L16.0832 2.95762C16.5846 3.53024 16.868 4.26034 16.8839 5.02021L16.9406 7.72913C16.9492 8.14192 17.2919 8.46957 17.706 8.46097C18.1202 8.45236 18.4489 8.11074 18.4402 7.69795L18.3835 4.98903C18.3603 3.87846 17.9461 2.81139 17.2133 1.97448L15.9215 0.499071C15.6491 0.187998 15.1754 0.155907 14.8633 0.427394Z"
        fill={Appearance.getColorScheme() === "light" ? "#030303" : "#FFFFFF"}
      />
    </Svg>
  );
};
