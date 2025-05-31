import { ImageBackground, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Marimpa: require('../assets/fonts/Marimpa.otf'),
  });

  if (!fontsLoaded) {
    return null; // o uno splash screen
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
