import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageScarft from './app/PageScarf';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'slide_from_right',
      }}
    >
      {/* <Stack.Screen name="SplashScreen" component={SplashScreenAnimation} /> */}
      <Stack.Screen name="Page" component={Page} />
      <Stack.Screen name="PageScarft" component={PageScarft} />
      <StackScreen name="ShowCollection" component={ShowCollection} />
    </Stack.Navigator>
  );
}
