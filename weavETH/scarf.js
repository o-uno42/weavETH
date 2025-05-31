import React, { useRef, useEffect } from 'react';
import { FlatList, Image, View, Dimensions, StyleSheet } from 'react-native';


const images = [
  { id: '1', src: require('./assets/1.jpg') },
  { id: '2', src: require('./assets/2.jpg') },
  { id: '3', src: require('./assets/3.jpg') },
];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const imageSize = screenWidth * 0.6;

// Calcola l'altezza totale del contenuto
const totalContentHeight = (imageSize + 20) * images.length; // altezza immagini + margini
// Calcola quanto scrollare per avere la fine a metà schermo
const scrollToShowEndAtMiddle = totalContentHeight - (screenHeight / 2);

export default function Scarf() {
  const flatListRef = useRef(null);

  useEffect(() => {
    // Scrolla alla posizione desiderata dopo che il componente è montato
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: scrollToShowEndAtMiddle,
        animated: false,
      });
    }, 100);
  }, []);

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
      renderItem={({ item, }) => (
        <Image
          source={item.src}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      ItemSeparatorComponent={() => (
        <View style={styles.separator}>
          <Image
            source={require('./assets/threads.png')}
            style={styles.thread}
            resizeMode="contain"
            />
        </View>
      )}
      ListFooterComponent={() => (
        <View style={styles.separator}>
          <Image
            source={require('./assets/threads.png')}
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
    // position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    // zIndex: 1000,
  },
  contentContainer: {
    // paddingTop: screenHeight, // padding sopra per scrollare oltre il top
    paddingBottom: screenHeight - screenHeight / 2.2, // padding sotto per scrollare oltre il bottom
  },
  image: {
    width:imageSize,
    height: imageSize,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20, // spazio per sovrapposizione della croce
  },
  separator: {
    height: 0, // nessun spazio aggiuntivo
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: -10,  // sovrapposizione sopra
    marginBottom: -10, // sovrapposizione sotto
  },
  thread: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    position: 'absolute',
    top: -screenWidth *0.31, // metà altezza per uscire sopra
    zIndex: 10,
  },
});