import { Pressable, Text, Alert, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getScarfBankContract } from '@/hooks/ethers';
import { ensureConnected } from './ensureConnected';

type Props = {
  isConnected: boolean;
  open: () => Promise<void>;
  provider: any;
  address: string | null;
  chainId: number | null;
};

export default function ProposeScarfButton({ isConnected, open, provider, address, chainId }: Props) {
  const [coOwnerAddress, setCoOwnerAddress] = useState('');
  const [password, setPassword] = useState<string | null>(null);

  const handleProposeScarf = async () => {
    if (!(await ensureConnected({ isConnected, open }))) {
      return;
    }

    if (!coOwnerAddress || !ethers.utils.isAddress(coOwnerAddress)) {
      Alert.alert('Invalid Address', 'Please enter a valid Ethereum address before proposing a scarf.');
      return;
    }

    console.log('Proposing scarf from address:', address, 'on chain:', chainId, 'for co-owner:', coOwnerAddress);
    const generatedPassword = Math.floor(100000 + Math.random() * 900000);
    console.log('Generated password:', generatedPassword);
    try {
      const scarfContract = getScarfBankContract(provider, chainId);
       // console.log('ScarfBank contract:', scarfContract);
      const tx = await scarfContract.proposeNewScarf(coOwnerAddress, generatedPassword,{
        value: ethers.utils.parseEther('0.001'),
      });
      console.log('ok');
      console.log('Transaction:', tx);
      await tx.wait();

      // to IMPLEMENT THIS  IN THE FUTURE IN ADDITION TO AUTHENTICATIONS AND VERIFICATIONS FOR SECURITY
      //const passwordHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(generatedPassword));

    //   const tx2 = await scarfContract.setScarfPassword(coOwnerAddress, passwordHash);
    //   await tx2.wait();

      Alert.alert('Success', `Scarf proposed successfully!\nPassword: ${generatedPassword}`);
      setPassword(generatedPassword.toString());
      setCoOwnerAddress('');
    } catch (error) {
      console.error('Error proposing scarf:', error);
      Alert.alert('Error', 'Failed to propose scarf. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter co-owner address"
        value={coOwnerAddress}
        onChangeText={setCoOwnerAddress}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Pressable onPress={handleProposeScarf} style={styles.button}>
        <Text style={styles.buttonText}>Propose Scarf</Text>
      </Pressable>

      {password && (
        <View style={{ marginTop: 16 }}>
          <Text selectable style={{ fontWeight: 'bold', fontSize: 16 }}>
            Your Scarf Password: {password}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});


// import { Pressable, Text, Alert, StyleSheet, TextInput, View } from 'react-native';
// import React, { useState } from 'react';
// import { ethers } from 'ethers';
// import { getScarfBankContract } from '@/hooks/ethers';
// import { ensureConnected } from './ensureConnected';

// type Props = {
//   isConnected: boolean;
//   open: () => Promise<void>;
//   provider: any;
//   address: string | null;
//   chainId: number | null;
// };

// export default function ProposeScarfButton({ isConnected, open, provider, address, chainId }: Props) {
//   const [coOwnerAddress, setCoOwnerAddress] = useState('');

//   const handleProposeScarf = async () => {
//     if (!(await ensureConnected({ isConnected, open }))) {
//       return;
//     }

//     if (!coOwnerAddress || !ethers.utils.isAddress(coOwnerAddress)) {
//       Alert.alert('Invalid Address', 'Please enter a valid Ethereum address before proposing a scarf.');
//       return;
//     }

//     console.log('Proposing scarf from address:', address, 'on chain:', chainId, 'for co-owner:', coOwnerAddress);
//     try {
//         console.log('address:', address);
//       const scarfContract = getScarfBankContract(provider, chainId);
//       //console.log('ScarfBank contract:', scarfContract);
//       const tx = await scarfContract.proposeNewScarf(coOwnerAddress, {
//         value: ethers.utils.parseEther('0.001'),
//       });
//         console.log('Transaction:', tx);
//       await tx.wait();
//       Alert.alert('Success', 'Scarf proposed successfully!');
//       setCoOwnerAddress('');
//     } catch (error) {
//       console.error('Error proposing scarf:', error);
//       Alert.alert('Error', 'Failed to propose scarf. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Enter co-owner address"
//         value={coOwnerAddress}
//         onChangeText={setCoOwnerAddress}
//         style={styles.input}
//         autoCapitalize="none"
//         autoCorrect={false}
//       />
//       <Pressable onPress={handleProposeScarf} style={styles.button}>
//         <Text style={styles.buttonText}>Propose Scarf</Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     marginTop: 12,
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     width: 280,
//     padding: 10,
//     marginBottom: 12,
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#8B008B',
//     padding: 12,
//     borderRadius: 8,
//     width: 220,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
// });
