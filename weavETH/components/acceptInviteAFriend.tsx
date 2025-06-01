import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { ethers } from 'ethers';
import { getScarfBankContract } from '@/hooks/ethers';

type Props = {
  provider: any;
  address: string;
  isConnected: boolean;
  chainId: number | null;
  open: () => Promise<void>;
};

const InviteFriendButton: React.FC<Props> = ({
  provider,
  address,
  isConnected,
  chainId,
  open,
}) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAcceptInvite = async () => {
    if (!isConnected || !provider || chainId == null) {
      Alert.alert('Wallet not connected', 'Please connect your wallet first.');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Missing password', 'Please enter the password to accept the invite.');
      return;
    }

    setLoading(true);

    try {
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Wallet prompt timeout')), 5000)
      );

      const contractPromise = (async () => {
        const contract = getScarfBankContract(provider, chainId);
        const parsedPassword = ethers.BigNumber.from(password);

        // Dynamically fetch the price from the contract
        const price = await contract.priceSCARF();

        // Simulate execution to catch any reverts before prompting user
        try {
          await contract.callStatic.scarfCreation(parsedPassword, {
            value: price,
          });
        } catch (simError: any) {
          console.error('Simulation failed:', simError);
          throw new Error('Smart contract rejected your request. Possibly wrong password or proposal not found.');
        }

        // Send the actual transaction
        const tx = await contract.scarfCreation(parsedPassword, { value: price });
        Alert.alert('Please confirm', 'Check MetaMask to confirm the transaction.');
        await tx.wait();
        return 'success';
      })();

      const result = await Promise.race([contractPromise, timeout]);

      if (result === 'success') {
        Alert.alert('Congratulations!', 'You have successfully accepted the invite.');
      }
    } catch (error: any) {
      if (error.message === 'Wallet prompt timeout') {
        Alert.alert('No response', 'MetaMask did not respond in time. Please try again.');
      } else {
        Alert.alert('Transaction Reverted', error.message || 'Something went wrong.');
      }
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        keyboardType="default"
        style={styles.input}
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleAcceptInvite}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Processing...' : 'Accept Invite'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 210,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#7057a9',
    padding: 12,
    borderRadius: 8,
    width: 210,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#402f27',
    borderStyle: 'dashed',
  },
  buttonDisabled: {
    backgroundColor: '#a192b3',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Marimpa',
  },
});

export default InviteFriendButton;
