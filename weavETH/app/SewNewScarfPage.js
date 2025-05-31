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
import ButtonGoBack from '../components/backButton';

const projectID = '2539ce9d2ee10ddd1360a0f36ee741de';

const providerMetadata = {
  name: 'Project Name',
  description: 'Project Description',
  url: 'https://example.com',
  icons: ['https://example.com/icon.png'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

export default function SewNewScarf() {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const { open, isConnected, address, provider } = useWalletConnectModal();
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    const fetchChainId = async () => {
      if (provider) {
        try {
          const web3Provider = new ethers.providers.Web3Provider(provider);
          const network = await web3Provider.getNetwork();
          setChainId(network.chainId);
          console.log('Chain ID:', network.chainId);
        } catch (error) {
          console.error('Failed to get chain ID:', error);
        }
      }
    };
    fetchChainId();
  }, [provider]);

  return (
    <ImageBackground
      source={require('./../assets/sprites/bg.png')}
      style={localStyles.container}
      resizeMode="cover"
    >
        <ButtonGoBack />
      <View style={{ padding: 20 }}>
        <Input
          label="Start stitching memories with..."
          value={text}
          onChangeText={setText}
          placeholder="(their wallet address)"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PageScarf')}
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
