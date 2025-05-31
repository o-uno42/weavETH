import { StyleSheet, Text, View } from "react-native";
import Scarf from "../scarf.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";  // Importa ImageBackground
import styles from './styles.js';  // Assicurati di avere un file styles.js con gli stili definiti
import ButtonGoBack from "../components/backButton.js";
import About from "./About.js";
import 'react-native-reanimated';


export default function Index() {
  const navigation = useNavigation(); 

  return (
    <ImageBackground
      source={require('./../assets/sprites/home.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.containerForButtonsHome}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ConnectWalletPage')}  
        >
          <Text style={styles.onlyButtonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('About')}
          >
          <Text style={styles.onlyButtonText}>About</Text>
          </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
