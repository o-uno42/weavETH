


import { Pressable, Text, Alert, StyleSheet } from 'react-native';
import React from 'react';
import { getGreeterContract } from '@/hooks/ethers';
import { ensureConnected } from './ensureConnected';

type Props = {
  isConnected: boolean;
  open: () => Promise<void>;
  provider: any;
  address: string | null;
  chainId: number | null;
};

export default function SetGreetingButton({ isConnected, open, provider, address ,chainId }: Props) {
  const handleSetGreeting = async () => {
    if (!(await ensureConnected({isConnected, open}))) { return; }
    console.log('Setting greeting for address:', address, 'on chain:', chainId);
    try {
      const greeterContract = getGreeterContract(provider, chainId);
      const tx = await greeterContract.setGreeting('Hell YEAH!');
      await tx.wait();
      Alert.alert('Success', 'Greeting set successfully!');
    } catch (error) {
      console.error('Error setting greeting:', error);
      Alert.alert('Error', 'Failed to set greeting. Please try again.');
    }
  };

  return (
    <Pressable onPress={handleSetGreeting} style={styles.button}>
      <Text style={styles.buttonText}>Set Greeting</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1E90FF',
    padding: 12,
    marginTop: 12,
    borderRadius: 8,
    width: 220,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
