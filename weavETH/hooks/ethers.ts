import { ethers } from 'ethers';
import { MEMORYTOKENS_ABI } from '@/constants/MemoryTokens_ABI';
import { SCARF_BANK_ABI } from '@/constants/ScarfBank_ABI';
import { CONTRACT_ADDRESSES_BY_CHAIN} from '@/constants/addresses';

export const getWeb3Provider = (walletProvider: any) => {
    if (!walletProvider) {
        throw new Error('Wallet provider is not defined');
    }
    console.log('ethers.providers:', ethers.providers);
    return new ethers.providers.Web3Provider(walletProvider);
};

export const getSigner = (walletProvider: any) => {
    return getWeb3Provider(walletProvider).getSigner();
};


export const getScarfBankContract = (walletProvider: any, chainId: number) => {
  const signer = getSigner(walletProvider);
  const scarfBankAddress = CONTRACT_ADDRESSES_BY_CHAIN[chainId]?.SCARFBANK_ADDRESS;
  if (!scarfBankAddress || !ethers.utils.isAddress(scarfBankAddress)) {
      throw new Error(`Invalid or missing ScarfBank address for chainId ${chainId}`);
  }
  console.log('ScarfBank address:', scarfBankAddress);
  console.log('chainId:', chainId);
  return new ethers.Contract(scarfBankAddress, SCARF_BANK_ABI, signer);
};

export const getMemoryTokensContract = (walletProvider: any, chainId: number) => {
  const signer = getSigner(walletProvider);
  const memoryTokensAddress = CONTRACT_ADDRESSES_BY_CHAIN[chainId]?.MEMORYTOKENS_ADDRESS;
  if (!memoryTokensAddress || !ethers.utils.isAddress(memoryTokensAddress)) {
      throw new Error(`Invalid or missing MemoryTokens address for chainId ${chainId}`);
  }
  console.log('MemoryTokens address:', memoryTokensAddress);
  console.log('chainId:', chainId);
  return new ethers.Contract(memoryTokensAddress, MEMORYTOKENS_ABI, signer);
};