import AsyncStorage from "@react-native-async-storage/async-storage";

export const useSessionStorage = () => {
  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(`@${key}`, value);
    } catch (e) {
      throw new Error();
    }
  };

  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(`@${key}`);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      throw new Error();
    }
  };

  const clearKey = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      throw new Error();
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      throw new Error();
    }
  };

  return { storeData, getData, clearKey, clearStorage };
};
