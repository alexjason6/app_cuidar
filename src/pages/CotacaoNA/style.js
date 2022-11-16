import {StyleSheet, Dimensions, Platform} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const azul = '#0c71c3';
const branco = '#FFFFFF';
const laranja = '#FF9800';
const cinzaEscuro = '#444444';
const cinzaClaro = '#eeeeee';

export default StyleSheet.create({
  fundoGeral: {
    backgroundColor: branco,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: branco,
    //ok 6
  },

  content: {
    height: height,
    backgroundColor: cinzaEscuro,
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
    marginBottom: 20,
    marginHorizontal: 20,
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
    width: width * 0.8,
    backgroundColor: azul,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  textBtnAvanca: {
    color: branco,
    fontWeight: 'bold',
    fontSize: 16,
  },

  containerMarcas: {
    width: width,
    height: height,
    backgroundColor: branco,
    //ok 7
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
    //ok 9
  },

  ListaMarcas: {
    height: '85%',
    //ok 8
  },

  dadosLista: {
    color: cinzaEscuro,
    //ok 10
  },

  botoes: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
    flexDirection: 'row',
  },

  botoesResumo: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 20,
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
    backgroundColor: cinzaClaro,
    marginTop: -20,
  },

  textResult: {
    color: '#666666',
    marginTop: 10,
    fontSize: 14,
  },

  dadoResult: {
    fontWeight: 'bold',
    color: laranja,
    fontSize: 16,
    fontStyle: 'italic',
  },

  filter: {
    width: width - 20,
    height: 40,
    backgroundColor: branco,
    borderRadius: 5,
    borderColor: '#cccccc',
    borderBottomWidth: 1,
    padding: 10,
    marginTop: -20,
    marginBottom: 20,
    marginHorizontal: 10,
    //ok 11
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
  },

  produtos: {
    padding: 20,
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

  titleProdutosResumo: {
    fontSize: 20,
    color: cinzaEscuro,
    fontWeight: 'bold',
  },

  titleParticipacoesResumo: {
    fontSize: 20,
    color: cinzaEscuro,
    fontWeight: 'bold',
    marginTop: 20,
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

  ProdutoResumo: {
    marginTop: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: laranja,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },

  ProdutoResumoMensalidade: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: azul,
    marginVertical: 2,
    borderRadius: 3,
  },

  nomeProdutoResumo: {
    marginTop: 5,
    color: cinzaEscuro,
    fontSize: 14,
    width: '55%',
  },

  nomeProdutoResumoMensalidade: {
    color: branco,
    fontWeight: 'bold',
  },

  valorProdutoResumoMensalidade: {
    marginTop: 5,
    color: branco,
    fontWeight: 'bold',
    fontSize: 14,
    width: '45%',
    textAlign: 'right',
  },

  valorProdutoResumo: {
    marginTop: 5,
    color: azul,
    fontWeight: 'bold',
    fontSize: 14,
    width: '45%',
    textAlign: 'right',
  },

  valor: {
    width: width,
  },

  boxTotal: {
    backgroundColor: laranja,
    height: 60,
    width: width,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  textoTotal: {
    textAlign: 'center',
    color: branco,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 17,
  },

  contentResumo: {
    backgroundColor: cinzaClaro,
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

  safeAreaModal: {
    backgroundColor: '#eeeeee',
  },

  scrollHorizontal: {
    height: 50,
  },

  filterRegulamentos: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
  },

  titleSectionRegulamento: {
    color: cinzaEscuro,
    fontWeight: 'bold',
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
    margin: 10,
    textAlign: 'justify',
    color: cinzaEscuro,
  },

  titleCotacao: {
    fontSize: 25,
    color: branco,
    margin: 30,
    fontWeight: Platform.OS === 'ios' ? '200' : '400',
  },

  logoCuidar: {
    width: 150,
    height: 75,
    marginTop: 50,
    alignSelf: 'center',
  },

  cabecalho: {
    backgroundColor: branco,
    width: width,
    padding: 40,
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 20,
    //ok 1
  },

  voltar: {
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 50,
    alignSelf: 'flex-end',
    //ok 2
  },

  botaoVoltar: {
    textAlign: 'right',
    color: cinzaEscuro,
    fontSize: 16,
    //ok 4
  },

  iconeVoltar: {
    marginLeft: 10,
    marginTop: 0,
    //ok 3
  },

  textoCabecalho: {
    color: cinzaEscuro,
    fontSize: 30,
    fontWeight: Platform.OS === 'ios' ? '200' : '400',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Light',
    //ok 5
  },

  fundoResumo: {
    backgroundColor: cinzaClaro,
    marginTop: -20,
    padding: 20,
  },

  footerValor: {
    backgroundColor: laranja,
  },

  dadosListaSolicita: {
    color: cinzaEscuro,
    paddingHorizontal: 10,
  },

  inputDados: {
    borderBottomColor: laranja,
    backgroundColor: branco,
    borderBottomWidth: 1,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
    textAlign: 'center',
    padding: 15,
    fontSize: 15,
    borderRadius: 3,
    textTransform: 'uppercase',
  },

  dadosCor: {
    backgroundColor: branco,
    paddingHorizontal: 20,
    width: '90%',
    alignSelf: 'center',
  },

  cardAvanca: {
    width: width,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: branco,
  },

  textoCardAvanca: {
    color: laranja,
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
    marginBottom: -5,
  },

  docCNH: {
    width: width * 0.9,
    height: width * 0.7,
    backgroundColor: cinzaClaro,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },

  viewBtnImagens: {
    flexDirection: 'row',
    marginTop: 20,
  },

  btnImagens: {
    margin: 10,
    backgroundColor: azul,
    padding: 10,
    borderRadius: 5,
    width: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textBtnImagens: {
    color: branco,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  safeAreaCinza: {
    backgroundColor: '#eeeeee',
    paddingTop: 50,
  },

  docOK: {
    width: width * 0.9,
    height: width * 0.4,
    backgroundColor: cinzaClaro,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },

  enviado: {
    color: cinzaEscuro,
    fontSize: 14,
  },

  containerTitleRegulamentos: {
    backgroundColor: cinzaClaro,
    paddingVertical: 30,
  },

  titleModalRegulamentos: {
    marginTop: 50,
    marginHorizontal: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: cinzaEscuro,
    width: '80%',
  },
  regulamento: {
    backgroundColor: branco,
    padding: 10,
  },

  containerFilters: {
    backgroundColor: cinzaClaro,
  },

  ResumoRegulamento: {
    alignSelf: 'center',
    padding: 15,
    height: 50,
    borderBottomWidth: 1,
    borderColor: branco,
    marginBottom: 20,
  },
});
