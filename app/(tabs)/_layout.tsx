import { Tabs } from "expo-router";
import { GenericText } from "../../src/components/text/GenericText";
import { appTheme } from "src/assets/styles/theme";
import { Octicons } from "@expo/vector-icons";

const BotttomTabs = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: appTheme.secondary,
        tabBarInactiveTintColor: appTheme.shades500,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: () => (
            <GenericText size={12} weight="light" content="Home" />
          ),
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          headerShown: false,
          tabBarLabel: () => (
            <GenericText size={12} weight="light" content="Groups" />
          ),
          tabBarIcon: ({ color }) => (
            <Octicons name="stack" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="liked"
        options={{
          headerShown: false,
          tabBarLabel: () => (
            <GenericText size={12} weight="light" content="Liked" />
          ),
          tabBarIcon: ({ color }) => (
            <Octicons name="heart" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default BotttomTabs;
