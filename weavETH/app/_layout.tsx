import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

export default function Layout() {
    const [fontsLoaded] = useFonts({
    Marimpa: require('../assets/fonts/Marimpa.otf'), // <-- Assicurati che il path sia corretto
  });
  if (!fontsLoaded) {
  return null; // o uno splash screen
}
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack 
      screenOptions={{
        headerShown: false,
        contentStyle: { flex: 1 },
      }}/>
    </GestureHandlerRootView>
  );
}
