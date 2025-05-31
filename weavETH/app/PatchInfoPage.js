import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";
import ConnectWalletButton from "@/components/connectWalletButton";
import SetGreetingButton from "@/components/setGreetingsButton";
import IncrementCounterButton from "@/components/incrementCounterButton";
import InviteFriendButton from "@/components/acceptInviteAFriend";
import ShowCollectionButton from "@/components/showCollectionButton";
import { ethers } from "ethers";
import Input from "@/components/input";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import styles from "./styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Image } from "react-native";
import { useNavigation } from "expo-router";
const projectID = "2539ce9d2ee10ddd1360a0f36ee741de";

const imageSource = require("./../assets/1.jpg"); // test

export default function PatchInfoPage() {
  //va passato l'nft nested
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("./../assets/sprites/bg.png")}
      style={localStyles.container}
      resizeMode="cover"
    >
      <View style={{ padding: 20, alignItems: "center" }}>
        <Image source={imageSource} style={localStyles.image} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PageScarf")}
        >
          <Text style={styles.buttonText}>Send request</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "Marimpa",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
});
