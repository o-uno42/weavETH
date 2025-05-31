import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ButtonGoBack() {
  const navigation = useNavigation();

  return (
    <Button
      title="<-"
      onPress={() => navigation.goBack()}
    />
  );
}
