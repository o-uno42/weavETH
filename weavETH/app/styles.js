import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const commonFont = { fontFamily: 'Marimpa' };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...commonFont,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 37, // was 32 + 5
    ...commonFont,
  },

  subtitle: {
    fontSize: 23, // was 18 + 5
    color: '#3366ff',
    marginTop: 10,
    ...commonFont,
  },

  button: {
    backgroundColor: '#7057a9',
    padding: 12,
    marginTop: 12,
    borderRadius: 8,
    width: 220,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#402f27',
    borderStyle: 'dashed',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Marimpa',
  },
imageButtonWrapper: {
  width: screenWidth,
  height: screenWidth,
  // position: 'relative',
  alignItems: 'center',
  gap:-50,

  marginBottom: screenHeight * 0.0005, // Adjust as needed
  
  // justifyContent: 'center',
},

imageButton: {
  width: '100%',
  height: '100%',
},

imageButtonText: {
  position: 'absolute',
  color: '#fff',
  fontSize: 24,
  zIndex: 1,
  top: '40%', // o usa flex per centrare meglio
  ...commonFont,
},


  text: {
    color: '#fff',
    ...commonFont,
  },

  backButton: {
    position: 'absolute',
  },

  buttonPlus: {
    position: 'absolute',
    backgroundColor: '#ff9966',
    padding: 15,
    borderRadius: 360,
    borderWidth: 2,
    borderColor: '#660033',
    borderStyle: 'dashed',
    alignItems: 'center',

    bottom: 20,
    left: 20,
    right: 20,

    // Shadow (cross-platform)
    elevation: 5, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  buttonContainer: {
    position: 'absolute',
    backgroundColor: '#ff9966',
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#660033',
    borderStyle: 'dashed',
    alignItems: 'center',

    bottom: 20,
    left: 20,
    right: 20,

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButtonText: {
    color: '#660033',
    fontFamily: 'Marimpa',
  },
  
  backButton: {
    // position: 'absolute',
    backgroundColor: '#ff9966',
    padding: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#660033',
    borderStyle: 'dashed',
    alignItems: 'center',

    // bottom: 20,
    // left: 20,
    // right: 20,

    // elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  notify:{
    color: '#fff',
    paddingLeft: 60,
    paddingBottom: 8,
    // justifyContent: 'right',
    ...commonFont,},


  flatList: {
    flex: 1,
    margin: 0,
    padding: 0,
    paddingTop: 0,
    backgroundColor: '#ffcc66',
  },

  onlyButton: {
    backgroundColor: '#7057a9',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#402f27',
    borderStyle: 'dashed',
    marginBottom: 16,
    width: 220,
    alignItems: 'center',
  },

  buttonBottom: {
    backgroundColor: '#7057a9',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#402f27',
    borderStyle: 'dashed',
    marginBottom: 16,
    // paddingBottom: 20,
    width: 220,
    alignItems: 'center',
  },

  onlyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
    ...commonFont,
  },

  containerForButtons: {
    flex: 1,
    // justifyContent: 'center',
     justifyContent: 'flex-end', 
    alignItems: 'center',
    // paddingHorizontal: 20,
    // paddingBottom: 5,
  },
imageButtonWrapper: {
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 50,
},
imageButtonHome: {
  // width: screenWidth * 0.2,
  height: screenWidth * 0.2,
  // width: '100%',
  // // width: au
  // gap: 30,
  
  resizeMode: 'contain',
  position: 'absolute',
},
imageButtonText:{
  position: 'absolute',
  color: '#fff',
  fontSize: 24,
  zIndex: 1,
  bottom: 3, // o usa flex per centrare meglio
  ...commonFont,
},
containerForButtonsHome: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'flex-end', // o 'flex-start' se preferisci
  // alignItems: 'center',

  // paddingVertical: 0,
  gap: 40, // se supportato
},
  itemWrapper:{
    margin: -100,
  },
  preview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    alignItems: 'center',
    margin: 10,
    // marginTop: 20,
  },
  loadingText: {
    margin: 10,
    // marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  resultContainer: {
    alignItems: 'center',
    margin: 10,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    // marginBottom: 10,
  },
  result: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  disabledButton: {
  opacity: 0.5,
}

});

export default styles;
