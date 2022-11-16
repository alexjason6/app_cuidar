import {StyleSheet, Dimensions, Platform} from 'react-native';
import styled, {css} from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${({theme}) => theme.colors.oranges.main};
`;

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.white};

  ${({saudacao}) => saudacao && css`
    font-size: 40px;
    font-weight: ${Platform.OS === 'ios' ? '200' : '100'};
    font-family: ${Platform.OS === 'ios' ? 'System' : 'Roboto-Light'};
    margin-bottom: 50px;
  `};

  ${({associado}) => associado && css`
    font-weight: ${Platform.OS === 'ios' ? '700' : bold};
    font-size: 16px;
  `};

  ${({visitante}) => visitante && css`
    color: ${({theme}) => theme.colors.grays.main};
    font-weight: ${Platform.OS === 'ios' ? '700' : bold};
    font-size: 16px;
  `};
`;

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const azul = '#0c71c3';
const branco = '#FFFFFF';
const cinzaEscuro = '#444444';
const laranja = '#FF9800';
const cinzaClaro = '#eeeeee';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: laranja,
    //ok 1
  },

  container2: {
    backgroundColor: branco,
    height: height,
    //ok 22
  },

  textoPergunta: {
    color: branco,
    fontSize: 40,
    marginTop: '-20%',
    paddingHorizontal: 40,
    fontWeight: Platform.OS === 'ios' ? '200' : '100',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Light',
    //ok 2
  },

  textoAssociado: {

    //ok 4
  },

  naoSouAssociado: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: branco,
    borderWidth: 2,
    height: 55,
    width: 250,
    padding: 10,
    borderRadius: 4,
    margin: 5,
    //ok 5
  },

  textoNaoAssociado: {
    color: cinzaEscuro,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    fontSize: 16,
    //ok 6
  },

  logoCuidar: {
    width: 150,
    height: 75,
    marginTop: 50,
    //ok 7
  },

  boxModal: {
    height: height,
    paddingLeft: 40,
    backgroundColor: azul,
    //ok 8
  },

  boxModalVisitante: {
    height: height,
    paddingLeft: 40,
    backgroundColor: cinzaClaro,
    //ok 18
  },

  btnFechaModal: {
    marginTop: 50,
    flexDirection: 'row-reverse',
    //ok 9
  },

  modalText: {
    marginTop: 10,
    fontWeight: Platform.OS === 'ios' ? '200' : 'normal',
    color: branco,
    fontSize: 40,
    paddingRight: 20,
    //ok 13
  },

  modalTextVisitante: {
    marginTop: 10,
    fontWeight: Platform.OS === 'ios' ? '200' : 'normal',
    color: cinzaEscuro,
    fontSize: 40,
    paddingRight: 20,
    //ok 19
  },

  input: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -40,
    //ok 14
  },

  inputs: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cinzaClaro,
    paddingBottom: 30,
    //ok 27
  },

  cpfCnpj: {

    //ok 15
  },

  telefone: {
    width: width * 0.8,
    backgroundColor: branco,
    height: 50,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 5,
    //ok 20
  },

  telefone75: {
    width: '60%',
    backgroundColor: branco,
    height: 50,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 5,
    //ok 30
  },

  telefone50: {
    width: '39%',
    backgroundColor: branco,
    height: 50,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 5,
    //ok 29
  },

  email: {
    width: width * 0.8,
    backgroundColor: branco,
    height: 50,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 30,
    //ok 21
  },

  doisInputs: {
    flexDirection: 'row',
    //ok 28
  },

  email25: {
    width: '18%',
    backgroundColor: branco,
    height: 50,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 30,
    marginLeft: 10,
    //ok 31
  },

  fechaModal: {
    marginRight: 5,
    //ok 10
  },

  imagemFechaModal: {
    width: 40,
    height: 40,
    //ok 11
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
    //ok 16
  },

  textoAvanca: {

    //ok 17
  },

  botaoAvancaVisitante: {
    height: 45,
    width: '50%',
    backgroundColor: azul,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //ok 22
  },

  cabecalho: {
    backgroundColor: branco,
    width: width,
    padding: 40,
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 20,
    //ok 23
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
    //ok 25
  },

  iconeVoltar: {
    marginLeft: 10,
    marginTop: 0,
    //ok 24
  },

  textoCabecalho: {
    color: cinzaEscuro,
    fontSize: 30,
    fontWeight: Platform.OS === 'ios' ? '200' : '200',
    //ok 26
  },
});
