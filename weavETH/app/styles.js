import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';
import { Dimensions } from 'react-native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 0,
    flex: 1,
    // backgroundColor: '#ffcc66',
    fontFamily: 'Mahamaya',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Mahamaya',
    // fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#3366ff',
    fontFamily: 'Mahamaya',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#ff884d',
    // fontFamily: 'Mahamaya',
    padding: 15,
    borderRadius: 8,
     borderWidth: 2,
    borderColor: '#000',
    borderStyle: 'dashed',
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    fontFamily: 'Mahamaya',
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Mahamaya',
  },
  text: {
    color: '#fff',
    fontFamily: 'Mahamaya',
  },
  backButton:{
    position: 'absolute',
  },
  buttonPlus:{
     position: 'absolute',

    backgroundColor: '#ff9966',
    // fontColor: '#000',
    // fontFamily: 'Mahamaya',
    padding: 15,
    borderRadius: 360,
     borderWidth: 2,
    borderColor: '#660033',
    borderStyle: 'dashed',
    // marginTop: 20,
    // width: '100%',
    alignItems: 'center',
    fontFamily: 'Mahamaya',

    bottom: 20,
    left: 20,
    right: 20,
    // opzionale: per dare ombra e migliorare visibilità
    // backgroundColor: 'white',
    // borderRadius: 10,
    elevation: 5, // ombra android
    shadowColor: '#000', // ombra ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonContainer: {
    position: 'absolute',

    backgroundColor: '#ff9966',
    // fontColor: '#000',
    // fontFamily: 'Mahamaya',
    padding: 15,
    borderRadius: 8,
     borderWidth: 2,
    borderColor: '#660033',
    borderStyle: 'dashed',
    // marginTop: 20,
    // width: '100%',
    alignItems: 'center',
    fontFamily: 'Mahamaya',

    bottom: 20,
    left: 20,
    right: 20,
    // opzionale: per dare ombra e migliorare visibilità
    // backgroundColor: 'white',
    // borderRadius: 10,
    elevation: 5, // ombra android
    shadowColor: '#000', // ombra ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  flatList:{ 
    flex: 1,
    // paddingHorizontal: 20,
    margin: 0,
    padding: 0,
    paddingTop: 0,
    backgroundColor: '#ffcc66',
    //  paddingTop: screenHeight,

  }
  
});

export default styles;