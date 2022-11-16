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

  containerMapa: {
    flex: 1,
    backgroundColor: cinzaClaro,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fundoGeral: {
    backgroundColor: cinzaClaro,
    flex: 1,
  },

  header: {
    padding: 10,
    paddingBottom: 20,
    backgroundColor: azul,
    width: width,
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 2,
    borderColor: 'rgba(255,255,255,0)',
    marginBottom: 20,
  },

  headerError: {
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

  textoHeader: {
    color: branco,
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20,
  },

  map: {
    height: height,
  },

  deviceInfosBox: {
    backgroundColor: branco,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    width: width,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  cardDados: {
    marginBottom: 10,
    marginLeft: Platform.OS === 'ios' ? 20 : 10,
    marginRight: Platform.OS === 'ios' ? 20 : 10,
    width: width - 40,
    backgroundColor: branco,
    padding: 1,
    borderRadius: 5,
  },

  MapaModal: {
    width: width,
    height: height,
  },

  ListaDados: {
    backgroundColor: cinzaClaro,
  },

  ListaDados2: {
    backgroundColor: cinzaClaro,
  },

  titleDados: {
    fontSize: 24,
    color: branco,
    margin: 20,
    fontWeight: 'bold',
  },

  dadoPlaca: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 16,
    color: laranja,
    fontWeight: Platform.OS === 'ios' ? '800' : 'bold',
  },

  dadoVeiculo: {
    fontSize: 13,
    marginLeft: 20,
    color: cinzaEscuro,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
  },

  dadoEndereco: {
    fontSize: 13,
    marginLeft: 20,
    color: cinzaEscuro,
    fontWeight: 'normal',
    width: '90%',
  },

  ligado: {
    fontSize: 12,
    color: azul,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    marginRight: 20,
    marginTop: 20,
  },

  desligado: {
    fontSize: 12,
    color: '#666666',
    marginRight: 20,
    marginTop: 20,
  },

  dadoRestante: {
    fontSize: 13,
    color: '#999999',
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 7,
  },

  dadoData: {
    marginTop: 5,
    fontSize: 12,
    color: '#888888',
    fontWeight: Platform.OS === 'ios' ? '400' : 'bold',
    marginRight: 20,
    marginBottom: 20,
    alignSelf: 'flex-end',
  },

  deviceIgnicao: {
    color: cinzaEscuro,
  },

  deviceTime: {
    color: cinzaEscuro,
    left: 5,
    marginTop: 6,
    fontSize: 10,
  },

  deviceVelocidade: {
    color: cinzaEscuro,
    left: 5,
    marginTop: 2,
  },

  icons: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },

  iconsSpeed: {
    width: 25,
    height: 25,
    marginTop: -3,
    marginLeft: 20,
  },

  iconsTime: {
    width: 25,
    height: 25,
    marginTop: -2,
    marginLeft: 20,
  },

  iconsDevice: {
    width: 25,
    height: 25,
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

  mapa: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoCorpo2: {
    color: branco,
    fontSize: 16,
    padding: 40,
  },

  botao: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 42 ,
    flexDirection: 'row',
  },

  btnMapa: {
    width: '40%',
    height: 50,
    backgroundColor: laranja,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
    flexDirection: 'row'
  },

  btnHistorico: {
    width: '40%',
    height: 50,
    backgroundColor: cinzaClaro,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
    flexDirection: 'row'
  },

  btnEndereco: {
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    marginLeft: 6,
  },

  btnEnderecoModal: {
    width: '90%',
    marginLeft: 0,
    marginTop: -10,
    marginBottom: 30,
  },

  fechaEndereco: {
    width: '90%',
    marginLeft: -6,
  },

  textoEndereco: {
    fontSize: 14,
    color: '#999999',
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    marginTop: -10,
    marginBottom: 20,
    marginLeft: 20,
    alignContent: 'center',
  },

  textoBtn: {
    color: azul,
    fontSize: 16,
    fontWeight: 'bold',
  },

  textoBtnMapa: {
    color: branco,
    fontSize: 14,
    fontWeight: 'bold',
  },

  textoBtnHistorico: {
    color: cinzaEscuro,
    fontSize: 14,
    fontWeight: 'bold',
  },

  btnFechaModal: {
    marginBottom: 10,
    flexDirection: 'row-reverse',
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    width: '50%',
    alignSelf: 'flex-end',
    borderRadius: 5,
    padding: 10,
  },

  btnMudaEquipamento: {
    marginBottom: 10,
    flexDirection: 'row-reverse',
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
  },

  fechaModal: {
    backgroundColor: branco,
    borderRadius: 30,
    padding: 4,
    marginRight: 5,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },

  btnOpenHistory: {
    marginBottom: 10,
    flexDirection: 'row',
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    width: '50%',
    alignSelf: 'flex-start',
    borderRadius: 5,
    padding: 10,
  },

  openHistory: {
    backgroundColor: branco,
    borderRadius: 30,
    padding: 5,
    marginLeft: 5,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },

  fechaModalCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fechaCard: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 40,
    height: 40,
  },

  CardModal: {
    backgroundColor: branco,
    width: '95%',
    borderRadius: 5,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    marginTop: -40,
  },

  transparent: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? height * 0.25 : height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },

  transparent2: {
    marginTop: -100,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 40,
  },

  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: height * 0.5,
  },

  btnAnterior: {
    flexDirection: 'row',
    width: '50%',
    alignSelf: 'center',
    borderRadius: 5,
    marginLeft: 15,
  },

  view: {
    marginVertical: Platform.OS === 'android' ? 10 : null,
    marginHorizontal: Platform.OS === 'android' ? 10 : null,
    backgroundColor: cinzaClaro,
  },

  botaoDetalhes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: laranja,
    width: width * 0.5,
    height: 40,
    borderRadius: 5,
  },

  botaoContato: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: laranja,
    width: width * 0.5,
    height: 50,
    borderRadius: 5,
    marginTop: 30,
  },

  textoDetalhes: {
    color: branco,
    fontWeight: 'bold',
  },

  fundoErroTexto: {
    backgroundColor: cinzaClaro,
  },

  imageMapa: {
    width: width * 0.6,
    resizeMode: 'contain',
  },

  containerHistory: {
    flex: 1,
    paddingVertical: 20,
  },

  containerData: {
    backgroundColor: branco,
    height: 45,
    flexDirection: 'row',
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? height - 80 : height - 80,
    paddingVertical: 10,
  },

  botaoDatas: {
    marginHorizontal: 5,
    backgroundColor: cinzaClaro,
    borderRadius: 10,
  },

  botaoDatasSelected: {
    marginHorizontal: 5,
    backgroundColor: azul,
    borderRadius: 10,
  },

  datas: {
    fontWeight: 'bold',
    color: laranja,
    paddingVertical: Platform.OS === 'ios' ? 4 : 2,
    paddingHorizontal: 15,
  },

  datasSelected: {
    fontWeight: 'bold',
    color: branco,
    paddingVertical: Platform.OS === 'ios' ? 4 : 2,
    paddingHorizontal: 15,
  },

  pin: {
    backgroundColor:'rgba(255, 255, 255, 0.9)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderWidth: 1,
    borderColor: cinzaClaro,
    borderRadius: 4,
  },

  textPin: {
    color: laranja,
    fontWeight: 'bold',
  }
});
