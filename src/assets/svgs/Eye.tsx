import { Svg, Path } from "react-native-svg";
import { Appearance } from "react-native";

export const Eye = () => {
  return (
    <Svg width="20" height="18" viewBox="0 0 20 15" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.25 7.2908C6.25 5.22639 7.92893 3.55285 10 3.55285C12.0711 3.55285 13.75 5.22639 13.75 7.2908C13.75 9.3552 12.0711 11.0287 10 11.0287C7.92893 11.0287 6.25 9.3552 6.25 7.2908ZM10 5.04803C8.75736 5.04803 7.75 6.05215 7.75 7.2908C7.75 8.52944 8.75736 9.53356 10 9.53356C11.2426 9.53356 12.25 8.52944 12.25 7.2908C12.25 6.05215 11.2426 5.04803 10 5.04803Z"
        fill={Appearance.getColorScheme() === "light" ? "#030303" : "#FFFFFF"}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.32343 5.9415C1.90431 6.54349 1.75 7.01439 1.75 7.2908C1.75 7.5672 1.90431 8.0381 2.32343 8.64009C2.72857 9.22201 3.33078 9.85281 4.09267 10.4357C5.61978 11.604 7.71345 12.5239 10 12.5239C12.2865 12.5239 14.3802 11.604 15.9073 10.4357C16.6692 9.85281 17.2714 9.22201 17.6766 8.64009C18.0957 8.0381 18.25 7.5672 18.25 7.2908C18.25 7.01439 18.0957 6.54349 17.6766 5.9415C17.2714 5.35958 16.6692 4.72878 15.9073 4.14591C14.3802 2.97763 12.2865 2.05768 10 2.05768C7.71345 2.05768 5.61978 2.97763 4.09267 4.14591C3.33078 4.72878 2.72857 5.35958 2.32343 5.9415ZM3.17941 2.9598C4.90965 1.63612 7.31598 0.5625 10 0.5625C12.684 0.5625 15.0903 1.63612 16.8206 2.9598C17.6874 3.62291 18.4032 4.36269 18.9089 5.08904C19.4006 5.79533 19.75 6.57042 19.75 7.2908C19.75 8.01117 19.4006 8.78626 18.9089 9.49255C18.4032 10.2189 17.6874 10.9587 16.8206 11.6218C15.0903 12.9455 12.684 14.0191 10 14.0191C7.31598 14.0191 4.90965 12.9455 3.17941 11.6218C2.31262 10.9587 1.59681 10.2189 1.0911 9.49255C0.599371 8.78626 0.25 8.01117 0.25 7.2908C0.25 6.57042 0.599371 5.79533 1.0911 5.08904C1.59681 4.36269 2.31262 3.62291 3.17941 2.9598Z"
        fill={Appearance.getColorScheme() === "light" ? "#030303" : "#FFFFFF"}
      />
    </Svg>
  );
};
