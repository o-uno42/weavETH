import { StyleSheet, Text, View, Image } from "react-native";
import Scarf from "../scarf.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";  // Importa ImageBackground
import styles from './styles.js';  // Assicurati di avere un file styles.js con gli stili definiti
import ButtonGoBack from "../components/backButton.js";
import About from "./About.js";
import 'react-native-reanimated';
import React from 'react';
import ButtonsHome from "../components/buttonsHome.js"; // Importa il componente ButtonsHome
// import { Image } from "react-native-web";

import { Dimensions } from 'react-native'; // Importa Dimensions per ottenere la larghezza dello schermo
const screenWidth = Dimensions.get('window').width; // Ottieni la larghezza dello schermo
const screenHeight = Dimensions.get('window').height; // Ottieni l'altezza dello schermo


const buttonImage = require('./../assets/sprites/button.png');
export default function Index() {
  const navigation = useNavigation(); 

  

  return (
    <ImageBackground
      source={require('./../assets/sprites/home.png')}
      style={styles.container}
      // style={{ width: 400 }}
      resizeMode="cover"
    >
      <View style={localStyle.maincontainer}>
  <View style={localStyle.mainTitleContainer}>
    <Text style={localStyle.mainTitle}>tightKnit</Text>
  </View>
  <View style={localStyle.mainSubtitleContainer}>
    <Text style={localStyle.mainSubtitle}>knitted people</Text>
  </View>
</View>
    {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ConnectWalletPage')}  
        >
          <Text style={styles.onlyButtonText}>Start</Text>
        </TouchableOpacity> */}

      <ButtonsHome />

    </ImageBackground>
  );
}

const localStyle = StyleSheet.create({
  // const localStyle = StyleSheet.create({
  maincontainer: {
  // width: 's100%',
  marginTop: screenHeight * 0.37,  // pushes title down
  paddingRight: screenWidth * 0.17, // creates space from the right edge
  alignItems: 'flex-end', // aligns content (text) to the right
},

mainTitleContainer: {
  // no need for flex or position
},

mainSubtitleContainer: {
  marginTop: 5, // space under title
},

mainTitle: {
  fontSize: 50,
  fontWeight: 'bold',
  color: '#fff',
  textAlign: 'right',
  fontFamily: 'Marimpa',
},

mainSubtitle: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#fff',
  textAlign: 'right',
  fontFamily: 'Marimpa',
}

});

// });
