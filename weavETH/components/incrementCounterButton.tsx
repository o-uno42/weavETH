

import { Pressable, Text, Alert, StyleSheet } from 'react-native';
import React from 'react';
import { getCounterContract } from '@/hooks/ethers';
import { ensureConnected } from './ensureConnected';

type Props = {
  isConnected: boolean;
  open: () => Promise<void>;
  provider: any;
  address: string | null;
  chainId: number | null;
};

export default function IncrementCounterButton({ isConnected, open, provider, address, chainId }: Props) {
  const handleIncrement = async () => {
    if (!(await ensureConnected({isConnected, open}))) { return;}
    console.log('Setting greeting for address:', address, 'on chain:', chainId);
    try {
      const counterContract = getCounterContract(provider, chainId);
      const tx = await counterContract.increment();
      await tx.wait();
      Alert.alert('Success', 'Counter incremented successfully!');
    } catch (error) {
      console.error('Error incrementing counter:', error);
      Alert.alert('Error', 'Failed to increment counter. Please try again.');
    }
  };

  return (
    <Pressable onPress={handleIncrement} style={styles.button}>
      <Text style={styles.buttonText}>Increment Counter</Text>
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
