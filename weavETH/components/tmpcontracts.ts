// utils/proposeScarf.ts
import { ethers } from 'ethers';
import { Alert } from 'react-native';
import { getMemoryTokensContract, getScarfBankContract } from '@/hooks/ethers';
import { isAddress } from 'ethers/lib/utils';

//TODO receive ipfs uri 
const uri = 'https://ipfs.io/ipfs/QmY7Z5f8g1z9b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g';
//TODO get scarfID
const scarfId = 0;

type ProposePatches = {
  isConnected: boolean;
  open: () => Promise<void>;
  provider: any;
  address: string | null;
  chainId: number | null;
  coOwnerAddress: string;
};

export const mintMemoryToken = async ({
    isConnected,
    open,
    provider,
    address,
    chainId,
    coOwnerAddress,

}: ProposePatches): Promise<string | null> => {
    try{
        const priceMEM = 10000000000;
        const  memoryTokensContract = getMemoryTokensContract(provider, chainId);
        const mintMemory = await memoryTokensContract.mintMemory(uri, scarfId, {
            value: priceMEM,
        });
        await mintMemory.wait();

        Alert.alert('Success', `Patch sewn!`);
        return null;// generatedPassword;
    } catch (error){
        Alert.alert('Error', 'Failed to sew patch. Please try again.');
        return null;
    }
}
