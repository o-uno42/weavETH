import { StyleSheet, Text, View } from "react-native";
import Scarf from "../scarf.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";  // Importa ImageBackground
import styles from './styles.js';  // Assicurati di avere un file styles.js con gli stili definiti
import ButtonGoBack from "../components/backButton.js";
import SpecificScarf from "../specificScarf.js";
import {Image} from "react-native";  // Importa Image
// import SewNewPatch from "../components/SewNewPatch.js";  // Importa il componente SpecificScarf

export default function Milestones() {
  const navigation = useNavigation(); 

  const images = [
  require('./../assets/sprites/sock.png'),
  require('./../assets/sprites/sock.png'),
  require('./../assets/sprites/sock.png'),

];
  return (
    <ImageBackground
      source={require('../assets/sprites/milestone.png')}  // o uri per immagini remote
      style={styles.container}
      resizeMode="cover"  // opzioni: cover, contain, stretch, repeat
    >
      <View style={localStyles.container}>
      {images.map((imgSrc, index) => (
        <Image
          key={index}
          source={imgSrc}
          style={localStyles.imageButtonAchivement}
        />
      ))}
    </View>
    <ButtonGoBack />
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({

    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,

    },
    imageButtonAchivement: {
    width: 150,
    height: 150,
    },
});


