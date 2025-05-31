import { StyleSheet, Text, View } from "react-native";
import Scarf from "../scarf.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";  // Importa ImageBackground
import styles from './styles.js';  // Assicurati di avere un file styles.js con gli stili definiti
import ButtonGoBack from "../components/backButton.js";

export default function Page() {
  const navigation = useNavigation();  // <-- Aggiungi questa riga

  return (
      <ImageBackground
      source={require('./../assets/sprites/bg.png')}  // o uri per immagini remote
      style={styles.container}
      resizeMode="cover"  // opzioni: cover, contain, stretch, repeat
    >
      {/* <ButtonGoBack style={styles.backButton}/> */}
    <View style={styles.container}>
      <Scarf />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('ShowCollection')}  // Ora navigation è definito
      >
        <Text style={styles.buttonText}>Sew new memory</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     paddingBottom: 10,
//     // padding: 24,
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: "#007AFF",
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });
