import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageScarft from './app/PageScarf';
import ShowCollection from './app/ShowCollection';
import PatchInfoPage from './app/PatchInfoPage';
import SewNewPatch from './app/SewNewPatch';
import Index from './app/index.js';
import ConnectWalletPage from './app/ConnectWalletPage';
import About from './app/About';
// import PageSocks from './app/PageSocks';
import Milestones from './app/Milestones';



const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="ConnectWalletPage" component={ConnectWalletPage} />
      <Stack.Screen name="PageScarft" component={PageScarft} />
      <Stack.Screen name="ShowCollection" component={ShowCollection} />
      <Stack.Screen name="PatchInfoPage" component={PatchInfoPage} />
      <Stack.Screen name="SewNewPatch" component={SewNewPatch} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Milestones" component={Milestones} />
    </Stack.Navigator>
  );
}
