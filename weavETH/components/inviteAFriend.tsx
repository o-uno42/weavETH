import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const InviteFriendInput: React.FC<{ value: string; onChangeText: (text: string) => void }> = ({
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Invite a special person</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter their wallet address"
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    alignItems: 'flex-start',
  },
  label: {
    color: '#402f27',
    fontFamily: 'Marimpa',
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#402f27',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 12,
    width: 220,
    fontFamily: 'Marimpa',
    color: '#000',
  },
});

export default InviteFriendInput;
