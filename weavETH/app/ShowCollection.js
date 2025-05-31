import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-native';
import { SafeAreaView, View, FlatList, Text, StyleSheet, StatusBar } from 'react-native';
import styles from './styles.js';
import SplashScreen from 'expo-splash-screen';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { ImageBackground } from 'react-native';  // Importa ImageBackground
import SewNewScarfButton from '../components/SewNewScarf.js';
import Scarf from '../scarf.js';
import ButtonGoBack from '../components/backButton.js';
import { transform } from 'typescript';
// import styles from './styles.js';

export default function ShowCollection() {
    const scarfsData = Array.from({ length: 5 }, (_, i) => ({ id: i.toString() }));

    return (
      <ImageBackground
        source={require('./../assets/sprites/bg.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
         <View style={localStyles.contentContainer}>
        <FlatList
          data={scarfsData}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={localStyles.flatListContent}
          renderItem={({ item }) => (
            <View style={localStyles.itemWrapper}>
              <Scarf />
            </View>
          )}
        />
      </View>
      <View style={localStyles.newcontainer}>
          <ButtonGoBack />
          <SewNewScarfButton />
          <View style={styles.notify}>

          <Text style={styles.text}>Swipe to see your scarfs -{'>'}</Text>

          </View>
        </View>
        </SafeAreaView>
      </ImageBackground>
    );
}

const localStyles = StyleSheet.create({
newcontainer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  alignItems: 'center',
  padding: 20,
},

  contentContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 0,  // aggiungi padding interno alla FlatList
    alignItems: 'center',
  },
  itemWrapper: {
    marginHorizontal: -40,   // margine tra gli elementi
  },
});
