import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const InviteFriendButton: React.FC = () => {
  const handlePress = () => {
    console.log('Button pressed!');
  };

  return (
    // <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Invite a special person</Text>
      </TouchableOpacity>
    // </View>
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
    // borderRadius: 8,
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

export default InviteFriendButton;
