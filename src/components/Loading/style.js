import {StyleSheet, Dimensions} from 'react-native';

const width100 = Dimensions.get('screen').width;
const height = Dimensions.get('window').height;
const cinzaClaro = '#eeeeee';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    height: '100%',
    marginTop: height * 0.35,
    backgroundColor: cinzaClaro,
  },
})