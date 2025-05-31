// import React from 'react';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-native';

import { SafeAreaView, View, FlatList, Text, StyleSheet, StatusBar } from 'react-native';
import styles from './styles.js';
import SplashScreen from 'expo-splash-screen';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';

import Scarf from '../scarf.js';

export default function Landing({navigation}) {
    const scarfsData = Array.from({ length: 5 }, (_, i) => ({ id: i.toString() }));

    return (
      <SafeAreaView style={styles.container}>
        {/* View container principale */}
        <View style={{ flex: 1 }}>
          <FlatList
            data={scarfsData}
            keyExtractor={(item) => item.id}
            horizontal={true}
            renderItem={({ item }) => 
              <View style={styles.itemWrapper}>
                <Scarf />
              </View>
            }
          />
        </View>
      </SafeAreaView>
    );
}