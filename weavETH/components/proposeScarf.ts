// utils/proposeScarf.ts
import { ethers } from 'ethers';
import { Alert } from 'react-native';
import { getScarfBankContract } from '@/hooks/ethers';

type ProposeScarfArgs = {
  isConnected: boolean;
  open: () => Promise<void>;
  provider: any;
  address: string | null;
  chainId: number | null;
  coOwnerAddress: string;
};

export const proposeScarf = async ({
  isConnected,
  open,
  provider,
  address,
  chainId,
  coOwnerAddress,
}: ProposeScarfArgs): Promise<string | null> => {
  if (!coOwnerAddress || !ethers.utils.isAddress(coOwnerAddress)) {
    Alert.alert('Invalid Address', 'Please enter a valid Ethereum address before proposing a scarf.');
    return null;
  }

  if (!isConnected) {
    await open();
    console.log('am i connected?');
    return null;
  }

  const generatedPassword = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const scarfContract = getScarfBankContract(provider, chainId);
    const tx = await scarfContract.proposeNewScarf(coOwnerAddress, generatedPassword, {
      value: ethers.utils.parseEther('0.001'),
    });

    await tx.wait();

    Alert.alert('Success', `Scarf proposed successfully!\nPassword: ${generatedPassword}`);
    return generatedPassword;
  } catch (error) {
    console.error('Error proposing scarf:', error);
    Alert.alert('Error', 'Failed to propose scarf. Please try again.');
    return null;
  }
};
