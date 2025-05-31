import { Pressable, Text, StyleSheet } from 'react-native';
import React from 'react';

type Props = {
  isConnected: boolean;
  provider: any;
  open: () => Promise<void>;
};

export default function ConnectWalletButton({ isConnected, provider, open }: Props) {
  const handleButtonPress = async () => {
    console.log('Connect Wallet pressed');
    if (!provider) {
      console.warn('WalletConnect provider not available');
      return;
    }
    if (isConnected) {
      await provider.disconnect();
    } else {
      await open();
    }
  };

  return (
    <Pressable onPress={handleButtonPress} style={styles.connectButton}>
      <Text style={styles.connectButtonText}>
        {isConnected ? 'Disconnect' : 'Connect Wallet'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  connectButton: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: 220,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
