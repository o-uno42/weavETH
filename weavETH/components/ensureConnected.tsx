import { Alert } from 'react-native';

type Props = {
  isConnected: boolean;
  provider: any;
  open: () => Promise<void>;
};

export const ensureConnected = async ({ isConnected, open }: Props): Promise<boolean> => {
  if (!isConnected) {
    try {
      await open();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      Alert.alert('Connection Error', 'Failed to connect to the wallet. Please try again.');
      return false;
    }
  }
  return true;
};
