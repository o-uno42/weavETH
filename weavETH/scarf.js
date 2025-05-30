import React from 'react';
import { FlatList, Image, View, Dimensions, StyleSheet } from 'react-native';


const images = [
  { id: '1', src: require('./assets/1.jpg') },
  { id: '2', src: require('./assets/2.jpg') },
  { id: '3', src: require('./assets/3.jpg') },
];

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth * 0.6;

export default function Scarf() {
  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
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