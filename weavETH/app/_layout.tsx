import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { ImageBackground, StyleSheet } from 'react-native';


export default function Layout() {
    const [fontsLoaded] = useFonts({
    Marimpa: require('../assets/fonts/Marimpa.otf'), // <-- Assicurati che il path sia corretto
  });
  if (!fontsLoaded) {
  return null; // o uno splash screen
}
  return (
    // <ImageBackground
    //       source={require('./../assets/sprites/bg.png')}
    //       style={localStyles.container}
    //       resizeMode="cover"
    //     >
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack 
      screenOptions={{
        headerShown: false,
        contentStyle: { flex: 1 },
      }}/>
    </GestureHandlerRootView>
    // </ImageBackground>
  );
}


const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // padding: 24,
  },
  // button: {
  //   marginTop: 20,
  //   backgroundColor: "#007AFF",
  //   padding: 10,
  //   borderRadius: 5,
  // },
  // buttonText: {
  //   color: "#fff",
  //   fontWeight: "bold",
  // },
});
