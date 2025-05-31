import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Scarf from './scarf';
import StackNavigator from './Navigator';
import 'react-native-gesture-handler';


export default function App() {
  const [fontsLoaded] = useFonts({
    Marimpa: require('./assets/fonts/Marimpa.otf'), // <-- Assicurati che il path sia corretto
  });
  if (!fontsLoaded) {
  return null; // o uno splash screen
}
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
              source={require('./../assets/sprites/bg.png')}
              style={styles.background}
              resizeMode="cover"
            >
      <StackNavigator />
      </ImageBackground>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
