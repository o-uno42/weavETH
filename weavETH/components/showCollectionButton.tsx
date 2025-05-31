import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ShowCollectionButton: React.FC = () => {
  const navigation = useNavigation<any>(); // uso semplice, evita errori TS

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('ShowCollection')}
    >
      <Text style={styles.buttonText}>Show scarf collection</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7057a9',
    padding: 12,
    marginTop: 12,
    borderRadius: 8,
    width: 220,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#402f27',
    borderStyle: 'dashed',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Marimpa',
  },
});

export default ShowCollectionButton;
