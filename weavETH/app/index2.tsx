import ConnectWalletButton from '@/components/connectWalletButton';
import IncrementCounterButton from '@/components/incrementCounterButton';
import SetGreetingButton from '@/components/setGreetingsButton';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
  const { open, isConnected, address, provider } = useWalletConnectModal();
  const [chainId, setChainId] = useState<number | null>(null);
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
    <View style={styles.container}>
      <Text style={styles.heading}>Smart Contract Interaction</Text>
      <Text>{isConnected ? address : 'no wallet connected'}</Text>

      <ConnectWalletButton 
        isConnected={isConnected} 
        provider={provider} 
        open={open} 
      />
      <SetGreetingButton 
        isConnected={isConnected} 
        provider={provider} 
        open={open}
        address={address}
        chainId={chainId}
      />
      <IncrementCounterButton 
        isConnected={isConnected} 
        provider={provider} 
        open={open}
        address={address}
        chainId={chainId}
      />

      <WalletConnectModal
        explorerRecommendedWalletIds={[
          'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        ]}
        explorerExcludedWalletIds="ALL"
        projectId={projectID}
        providerMetadata={providerMetadata}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});