import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const Input = ({ value, onChangeText, placeholder, secureTextEntry, keyboardType, label }) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
        backgroundColor="#290066"
        
        //  placeholderTextFont='Marimpa'
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
  label: {
    marginBottom: 4,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Marimpa',
  },
  input: {
    height: 40,
    borderColor: '#aaa',
    // borderWidth: 1,
    // borderRadius: 6,

    paddingHorizontal: 10,
    backgroundColor: '#fff',
        padding: 12,
    marginTop: 12,
    borderRadius: 8,
    width: 220,
    alignItems: 'center',
    // borderRadius: 8,
    borderWidth: 2,
    borderColor: '#402f27',
    borderStyle: 'dashed',
    // fontFamily: 'Marimpa',
  },
});

export default Input;
