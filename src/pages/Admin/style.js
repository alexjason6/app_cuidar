import {StyleSheet, Dimensions, Platform} from 'react-native';

const width100 = Dimensions.get('screen').width;
const height = Dimensions.get('window').height;
const azul = '#0c71c3';
const branco = '#FFFFFF';
const laranja = '#FF9800';
const cinzaEscuro = '#444444';
const cinzaClaro = '#eeeeee';

export default StyleSheet.create({
  inputSearch: {
    width: width100 * 0.9,
    height: 50,
    alignSelf: 'center',
    backgroundColor: branco,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    textAlign: 'center',
  },

  suggestName: {
    height: 40,
    width: width100,
    marginTop: 1,
    backgroundColor: branco,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textSuggestName: {
    color: azul,
  },
});
