import { StyleSheet, Text, View } from "react-native";
import Scarf from "../scarf.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";  // Importa ImageBackground
import styles from './styles.js';  // Assicurati di avere un file styles.js con gli stili definiti
import ButtonGoBack from "../components/backButton.js";
import SpecificScarf from "../specificScarf.js";
// import SewNewPatch from "../components/SewNewPatch.js";  // Importa il componente SpecificScarf

export default function PageScarf() {
  const navigation = useNavigation(); 

  return (
    <ImageBackground
      source={require('./../assets/sprites/bg.png')}  // o uri per immagini remote
      style={styles.container}
      resizeMode="cover"  // opzioni: cover, contain, stretch, repeat
    >
      <View style={styles.containerForButtons}>
        <SpecificScarf />
        <TouchableOpacity
          style={styles.onlyButton}
          onPress={() => navigation.navigate('SewNewPatch')}
        >
          <Text style={styles.onlyButtonText}>Sew new memory</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
