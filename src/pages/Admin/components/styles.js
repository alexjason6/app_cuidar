import {StyleSheet, Dimensions} from 'react-native';
import { keyframe } from 'react-native-reanimated';

const width100 = Dimensions.get('screen').width;
const height = Dimensions.get('window').height;
const azul = '#0c71c3';
const azulClaro = '#b1ddff';
const branco = '#FFFFFF';
const laranja = '#FF9800';
const cinzaEscuro = '#444444';
const disabled = '#cccccc'
const cinzaClaro = '#eeeeee';
const vermelho = '#e60000';
const vermelhoClaro = '#ff7f7f';
const verde = '#40C351';



export default StyleSheet.create({
  container: {
    width: width100,
    backgroundColor: branco,
    padding: 20,
    borderRadius: 4,
  },

  nomeAssociado: {
    color: laranja,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },

  hrOrange: {
    height: 1,
    width: width100 * 0.9,
    backgroundColor: laranja,
    marginVertical: 15,
  },

  titleVeiculo: {
    color: azul,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
  },

  buttonPlaca: {
    marginVertical: 5,
    padding:15,
    borderRadius: 8,
    backgroundColor: branco,
    display: 'flex',
    justifyContent: 'center',
  },

  placa: {
    fontSize: 16,
    color: azul,
    fontWeight: 'bold'
  },

  placaInativa: {
    fontSize: 16,
    color: disabled,
    fontWeight: 'bold'
  },

  placaSituacao: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },

  ativo: {
    color: verde,
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },

  inativo: {
    color: vermelho,
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },

  modelo: {
    fontSize: 14,
    color: laranja,
    fontWeight: 'bold'
  },

  modeloInativo: {
    fontSize: 14,
    color: disabled,
    fontWeight: 'bold'
  },

  buttonDesativar: {
    backgroundColor: vermelho,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 40,
  },

  buttonAtivar: {
    backgroundColor: azul,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 40,
  },

  textButton: {
    color: branco,
    fontWeight: 'bold',
    fontSize: 16,
  },

  buttonBoleto: {
    marginVertical: 5,
    padding:15,
    borderRadius: 8,
    backgroundColor: branco,
    display: 'flex',
    justifyContent: 'center',
  },

  linhaDigitavel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width100,
    marginVertical: 5,
  },

  digitavel: {
    color: cinzaEscuro,
    fontSize: 14,
    width: width100 * 0.6,
    marginLeft: -30,
  },

  iconCopy: {
    marginRight: 50,
  },

  valorBoleto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cinzaEscuro,
    marginBottom: 5,
  },

  valorBoletoAberto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: azul,
    marginBottom: 5,
  },

  tipoBoleto: {
    fontSize: 14,
    textTransform: 'capitalize',
    color: cinzaEscuro,
    marginVertical: 5,
  },

  tipoBoletoAberto: {
    fontSize: 14,
    textTransform: 'capitalize',
    color: azul,
    marginVertical: 5,
  },

  vencimentoBoleto: {
    marginVertical: 3,
    color: '#999999',
    fontWeight: 'bold',
    fontSize: 14,
  },

  situacaoBoleto: {
    color: '#999999',
    fontWeight: 'bold',
    marginBottom: 5,
  },

  viewPDF: {
    display: 'flex',
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },

  viewBoleto: {
    width: width100,
  },

  verBoleto: {
    paddingVertical: 5,
    backgroundColor: laranja,
    width: width100 * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 4,
  },

  txtBtnVerBoleto: {
    color: branco,
    fontWeight: 'bold',
  },

  btnCompartilha: {
    backgroundColor: azul,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 50,
    width: width100 * 0.5,
    marginBottom: 30,
    borderRadius: 4,
    marginTop: 10,
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
  },

  fechaModal: {
    backgroundColor: branco,
    borderRadius: 30,
    padding: 5,
    marginRight: 5,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },

});