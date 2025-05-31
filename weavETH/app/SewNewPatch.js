import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import ConnectWalletButton from '@/components/connectWalletButton';
import SetGreetingButton from '@/components/setGreetingsButton';
import IncrementCounterButton from '@/components/incrementCounterButton';
import InviteFriendButton from '@/components/inviteAFriend';
import ShowCollectionButton from '@/components/showCollectionButton';
import { ethers } from 'ethers';
import Input from '@/components/input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import styles from './styles';
import { useNavigation } from 'expo-router';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';


export default function SewNewPatch() {
  const [initImageUri, setInitImageUri] = useState(null);
  const [styleImageUri, setStyleImageUri] = useState(null);
  const [prompt, setPrompt] = useState('embroidery style, fabric texture, detailed stitching');
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
//   const styleImage = require('./assets/textures/texture.jpg');

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
        console.log('Init image selected:', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking init image:', error);
      Alert.alert('Error', 'Failed to pick initial image');
    }
  };


  const generateImage = async () => {
    if (!initImageUri || !styleImageUri || !prompt.trim()) {
      Alert.alert('Missing Input', 'Please select both images and enter a prompt');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      formData.append('init_image', {
        uri: initImageUri,
        type: 'image/jpeg',
        name: 'init_image.jpg',
      });

      
      formData.append('style_image', {
        uri: 'file:///../assets/textures/texture.PNG', 
        type: 'image/jpeg',
        name: 'style_image.jpg',
      });

      formData.append('prompt', prompt);
      formData.append('output_format', 'jpeg');
      formData.append('cfg_scale', '7');
      formData.append('mode', 'image-to-image');
      formData.append('strength', '0.6');

      // Text prompts array
      formData.append('text_prompts', JSON.stringify([
        { text: prompt, weight: 1 }
      ]));

      const response = await fetch('https://api.stability.ai/v2beta/stable-image/control/style-transfer', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sk-vU876F0koe0GH1ZyBWRlyb3uIOblqJJkG5ZAxueOOZtqfga7',
          'Accept': 'image/*',
        },
        body: formData,
      });

      if (response.ok) {
        const imageBlob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setResultUrl(reader.result);
          console.log('Image generated successfully');
        };
        reader.readAsDataURL(imageBlob);
      } else {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        Alert.alert('Error', `Failed to generate image: ${response.status}`);
      }
    } catch (err) {
      console.error('Network error:', err);
      Alert.alert('Error', 'Network error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('./../assets/sprites/bg.png')}
      style={localStyles.container}
      resizeMode="cover"
    >
    <Text style={styles.title}>Knit memory</Text>

        <TouchableOpacity
        style={styles.onlyButton}
        onPress={pickInitImage} 
      >
        <Text style={styles.onlyButtonText}>Choose image</Text>
      </TouchableOpacity>
      
      {initImageUri && (
        <Image source={{ uri: initImageUri }} style={styles.preview} />
      )}
      
      <TextInput
        placeholder="Scrivi il prompt"
        style={styles.input}
        value={prompt}
        onChangeText={setPrompt}
        multiline
      />
    <TouchableOpacity
        style={styles.onlyButton}
        onPress={generateImage} 
      >
        <Text style={styles.onlyButtonText}>Knit...</Text>
      </TouchableOpacity>

{loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Generating embroidery-style image...</Text>
        </View>
      )}

      {resultUrl && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Risultato:</Text>
          <Image
            source={{ uri: resultUrl }}
            style={styles.result}
          />
        </View>
      )}
    {/* </ScrollView> */}
        
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'Marimpa',
  },
});
