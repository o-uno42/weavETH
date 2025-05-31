import React, { useState } from 'react';
import {
  View,
  Button,
  Image,
  ActivityIndicator,
  Alert,
  Text,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
// import { LIGHTHOUSE_API_KEY } from '@env';

const LIGHTHOUSE_API_KEY = 'c1ad2665.7229e64e419442beb8e01d6cb6e73d79';

const UploadToFilecoinButton = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickAndUpload = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission denied',
          'App needs access to your media library to upload files.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        quality: 1,
        allowsEditing: true,
        selectionLimit: 1,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) return;

      const uri = result.assets[0].uri;
      setImageUri(uri);

      await uploadToLighthouse(uri);
    } catch (error) {
      console.error('Image selection error:', error);
      Alert.alert('Error', 'An error occurred while selecting the image.');
    }
  };



  const uploadToLighthouse = async (uri: string) => {
    if (!LIGHTHOUSE_API_KEY) {
      Alert.alert('Error', 'API key is missing.');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', {
        uri,
        name: 'upload.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await axios.post(
        'https://node.lighthouse.storage/api/v0/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${LIGHTHOUSE_API_KEY}`,
          },
        }
      );

      const returnedCid = response.data.Hash;
      setCid(returnedCid);
      Alert.alert('Upload Success!', `CID: ${returnedCid}`);
      console.log('✅ CID:', returnedCid);
      setImageUri(null); 
      //await checkFilecoinStatus(returnedCid);
    } catch (error: any) {
      console.error('Upload failed:', error);
      Alert.alert('Upload Failed', error.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Button title="Upload Image to Filecoin" onPress={pickAndUpload} />
      {loading && <ActivityIndicator size="large" style={{ marginTop: 10 }} />}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {cid && (
        <Text style={styles.cid}>
          CID: {cid}
          {'\n'}
          Access: https://ipfs.io/ipfs/{cid}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginTop: 24, alignItems: 'center' },
  image: { width: 200, height: 200, marginTop: 10, borderRadius: 10 },
  cid: { marginTop: 10, fontSize: 12, color: '#444', textAlign: 'center' },
});

export default UploadToFilecoinButton;
