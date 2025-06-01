import { StyleSheet, View, Text } from 'react-native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import ConnectWalletButton from '@/components/connectWalletButton';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ImageBackground } from 'react-native';
import AcceptInviteFriendButton from '@/components/acceptInviteAFriend';
import ShowCollectionButton from '@/components/showCollectionButton';
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

export default function HomeScreen() {
  const { client } = useWalletConnectModal();
  const { open, isConnected, address, provider } = useWalletConnectModal();
  const [chainId, setChainId] = useState<number | null>(null);

  
  useEffect(() => {
    const clearSessionsAndPairings = async () => {
      if (!client) return;
  
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
  }, [client]);
  useEffect(() => {
    const fetchChainId = async () => {
      if (provider && isConnected) {
        try {
          const web3Provider = new ethers.providers.Web3Provider(provider);
          const network = await web3Provider.getNetwork();
          setChainId(network.chainId);
          console.log('Chain IDDD:', network.chainId);
        } catch (error) {
          console.error('Failed to get chain ID:', error);
        }
      } else {
        console.log('Provider not ready or not connected');
      }
    };
    fetchChainId();
  }, [provider, isConnected]);

  return (
        <ImageBackground
          source={require('./../assets/sprites/bg.png')}  // o uri per immagini remote
          style={styles.container}
          resizeMode="cover"  // opzioni: cover, contain, stretch, repeat
        >
      <Text style={styles.heading}>Start knitting!</Text>
    <View style={styles.container}>
      <Text>{isConnected ? address : '(no wallet connected)'}</Text>

      <ConnectWalletButton 
        isConnected={isConnected} 
        provider={provider} 
        open={open} 
      />

      <WalletConnectModal
        explorerRecommendedWalletIds={[
          'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        ]}
        explorerExcludedWalletIds="ALL"
        projectId={projectID}
        providerMetadata={providerMetadata}
      />

      <AcceptInviteFriendButton
        provider={provider}
        address={address}
        isConnected={isConnected}
        chainId={chainId}
        open={open}
      />
      {isConnected && <ShowCollectionButton/>}

      

    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    padding: 24,
  },
  heading: {
     marginTop: 40,
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'Marimpa',
        // fontFamily: "Marimpa",
    color: "#ffffff",
    // fontFamily: "Marimpa",
    // fontSize: 16,
    // lineHeight: 20,
    // textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});