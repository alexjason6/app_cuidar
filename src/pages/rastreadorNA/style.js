import {StyleSheet, Dimensions, Platform} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('window').height;
const azul = '#0c71c3';
const branco = '#FFFFFF';
const laranja = '#FF9800';
const cinzaEscuro = '#444444';
const cinzaClaro = '#eeeeee';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cinzaClaro,
  },

  header: {
    paddingTop: 40,
    paddingHorizontal: 10,
    paddingBottom: 20,
    backgroundColor: azul,
    width: width,
  },

  title: {
    fontSize: 28,
    lineHeight: 30,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    color: branco,
    padding: 20,
  },

  fundoErroTexto: {
    backgroundColor: cinzaClaro,
  },

  textoHeader: {
    color: branco,
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20,
  },

  textoCorpo: {
    color: cinzaEscuro,
    fontSize: 16,
    margin: 20,
  },

  textoCorpoLaranja: {
    color: laranja,
    fontSize: 18,
    fontWeight: 'bold',
  },

  mapaExemplo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    backgroundColor: cinzaClaro,
  },

  imageMapa: {
    width: width * 0.6,
    resizeMode: 'contain',
  },
});
