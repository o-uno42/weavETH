import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";
import ConnectWalletButton from "@/components/connectWalletButton";
// import SetGreetingButton from "@/components/setGreetingsButton";
// import IncrementCounterButton from "@/components/incrementCounterButton";
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
import ButtonGoBack from "../components/backButton";
// import * as FileSystem from 'expo-file-system';
// import { useNavigation } from 'expo-router';
//

const styleImage = Image.resolveAssetSource(
  require("../assets/textures/texture.png")
);

export default function SewNewPatch() {
  const [initImageUri, setInitImageUri] = useState(null);
  const [styleImageUri, setStyleImageUri] = useState(null);
  const [prompt, setPrompt] = useState(
    "embroidery style, fabric texture, detailed stitching"
  );
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (resultUrl) {
      setIsReady(true);
    }
  }, [resultUrl]);

  useEffect(() => {
    setIsReady(false);
  }, [initImageUri, prompt]);

  const pickInitImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled) {
        setInitImageUri(result.assets[0].uri);
        console.log("Init image selected:", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking init image:", error);
      Alert.alert("Error", "Failed to pick initial image");
    }
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus.status !== "granted") {
        Alert.alert(
          "Permission required",
          "Camera access is needed to take pictures."
        );
      }
    })();
  }, []);

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled) {
        setInitImageUri(result.assets[0].uri);
        console.log("Photo taken:", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const getStyleImageFileUri = async () => {
    const asset = Asset.fromModule(styleImage);
    await asset.downloadAsync();

    const dest = `${FileSystem.cacheDirectory}texture.jpg`;

    await FileSystem.copyAsync({
      from: asset.localUri,
      to: dest,
    });

    return dest;
  };

  const generateImage = async () => {
    if (!initImageUri || !prompt.trim()) {
      Alert.alert("Missing memory", "Please select an image or take a picture");
      return;
    }

    setLoading(true);

    try {
      const styleImageUri = await getStyleImageFileUri();

      const formData = new FormData();

      formData.append("init_image", {
        uri: initImageUri,
        type: "image/jpeg",
        name: "init_image.jpg",
      });

      formData.append("style_image", {
        uri: styleImageUri,
        type: "image/jpeg",
        name: "style_image.jpg",
      });

      formData.append("prompt", prompt);
      formData.append("output_format", "jpeg");
      formData.append("cfg_scale", "7");
      formData.append("mode", "image-to-image");
      formData.append("strength", "0.6");
      formData.append(
        "text_prompts",
        JSON.stringify([{ text: prompt, weight: 1 }])
      );

      const response = await fetch(
        "https://api.stability.ai/v2beta/stable-image/control/style-transfer",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer ...", // usa un env var qui idealmente
            Accept: "image/*",
          },
          body: formData,
        }
      );

      if (response.ok) {
        const imageBlob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setResultUrl(reader.result);
        };
        reader.readAsDataURL(imageBlob);
      } else {
        const errorText = await response.text();
        Alert.alert(
          "Error",
          `Failed to generate image: ${response.status}\n${errorText}`
        );
      }
    } catch (err) {
      Alert.alert("Error", "Network or file error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("./../assets/sprites/bg.png")}
      style={localStyles.container}
      resizeMode="cover"
    >
      <ButtonGoBack />
      {/* <Text style={localStyles.title}>Knit memory</Text> */}
      <ScrollView
        contentContainerStyle={localStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.onlyButton} onPress={takePhoto}>
          <Text style={styles.onlyButtonText}>Take a picture</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.onlyButton} onPress={pickInitImage}>
          <Text style={styles.onlyButtonText}>Choose image</Text>
        </TouchableOpacity>

        {initImageUri && (
          <Image source={{ uri: initImageUri }} style={styles.preview} />
        )}

        <TouchableOpacity style={styles.onlyButton} onPress={generateImage}>
          <Text style={styles.onlyButtonText}>Knit...</Text>
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
        )}

        <TouchableOpacity
          style={[styles.onlyButton, !isReady && styles.disabledButton]}
          onPress={() => {
            if (isReady) {
              navigation.navigate("PageScarf");
            }
          }}
          disabled={!isReady}
        >
          <Text style={styles.onlyButtonText}>Sew to scarf</Text>
        </TouchableOpacity>
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
});
