// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="MainPage" options={{ title: "MainPage" }} />
      <Tabs.Screen name="Scanner" options={{ title: "Scanner" }} />
    </Tabs>
  );
}
