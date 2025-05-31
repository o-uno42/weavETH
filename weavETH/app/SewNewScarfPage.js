import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { ethers } from 'ethers';
import Input from '@/components/input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { useNavigation } from 'expo-router';
import ButtonGoBack from '../components/backButton';
import { proposeScarf } from '../components/proposeScarf';

export default function SewNewScarf() {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const { open, isConnected, address, provider } = useWalletConnectModal();
  const [chainId, setChainId] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    const fetchChainId = async () => {
      if (provider && isConnected) {
        try {
          const web3Provider = new ethers.providers.Web3Provider(provider);
          const network = await web3Provider.getNetwork();
          setChainId(network.chainId);
          console.log('Chain ID:', network.chainId);
        } catch (error) {
          console.error('Failed to get chain ID:', error);
        }
      } else {
        console.log('Provider not ready or not connected');
      }
    };
    fetchChainId();
  }, [provider, isConnected]);

  const handleSendRequest = async () => {
    const result = await proposeScarf({
      isConnected,
      open,
      provider,
      address,
      chainId,
      coOwnerAddress: text,
    });

    if (result) {
      setPassword(result);
      navigation.navigate('PageScarf');
    }
  };

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
          style={[styles.button, !text && { opacity: 0.5 }]}
          onPress={handleSendRequest}
          disabled={!text}
        >
          <Text style={styles.buttonText}>Send request</Text>
        </TouchableOpacity>

        {password && (
          <View style={{ marginTop: 16 }}>
            <Text selectable style={{ fontWeight: 'bold', fontSize: 16 }}>
              Your Scarf Password: {password}
            </Text>
          </View>
        )}
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


// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Text, ImageBackground } from 'react-native';
// import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
// // import ConnectWalletButton from '@/components/connectWalletButton';
// // import SetGreetingButton from '@/components/setGreetingsButton';
// // import IncrementCounterButton from '@/components/incrementCounterButton';
// // import InviteFriendButton from '@/components/inviteAFriend';
// // import ShowCollectionButton from '@/components/showCollectionButton';
// import { ethers } from 'ethers';
// import Input from '@/components/input';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import styles from './styles';
// import { useNavigation } from 'expo-router';
// import ButtonGoBack from '../components/backButton';
// import {proposeScarf} from '../components/proposeScarf';


// export default function SewNewScarf() {
//   const navigation = useNavigation();
//   const [text, setText] = useState('');
//   const { open, isConnected, address, provider } = useWalletConnectModal();
//   const [chainId, setChainId] = useState(null);
//   const [password, setPassword] = useState(null);

//     useEffect(() => {
//       const fetchChainId = async () => {
//         if (provider && isConnected) {
//           try {
//             const web3Provider = new ethers.providers.Web3Provider(provider);
//             const network = await web3Provider.getNetwork();
//             setChainId(network.chainId);
//             console.log('Chain IDDD:', network.chainId);
//           } catch (error) {
//             console.error('Failed to get chain ID:', error);
//           }
//         } else {
//           console.log('Provider not ready or not connected');
//         }
//       };
//       fetchChainId();
//     }, [provider, isConnected]);

//     setPassword = proposeScarf(isConnected, open, provider, address, chainId, text);

//   return (
//     <ImageBackground
//       source={require('./../assets/sprites/bg.png')}
//       style={localStyles.container}
//       resizeMode="cover"
//     >
//         <ButtonGoBack />
//       <View style={{ padding: 20 }}>
//         <Input
//           label="Start stitching memories with..."
//           value={text}
//           onChangeText={setText}
//           placeholder="(their wallet address)"
//         />
//         <TouchableOpacity
//             style={[styles.button, !password && { opacity: 0.5 }]} // dim when disabled
//             onPress={() => {
//               if (password) {
//                 navigation.navigate('PageScarf');
//               } else {
//                 console.log('Password is null, navigation blocked.');
//               }
//             }}
//             disabled={!password}
//           >
//             <Text style={styles.buttonText}>Send request</Text>
//         </TouchableOpacity>

//         {password && (
//         <View style={{ marginTop: 16 }}>
//           <Text selectable style={{ fontWeight: 'bold', fontSize: 16 }}>
//             Your Scarf Password: {password}
//           </Text>
//         </View>
//       )}
//       </View>
//     </ImageBackground>
//   );
// }

// const localStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 24,
//   },
//   heading: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     fontFamily: 'Marimpa',
//   },
// });
