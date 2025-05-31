import React, { useRef, useEffect } from 'react';
import { FlatList, Image, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const images = [
  { id: '1', src: require('./assets/1.jpg'), targetScreen: 'ScarfInfoPage' },
  { id: '2', src: require('./assets/2.jpg'), targetScreen: 'ScarfInfoPage' },
  { id: '3', src: require('./assets/3.jpg'), targetScreen: 'ScarfInfoPage' },
];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const imageSize = screenWidth * 0.6;

const totalContentHeight = (imageSize + 20) * images.length;
const scrollToShowEndAtMiddle = totalContentHeight - (screenHeight / 2);

export default function Scarf() {
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: scrollToShowEndAtMiddle,
        animated: false,
      });
    }, 100);
  }, []);

  const onPressImage = (targetScreen) => {
    navigation.navigate(targetScreen);
  };

  return (
    <FlatList
      ref={flatListRef}
      style={styles.container}
      data={images}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      bounces={false}
      alwaysBounceVertical={false}
      overScrollMode="never"
      scrollEventThrottle={16}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPressImage(item.targetScreen)}
          style={{ alignItems: 'center' }}
        >
          <Image
            source={item.src}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => (
        <View style={styles.separator} >
          <Image
          pointerEvents="none"

            source={require('./assets/sprites/threads.png')}
            style={styles.thread}
            resizeMode="contain"
          />
        </View>
      )}
      ListFooterComponent={() => (
        <View style={styles.separator}>
          <Image
          pointerEvents="none"
            source={require('./assets/sprites/threads.png')}
            style={styles.thread}
            resizeMode="contain"
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
  },
  contentContainer: {
    paddingBottom: screenHeight - screenHeight / 2.2,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 10,
    marginBottom: 20,
  },
  separator: {
    height: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: -10,
    marginBottom: -10,
  },
  thread: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    position: 'absolute',
    top: -screenWidth * 0.31,
    zIndex: 10,
  },
});
