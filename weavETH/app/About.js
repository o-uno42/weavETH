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
import { useNavigation } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { Alert, ActivityIndicator } from "react-native"; // Aggiungi questi
import { ScrollView } from "react-native";
// import * as FileSystem from 'expo-file-system';
// import { useNavigation } from 'expo-router';
//

const styleImage = Image.resolveAssetSource(
  require("../assets/textures/texture.png")
);

export default function About() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("./../assets/sprites/about.png")}
      style={localStyles.container}
      resizeMode="cover"
    >
      <View style={{ position: "absolute", bottom: 20, left: 20, zIndex: 1 }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
      <Text style={localStyles.localTitle}>About</Text>
      <ScrollView
        contentContainerStyle={localStyles.containerTexts}
        showsVerticalScrollIndicator={false}
      >
        <Text style={localStyles.localText}>
          Our goal is to weave meaningful relationships on-chain, so that a
          trace of them may endure forever.
        </Text>
        <Text style={localStyles.localText}>
          TightKnit celebrates and emphasises human connections, reminding them
          that commitment must be mutual. .{" "}
        </Text>
        <Text style={localStyles.localText}>
          We hope to onboard new users to web3 by focusing on non-monetary
          aspects of it, in a user friendly way.{" "}
        </Text>
        <Text style={localStyles.localText}>
          Backend: Tjaz Juvan / Fullstack: Amir Eid /Frontend - and graphics:
          Petra Giorgi
        </Text>
        {/* 
        <TouchableOpacity
          style={styles.onlyButton}
          onPress={pickInitImage}
        >
          <Text style={styles.onlyButtonText}>Choose image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.onlyButton}
          onPress={takePhoto}
        >
          <Text style={styles.onlyButtonText}>Take a picture</Text>
        </TouchableOpacity>

        {initImageUri && (
          <Image source={{ uri: initImageUri }} style={styles.preview} />
        )}

        <TouchableOpacity
          style={styles.onlyButton}
          onPress={generateImage}
        >
          <Text style={styles.onlyButtonText}>Knit...</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.onlyButton}
          onPress={() => { navigation.navigate('PageScarf') }}
        >
          <Text style={styles.onlyButtonText}>Sew to scarf</Text>
        </TouchableOpacity>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Knitting...</Text>
          </View>
        )}

        {resultUrl && (
          <View style={styles.resultContainer}>
            <Image source={{ uri: resultUrl }} style={styles.result} />
          </View>
        )} */}
      </ScrollView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",

    padding: 20,
  },
  containerTexts: {
    top: 60,
    // flex: 1,
    // flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    padding: 20,
  },
  localText: {
    color: "3366ff",
    fontFamily: "Marimpa",
  },
  localTitle: {
    fontSize: 50,
    // fontWeight: 'bold',
    marginTop: 30,
    fontFamily: "Marimpa",
    color: "3366ff",
  },
});
