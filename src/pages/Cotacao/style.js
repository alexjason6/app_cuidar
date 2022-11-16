import {StyleSheet, Dimensions, Platform} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const azul = '#0c71c3';
const branco = '#FFFFFF';
const laranja = '#FF9800';
const cinzaEscuro = '#444444';
const cinzaClaro = '#eeeeee';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: branco,
  },

  fundoGeral: {
    backgroundColor: cinzaEscuro,
    padding: 20,
  },

  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleTipo: {
    fontSize: 18,
    color: laranja,
    fontWeight: Platform.OS === 'ios' ? '500' : 'bold',
    marginBottom: 20,
    marginTop: 20,
  },

  imagemTipo: {
    width: 100,
    height: 100,
  },

  checkTipo: {
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    paddingBottom: 20,
    width: width - 40,
    backgroundColor: branco,
    borderRadius: 5,
  },

  tipoContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btnAvanca: {
    height: 50,
    width: '80%',
    backgroundColor: laranja,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 40,
  },

  textBtnAvanca: {
    color: branco,
    fontWeight: 'bold',
    fontSize: 16,
  },

  header: {
    padding: 20,
    backgroundColor: azul,
    width: width,
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 2,
    borderColor: 'rgba(255,255,255,0)',
  },

  textoHeader: {
    color: branco,
    fontSize: 18,
    fontWeight: 'bold',
  },

  containerMarcas: {
    width: width,
    backgroundColor: branco,
  },

  contentMarca: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    width: width,
    height: 50,
  },

  ListaMarcas: {
    height: '85%',
  },

  dadosLista: {
    color: cinzaEscuro,
  },

  botoes: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },

  btnAvancaMarcas: {
    height: 50,
    width: '40%',
    backgroundColor: laranja,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 40,
  },

  btnSelecione: {
    height: 40,
    padding: 10,
    borderColor: laranja,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },

  btnVolta: {
    height: 50,
    width: '30%',
    backgroundColor: branco,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: laranja,
    borderWidth: 1,
    marginBottom: 40,
  },

  TextBtnVolta: {
    color: azul,
  },

  result: {
    padding: 20,
    marginTop: 50,
  },

  textResult: {
    color: '#666666',
    marginTop: 10,
  },

  dadoResult: {
    fontWeight: 'bold',
    color: '#FF9800',
    fontSize: 18,
    fontStyle: 'italic',
  },

  boxFilter: {
    backgroundColor: '#eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
  },

  filter: {
    width: width - 20,
    height: 40,
    backgroundColor: cinzaClaro,
    borderRadius: 5,
    //borderColor: laranja,
    //borderBottomWidth: 1,
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 10,
  },

  btnFechaModal: {
    marginBottom: 10,
    flexDirection: 'row-reverse',
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    zIndex: 99999999,
  },

  fechaModal: {
    backgroundColor: branco,
    borderRadius: 30,
    padding: 7,
    marginRight: 5,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },

  Mapa: {
    backgroundColor: branco,
    width: width,
    height: height,
  },
  produtos: {
    marginTop: 20,
    padding: 20,
    marginLeft: -20,
    width: width,
    borderTopColor: laranja,
    borderTopWidth: 3,
    backgroundColor: cinzaEscuro,
  },

  titleProdutos: {
    fontSize: 26,
    color: branco,
    fontWeight: 'bold',
  },

  tipoProdutos: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: width - 60,
  },

  titleSection: {
    marginTop: 20,
    marginLeft: 10,
    fontSize: 18,
    color: laranja,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },

  selecionaProduto: {
    marginTop: 20,
    height: 50,
    borderBottomColor: '#666666',
    borderBottomWidth: 1,
    marginLeft: 20,
  },

  nomeProduto: {
    color: branco,
    width: '90%',
  },

  valor: {
    marginBottom: 10,
    flexDirection: 'row-reverse',
    position: 'absolute',
    top: height * 0.3,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    zIndex: 99999999,
  },

  boxTotal: {
    backgroundColor: azul,
    borderRadius: 50,
    shadowColor: '#666',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    height: 90,
    width: 90,
  },

  textoTotal: {
    textAlign: 'center',
    color: branco,
    fontSize: 20,
    fontWeight: 'bold',
    margin: Platform.OS === 'ios' ? 24 : 15,
  },

  contentResumo: {
    padding: 20,
  },

  titleResumo: {
    fontSize: 24,
    color: azul,
    fontWeight: 'bold',
  },
  veiculoResumo: {
    margin: 20,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: laranja,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },

  titleSectionResume: {
    marginTop: 20,
    marginLeft: 10,
    fontSize: 20,
    color: '#666666',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },

  detalheProtecao: {
    fontSize: 12,
    color: '#999999',
    padding: 10,
  },

  totalValor: {
    fontSize: 24,
    color: azul,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  resumoTotal: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  aceiteOk: {
    color: azul,
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 10,
  },
  aceitar: {
    color: '#666666',
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 10,
  },

  aceiteRegulamentos: {
    marginTop: 20,
  },

  scroll: {
    marginBottom: 20,
  },

  filterRegulamentos: {
    backgroundColor: '#eeeeee',
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },

  titleSectionRegulamento: {
    color: cinzaEscuro,
    fontWeight: 'bold',
  },

  containerRegulamentos: {
    padding: 20,
    backgroundColor: branco,
    height: height,
  },

  titleSectionRegulamentoAtivo: {
    color: laranja,
    fontWeight: 'bold',
  },

  titleRegulamento: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 'bold',
    color: cinzaEscuro,
  },

  conteudoRegulamento: {
    textAlign: 'justify',
    color: cinzaEscuro,
    padding: 20,
  },

  imagemTaxas: {
    width: width * 0.9,
  },
});
