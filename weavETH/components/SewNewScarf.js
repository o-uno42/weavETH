import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SewNewScarfButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={() => navigation.navigate('SewNewScarfPage')}
    >
      <Text style={styles.buttonText}>Begin a new scarf</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7057a9',
    padding: 12,
    marginBottom: 40,
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

export default SewNewScarfButton;
