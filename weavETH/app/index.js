import { StyleSheet, Text, View } from "react-native";
import Scarf from "../scarf.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";  // Importa ImageBackground
import styles from './styles.js';  // Assicurati di avere un file styles.js con gli stili definiti
import ButtonGoBack from "../components/backButton.js";

export default function Page() {
  const navigation = useNavigation(); 

  return (
    <ImageBackground
      source={require('./../assets/sprites/bg.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.containerForButtons}>
        <TouchableOpacity
          style={styles.onlyButton}
          onPress={() => navigation.navigate('ConnectWalletPage')}  
        >
          <Text style={styles.onlyButtonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
