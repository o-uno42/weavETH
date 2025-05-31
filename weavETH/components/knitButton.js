import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import styles from '../app/styles.js';

export default function KnitButton({ navigation }) {
    const buttonImage = require('./../assets/sprites/button.png');
    return (    
            <TouchableOpacity
          // style={styles.button}
          onPress={() => navigation.navigate('ConnectWalletPage')}  
        >
          <Image
            source={buttonImage}
            style={styles.imageButton}
          />
          <Text style={styles.text}>Start</Text>
        </TouchableOpacity>
    );
}