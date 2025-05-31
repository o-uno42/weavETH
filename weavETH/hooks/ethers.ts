import { ethers } from 'ethers';
import { GREETER_ABI } from '@/constants/Greeter_ABI';
import { COUNTER_ABI } from '@/constants/Counter_ABI';
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

export const getGreeterContract = (walletProvider: any, chainId: number) => {
    const signer = getWeb3Provider(walletProvider).getSigner();
    const greeterAddress = CONTRACT_ADDRESSES_BY_CHAIN[chainId]?.GREETER_ADDRESS;
    if (!greeterAddress || !ethers.utils.isAddress(greeterAddress)) {
      throw new Error(`Invalid or missing Greeter address for chainId ${chainId}`);
    }
    console.log('Greeter address:', greeterAddress);
    console.log('chainId:', chainId);
    return new ethers.Contract(greeterAddress, GREETER_ABI, signer);
  };

export const getCounterContract = (walletProvider: any, chainId: number) => {
    const signer = getSigner(walletProvider);
    const counterAddress = CONTRACT_ADDRESSES_BY_CHAIN[chainId]?.COUNTER_ADDRESS;
    if (!counterAddress || !ethers.utils.isAddress(counterAddress)) {
      throw new Error(`Invalid or missing Counter address for chainId ${chainId}`);
    }
    console.log('Counter address:', counterAddress);
    console.log('chainId:', chainId);
    return new ethers.Contract(counterAddress, COUNTER_ABI, signer);
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