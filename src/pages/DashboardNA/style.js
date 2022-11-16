import {StyleSheet, Dimensions, Platform} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const azul = '#0c71c3';
const branco = '#FFFFFF';
const cinzaEscuro = '#444444';
const cinzaClaro = '#eeeeee';
const laranja = '#ff9800';

export default StyleSheet.create({
  container: {
    backgroundColor: branco,
    height: height,
  },

  cabecalho: {
    backgroundColor: branco,
    width: width,
    padding: 40,
    flex: 1,
    justifyContent: 'space-around',
  },

  voltar: {
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 50,
    alignSelf: 'flex-end',
  },

  botaoVoltar: {
    textAlign: 'right',
    color: cinzaEscuro,
    fontSize: 16,
  },

  iconeVoltar: {
    marginLeft: 10,
  },

  textoCabecalho: {
    color: laranja,
    fontWeight: 'bold',
    fontSize: 30,
  },

  subTextoCabecalho: {
    color: laranja,
    fontSize: 20,
  },

  cards: {
    marginTop: 10,
    paddingHorizontal: 12,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  cardsContent: {
    flex: 1,
    backgroundColor: cinzaEscuro,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    width: width - 40,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: branco,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  internaCard: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width - 40,
    flexDirection: 'row',
  },

  IconTextCard: {
    flexDirection: 'column',
  },

  textCard: {
    color: cinzaEscuro,
    fontSize: 16,
    width: width * 0.6,
    padding: 20,
  },

  textCardAndamento: {
    color: branco,
    fontSize: 16,
    width: width * 0.6,
    padding: 20,
  },

  internaCardAndamento: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width - 40,
    flexDirection: 'row',
  },

  botaoCard: {
    width: 50,
    height: 180,
    borderLeftWidth: 1,
    borderLeftColor: azul,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconCard: {
    marginLeft: 40,
    width: 50,
    height: 50,
  },

  cardCotacaoAndamento: {
    width: width - 40,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: laranja,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconeCard: {
    marginLeft: 0,
  },

  iconeCard2: {
    alignSelf: 'flex-end',
    marginRight: 15,
  },

  truck: {
    width: 50,
    height: 50,
  },

  titleCard: {
    fontSize: 14,
    textAlign: 'center',
    color: branco,
    fontWeight: 'bold',
  },

  cardCotacao: {
    width: width - 40,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: azul,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardCotacao2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textoCardCotacao: {
    color: branco,
    fontSize: 16,
    width: width * 0.6,
    padding: 20,
    fontWeight: 'bold',
  },

  botaoCardCotacao: {
    width: 50,
    height: 180,
    borderLeftWidth: 1,
    borderLeftColor: laranja,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardContato: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoCardContato: {
    color: laranja,
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
    marginBottom: Platform.OS === 'ios' ? -5 : 30,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
  },

  btnFechaModal: {
    marginTop: 50,
    flexDirection: 'row-reverse',
  },

  modalText: {
    marginTop: 20,
    fontWeight: Platform.OS === 'ios' ? '200' : 'normal',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Light',
    color: branco,
    fontSize: 40,
    paddingRight: 20,
  },

  input: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -40,
  },

  cpfCnpj: {
    width: width * 0.8,
    backgroundColor: branco,
    height: 50,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 30,
  },

  fechaModal: {
    marginRight: 5,
  },

  imagemFechaModal: {
    width: 40,
    height: 40,
  },

  botaoAvanca: {
    height: 45,
    width: '50%',
    backgroundColor: laranja,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  textoAvanca: {
    color: branco,
    fontSize: 18,
    fontWeight: 'bold',
  },

  boxModal: {
    height: height,
    paddingLeft: 40,
    backgroundColor: azul,
  },
});
