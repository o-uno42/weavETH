import { StyleSheet, Text, View } from "react-native";
import Scarf from "../scarf.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";  // Importa ImageBackground
import styles from './styles.js';  // Assicurati di avere un file styles.js con gli stili definiti
import ButtonGoBack from "../components/backButton.js";
import About from "./About.js";
import 'react-native-reanimated';
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import React, { useEffect } from 'react';


export default function Index() {
  const navigation = useNavigation();
  const { client, isConnected } = useWalletConnectModal();

  useEffect(() => {
    const clearSessionsAndPairings = async () => {
      if (!client || !isConnected) return;
  
      const sessions = client.session.getAll();
      for (const session of sessions) {
        await client.session.delete({
          topic: session.topic,
          reason: { code: 6001, message: 'Session cleared on startup' },
        });
      }
  
      const pairings = client.pairing.getAll();
      for (const pairing of pairings) {
        if (!pairing.active) {
          await client.pairing.delete({
            topic: pairing.topic,
            reason: { code: 6000, message: 'Inactive pairing removed' },
          });
        }
      }
    };
  
    clearSessionsAndPairings();
  }, [client, isConnected]);
  
  


  return (
    <ImageBackground
      source={require('./../assets/sprites/home.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.containerForButtonsHome}>
      <TouchableOpacity
  style={styles.button}
  onPress={async () => {
    if (isConnected && client) {
      // Clear active sessions
      const sessions = client.session.getAll();
      for (const session of sessions) {
        await client.session.delete({
          topic: session.topic,
          reason: { code: 6002, message: 'Manually cleared on reconnect' },
        });
      }

      // Optional: Clear inactive pairings too
      const pairings = client.pairing.getAll();
      for (const pairing of pairings) {
        if (!pairing.active) {
          await client.pairing.delete({
            topic: pairing.topic,
            reason: { code: 6000, message: 'Inactive pairing removed' },
          });
        }
      }
    }

    navigation.navigate('ConnectWalletPage');
  }}
>
  <Text style={styles.onlyButtonText}>Start</Text>
</TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ConnectWalletPage')}  
        >
          <Text style={styles.onlyButtonText}>Start</Text>
        </TouchableOpacity> */}
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
