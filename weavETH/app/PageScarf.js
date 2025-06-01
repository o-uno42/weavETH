import { StyleSheet, Text, View } from "react-native";
import Scarf from "../scarf.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";  // Importa ImageBackground
import styles from './styles.js';  // Assicurati di avere un file styles.js con gli stili definiti
import ButtonGoBack from "../components/backButton.js";
import SpecificScarf from "../specificScarf.js";
import React from "react";
import { Image } from "react-native";  // Importa Image
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
      
      <View style={localStyles.containerIcons}>
        <TouchableOpacity onPress={() => navigation.navigate('Milestones')}>
          <Image
            style={localStyles.buttonIcon}
            source={require("../assets/sprites/achivement.png")}
            />
        </TouchableOpacity>
      <TouchableOpacity
        style={localStyles.onlyButtonSew}
        onPress={() => navigation.navigate('SewNewPatch')}
        >
        <Text style={localStyles.onlyButtonTextSew}>Sew new{'\n'} memory</Text>
      </TouchableOpacity>
        </View>
      </View>
      <ButtonGoBack/>
    </ImageBackground>
  );
}


const localStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 20,
  },
  title: {
    zIndex: 1,
    position: "absolute",
    fontSize: 40,
    top: 40,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    // color: '#fff',
    fontFamily: "Marimpa",
  },
  containerIcons:{
    flexDirection: "row",
    // justifyContent: "space-around",
    alignItems: "center",
    gap: 30,
    marginBottom: 60,
    marginRight:5,
    // width: "100%",
    

    // marginBottom: 0,
  },
  onlyButtonSew:{
        backgroundColor: '#7057a9',
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#402f27',
    borderStyle: 'dashed',
    // marginBottom: 16,
    // width: 220,
    alignItems: 'center',
  },
    onlyButtonTextSew: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 25,
    fontFamily: 'Marimpa',
  },

  buttonIcon:{
    // scale: 0.8,
    
    // width: screenWidth * 0.9,
    // height: screenWidth * 0.15,
    // marginRight: 200,
    width: 110,
    height: 110,
    marginBottom:0,
  },
  
});
