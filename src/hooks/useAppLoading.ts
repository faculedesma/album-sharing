import { useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";
import { useFonts } from "expo-font";

export default function useAppLoading() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [fonts] = useFonts({
    circularStdLight: require("src/assets/fonts/circularstd-light.otf"),
    circularStdMedium: require("src/assets/fonts/circularstd-medium.otf"),
    circularStdBook: require("src/assets/fonts/circularstd-book.otf"),
    circularStdBold: require("src/assets/fonts/circularstd-bold.otf"),
  });
  const isWeb = useMemo(() => Platform.OS === "web", []);

  // Set Web CSS Styles
  useEffect(() => {
    if (isWeb)
      document.body.style.cssText = `height: ${window.innerHeight * 0.01}px;`;
  }, []);

  // Set App Loaded
  useEffect(() => {
    if (fonts && !appLoaded) setAppLoaded(true);
  }, [fonts]);

  return appLoaded;
}
