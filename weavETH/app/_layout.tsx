import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';

export default function Layout() {
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
