import {StyleSheet, Dimensions} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const azul = '#0c71c3';
const branco = '#FFFFFF';
const cinzaEscuro = '#444444';
const laranja = '#ff9800';
const cinzaClaro = '#eeeeee';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: cinzaClaro,
  },

  containerLoading: {
    height: 200,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cinzaClaro,
  },

  fundoDesconto: {
    backgroundColor: branco,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  titleDescontos: {
    fontSize: 24,
    color: azul,
    marginTop: 30,
    fontWeight: 'bold',
  },

  textoDescontos: {
    color: cinzaEscuro,
    marginTop: 30,
  },

  scrollTips: {
    height: 75,
    marginTop: -30,
    backgroundColor: cinzaClaro,
  },

  stickCategories: {
    height: 35,
    marginHorizontal: 4,
    marginTop: 20,
    backgroundColor: branco,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },

  stickCategoriesActive: {
    height: 35,
    marginHorizontal: 4,
    marginTop: 20,
    backgroundColor: azul,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textStickCategories: {
    marginHorizontal: 20,
    marginVertical: 8,
    color: laranja,
    fontWeight: 'bold',
  },

  textStickCategoriesActive: {
    marginHorizontal: 20,
    marginVertical: 8,
    color: branco,
    fontWeight: 'bold',
  },

  buscandoDescontos: {
    marginTop: 20,
    color: cinzaEscuro,
  },

  cardEstabelecimento: {
    marginHorizontal: 20,
    borderRadius: 4,
    backgroundColor: branco,
    height: 90,
    width: width - 40,
    marginVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  imageParceiro: {
    width: 70,
    height: 70,
  },

  imageParceiroDesconto: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  },

  divisor: {
    height: '90%',
    backgroundColor: laranja,
    width: 2,
    marginHorizontal: 10,
  },

  nomeParceiro: {
    fontSize: 15,
    fontWeight: 'bold',
    color: cinzaEscuro,
    width: '60%',
  },

  filter: {
    color: cinzaEscuro,
  },

  filtro: {
    paddingRight: 20,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center'
  },

  localização: {
    marginHorizontal: 20,
    marginVertical: 20,
    flexDirection: 'row'
  },

  icon: {
    marginRight:20,
  },

  botaoDesconto: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: laranja,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4
  },

  fundoDetalheDesconto: {
    backgroundColor: branco,
    paddingHorizontal: 20
  },

  titleDetalheDescontos: {
    color: '#888888',
    fontWeight: 'bold',
    fontSize: 12
  },

  dadosDetalheDesconto: {
    color: '#888888',
    paddingHorizontal: 10,
    marginBottom: 12
  },

  titleEstabelecimento: {
    fontSize: 16,
    color: azul,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 15
  },

  descricaoEstabelecimento: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: azul,
    marginBottom: 20
  },

  titleRegras: {
    color: cinzaEscuro,
  },

  titleEnderecos: {
    color: cinzaEscuro,
    marginVertical: 10
  },

  regrasEstabelecimento: {
    paddingHorizontal: 10,
    color: cinzaEscuro,
    fontSize: 14,
    marginVertical: 10
  },

  btnDesconto: {
    color: branco,
    fontSize: 14,
    fontWeight: 'bold'
  }
});