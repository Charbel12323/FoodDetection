// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (

    
    <Tabs>
      <Tabs.Screen name="MainPage" options={{ title: "MainPage", headerShown: false}} />
      <Tabs.Screen name="Scanner" options={{ title: "Scanner", headerShown: false }} />
    </Tabs>
  );
}
