import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../app/styles.js';

export default function ButtonGoBack() {
  const navigation = useNavigation();

  return (
<View   style={{position: 'absolute', bottom: 20, left: 20, zIndex: 1}}>
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
        >
            <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
        </View>
  );
}
