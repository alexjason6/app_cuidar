import React, {createContext, useState, useEffect, useContext} from 'react';
import {Alert, Linking} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';

import CuidarService from '../services/CuidarService';
import HinovaService from '../services/HinovaService';
import VisitanteContext from '../contexts/visitante';

import cpfFormat from '../utils/cpfFormat';
import sendAssociadoData from '../utils/sendAssociadoData';

interface AuthContextData {
  tokenHinova: string | null;
  signed: boolean;
  user: {
    "codigo_associado": "99",
    "codigo_associado_beneficiario": "999",
    "nome": "HINOVA SOLUÇÕES DIGITAIS",
    "sexo": "M",
    "data_nascimento": "yyyy-mm-dd",
    "rg": "MG 99999999",
    "orgao_expedidor_rg": "SSPMG",
    "data_expedicao_rg": "yyy-mm-dd",
    "cnh": "999999999999",
    "categoria_cnh": "A",
    "data_vencimento_habilitacao": "yyyy-mm-dd",
    "cpf": "99999999999",
    "telefone_fixo": "(99)9999-9999",
    "telefone_celular": "(99)99999-9999",
    "telefone_celular_aux": "(99)99999-9999",
    "telefone_comercial": "(99)9999-9999",
    "email": "hinova@hinova.com.br",
    "email_auxiliar": "hinova.aux@hinova.com",
    "cep": "99999-999",
    "logradouro": "RUA MANOEL ELIAS DE AGUIAR",
    "numero": "245",
    "complemento": "COMERCIAL",
    "bairro": "OURO PRETO",
    "cidade": "BELO HORIZONTE",
    "estado": "MG",
    "codigo_regional": "9",
    "codigo_cooperativa": "9",
    "codigo_externo": "AAA999",
    "codigo_situacao": "9",
    "codigo_voluntario": "9",
    "codigo_estado_civil": "9",
    "descricao_situacao": "ATIVO",
    "veiculos": [
      {
        "codigo_veiculo": "999",
        "placa": "AAA-111",
        "chassi": "999999999999",
        "valor_fixo" : 99.99,
        "codigo_situacao": '1',
        "situacao": 'ativo',
        "descricao_modelo": 'modelo'
      }
	  ]
  };
  associadoLogado: string | null;
  tokenAssociadoHinova: string | null;
  conectado: Boolean;
  ativos: [{
    bairro: string,
    categoria_cnh: string,
    cep: string,
    cidade: string,
    cnh: string,
    codigo_associado: string,
    complemento: string,
    cpf: string,
    data_cadastro_associado: string,
    data_contrato_associado: string,
    data_expedicao_rg: string,
    data_nascimento: string,
    data_vencimento_habilitacao: string,
    ddd: string,
    ddd_celular: string,
    ddd_celular_aux: string,
    ddd_comercial: string,
    email: string,
    email_auxiliar: string,
    estado: string,
    hora_contrato_associado: string,
    logradouro: string,
    nome: string,
    numero: string,
    orgao_expedidor_rg: string,
    rg_associado: string,
    sexo: string,
    telefone: string,
    telefone_celular: string,
    telefone_celular_aux: string,
    telefone_comercial: string,
    tipo_pessoa: string,
  }];
  inativos: [{
    bairro: string,
    categoria_cnh: string,
    cep: string,
    cidade: string,
    cnh: string,
    codigo_associado: string,
    complemento: string,
    cpf: string,
    data_cadastro_associado: string,
    data_contrato_associado: string,
    data_expedicao_rg: string,
    data_nascimento: string,
    data_vencimento_habilitacao: string,
    ddd: string,
    ddd_celular: string,
    ddd_celular_aux: string,
    ddd_comercial: string,
    email: string,
    email_auxiliar: string,
    estado: string,
    hora_contrato_associado: string,
    logradouro: string,
    nome: string,
    numero: string,
    orgao_expedidor_rg: string,
    rg_associado: string,
    sexo: string,
    telefone: string,
    telefone_celular: string,
    telefone_celular_aux: string,
    telefone_comercial: string,
    tipo_pessoa: string,
  }];
  inadimplentes: [{
    bairro: string,
    categoria_cnh: string,
    cep: string,
    cidade: string,
    cnh: string,
    codigo_associado: string,
    complemento: string,
    cpf: string,
    data_cadastro_associado: string,
    data_contrato_associado: string,
    data_expedicao_rg: string,
    data_nascimento: string,
    data_vencimento_habilitacao: string,
    ddd: string,
    ddd_celular: string,
    ddd_celular_aux: string,
    ddd_comercial: string,
    email: string,
    email_auxiliar: string,
    estado: string,
    hora_contrato_associado: string,
    logradouro: string,
    nome: string,
    numero: string,
    orgao_expedidor_rg: string,
    rg_associado: string,
    sexo: string,
    telefone: string,
    telefone_celular: string,
    telefone_celular_aux: string,
    telefone_comercial: string,
    tipo_pessoa: string,
  }];
  pendentes: [{
    bairro: string,
    categoria_cnh: string,
    cep: string,
    cidade: string,
    cnh: string,
    codigo_associado: string,
    complemento: string,
    cpf: string,
    data_cadastro_associado: string,
    data_contrato_associado: string,
    data_expedicao_rg: string,
    data_nascimento: string,
    data_vencimento_habilitacao: string,
    ddd: string,
    ddd_celular: string,
    ddd_celular_aux: string,
    ddd_comercial: string,
    email: string,
    email_auxiliar: string,
    estado: string,
    hora_contrato_associado: string,
    logradouro: string,
    nome: string,
    numero: string,
    orgao_expedidor_rg: string,
    rg_associado: string,
    sexo: string,
    telefone: string,
    telefone_celular: string,
    telefone_celular_aux: string,
    telefone_comercial: string,
    tipo_pessoa: string,
  }];
  horaToken: string;
  accessData: {
    login: string,
    senha: string,
    tokenHinova: string,
  };
  getAccessData(): void;
  refreshToken(): void;
  refreshAssociado(): void;
  logaHinova(token: string): void;
  getAtivos(token: string, associado: string): void;
  buscaAssociado(token: string, cpf_cnpj: string): void;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [tokenHinova, setTokenHinova] = useState('');
  const [loading, setLoading] = useState(true);
  const [associadoLogado, setAssociadoLogado] = useState();
  const [tokenAssociadoHinova, setTokenAssociadoHinova] = useState('');
  const [user, setUser] = useState();
  const [conectado, setConectado] = useState(false);
  const [ativos, setAtivos] = useState([{
    bairro: '',
    categoria_cnh: '',
    cep: '',
    cidade: '',
    cnh: '',
    codigo_associado: '',
    complemento: '',
    cpf: '',
    data_cadastro_associado: '',
    data_contrato_associado: '',
    data_expedicao_rg: '',
    data_nascimento: '',
    data_vencimento_habilitacao: '',
    ddd: '',
    ddd_celular: '',
    ddd_celular_aux: '',
    ddd_comercial: '',
    email: '',
    email_auxiliar: '',
    estado: '',
    hora_contrato_associado: '',
    logradouro: '',
    nome: '',
    numero: '',
    orgao_expedidor_rg: '',
    rg_associado: '',
    sexo: '',
    telefone: '',
    telefone_celular: '',
    telefone_celular_aux: '',
    telefone_comercial: '',
    tipo_pessoa: '',
  }]);
  const [inativos, setInativos] = useState();
  const [pendentes, setPendentes] = useState();
  const [inadimplentes, setInadimplentes] = useState();
  const [horaToken, setHoraToken] = useState('');
  const [accessData, setAccessData] = useState({
    login: '',
    senha: '',
    tokenHinova: '',
  });
  const {signOutVisitante} = useContext(VisitanteContext);

  async function getAccessData() {
    await CuidarService.getDataAcess()
    .then((response) => {
      setAccessData(response);
      setTokenHinova(response.tokenHinova);
      logaHinova(response);
    })
  };

  async function logaHinova(dataAccess: { login: string, senha: string, tokenHinova: string }) {
    await HinovaService.signIn({body: { usuario: dataAccess.login, senha: dataAccess.senha, token: dataAccess.tokenHinova }})
    .then((response: {mensagem: string, token_usuario: string}) => {
      setTokenAssociadoHinova(response.token_usuario);

      if (associadoLogado) {
        buscaAssociado(response.token_usuario, associadoLogado);
      } else {
        getUser(response.token_usuario);
      }
    });
    setHoraToken(moment().format('HH:MM'));
  };


  async function refreshToken() {
    await HinovaService.signIn({body: { usuario: accessData.login, senha: accessData.senha, token: accessData.tokenHinova }})
    .then((response) => {
      setTokenAssociadoHinova(response.token_usuario);
    })
  }

  async function refreshAssociado() {
    const cpfCnpj: string = user.cpf.length === 18 ? user.cpf.replace('/', '.') : cpfFormat(user.cpf);

    await HinovaService.getAssociado({token: tokenAssociadoHinova, cpfCnpj: cpfCnpj})
    .then((response) => {
      setUser(response)
    })
  }

  async function getUser(token: string) {
    const userStoraged = await AsyncStorage.getItem('@CUIDAR:AssociadoLogado');

    if (userStoraged) {
      const userResponse = JSON.parse(userStoraged);
      const cpfAdmin = cpfFormat(userResponse.cpf);

      await buscaAssociado(token, cpfAdmin);

      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  async function getAtivos(accessData: { token: string, cpfAdmin: string }) {
    setLoading(true);
    if (cpfFormat(accessData.cpfAdmin) === '070.103.056-92') {

      await HinovaService.getAssociados({ codigo_situacao: 1, token: accessData.token })
      .then((response) => setAtivos(response.associados))
      .catch(() => Alert.alert('Atenção', 'Não foi possível carregar os itens ativos'));
      getInativos({token: accessData.token, cpfCnpj: accessData.cpfAdmin});
    }
  };

  async function getInativos(accessData: {token: string, cpfCnpj: string}) {

    await HinovaService.getAssociados({ codigo_situacao: 2, token: accessData.token })
    .then((response) => {
      setInativos(response.associados);
    })
    .catch(() => Alert.alert('Atenção', 'Não foi possível buscar os itens inativos'));
    getPendentes({token: accessData.token, cpfCnpj: accessData.cpfCnpj});
  }

  async function getPendentes(accessData: {token: string, cpfCnpj: string}) {

    await HinovaService.getAssociados({ codigo_situacao: 3, token: accessData.token })
    .then((response) => {
      setPendentes(response.associados);
    })
    .catch(() => Alert.alert('Atenção', 'Não foi possível buscar os itens inativos'));
    getInadimplentes({token: accessData.token, cpfCnpj: accessData.cpfCnpj});
  }

  async function getInadimplentes(accessData: {token: string, cpfCnpj: string}) {

    await HinovaService.getAssociados({ codigo_situacao: 4, token: accessData.token })
    .then((response) => {
      setInadimplentes(response.associados);
    })
    .catch(() => Alert.alert('Atenção', 'Não foi possível buscar os itens inadimplentes'));

    buscaBoletoVencimento({token: accessData.token, cpfCnpj: accessData.cpfCnpj, response: user});
  }

  async function buscaAssociado(token: string, cpfCnpj: string) {

    setLoading(true);

    const cpfCnpjType: string = cpfCnpj.length === 18 ? cpfCnpj.replace('/', '.') : cpfFormat(cpfCnpj);

    if (cpfCnpjType === '070.103.056-92') {
      await getAtivos({token, cpfAdmin: cpfCnpjType});
    }

    await HinovaService.getAssociado({token, cpfCnpj: cpfCnpjType})
    .then((response) => {
      if (response.codigo_situacao === Number(2)) {
        Alert.alert(
          'Acesso negado.',
          'Associado inativo no sistema. Por favor, entre em contato com a CUIDAR.',
          [{
            text: 'Chamar no WhatsApp',
            onPress: () => {
              Linking.openURL(
                `https://api.whatsapp.com/send?phone=553141122430&text=Olá, sou o *${response.nome}*, estava no *APP da CUIDAR* e não estou conseguindo fazer login.`,
              );
            }
          }],
        );
      }

      if (response.codigo_situacao === Number(3)) {
        Alert.alert(
          'Acesso negado.',
          'Contrato pendente de ativação. Por favor, entre em contato com a CUIDAR.',
          [{
            text: 'Chamar no WhatsApp',
            onPress: () => {
              Linking.openURL(
                `https://api.whatsapp.com/send?phone=553141122430&text=Olá, sou o *${response.nome}*, estava no *APP da CUIDAR* e não estou conseguindo fazer login.`,
              );
            }
          }],
        );
      }

      if (response.codigo_situacao === Number(4)) {
        Alert.alert(
          'Acesso negado.',
          'Por favor entre em contato comm a CUIDAR para regularizar a situação.',
          [{
            text: 'Chamar no WhatsApp',
            onPress: () => {
              Linking.openURL(
                `https://api.whatsapp.com/send?phone=553141122430&text=Olá, sou o *${response.nome}*, estava no *APP da CUIDAR* e não estou conseguindo fazer login.`,
              );
            }
          }],
        );
      }

      if (response.codigo_situacao === Number(1)) {
        setUser(response);
        setLoading(false);
        buscaBoletoVencimento({token, cpfCnpj: cpfCnpjType, response})
      }

      if (response.mensagem === 'Não aceitável') {
        setLoading(false);
        return Alert.alert(
          'Erro ao entrar.',
          'Confira os dados digitados e tente novamente.'
        );
      }
    })
    .catch((error) => Alert.alert('Error', error));
    setLoading(false);
  }

  async function buscaBoletoVencimento(accessData: {token: string, cpfCnpj: string, response: {}}) {
    const dataVencimentoOriginalInicial = moment().subtract(30, 'days').format('DD/MM/YYYY');
    const hoje = moment().add(30, 'days').format('DD/MM/YYYY');
    const body = {
      cpf_associado: accessData.cpfCnpj,
      data_vencimento_original_inicial: dataVencimentoOriginalInicial,
      data_vencimento_original_final: hoje,
    };

    await HinovaService.getDataVencimento({ token: accessData.token, body })
    .then((response) => {
      const [boleto] = response;
      if (user) {
        sendAssociadoData({boleto, user: accessData.response});
      }
    })
    .catch(() => console.log('error envio dados firestore'));
    setLoading(false);
  }

  useEffect(() => {
    function VerificaInternet() {
      NetInfo.fetch().then(state => {
        if ((state.isConnected = true)) {
          setConectado(true);
        }
      });
    }
    VerificaInternet();
    getAccessData();
  }, []);

  async function signOut() {
    setLoading(true);
    await AsyncStorage.clear()
    .then(() => {
      setUser(null);
      setAssociadoLogado(null);
      signOutVisitante();
    })
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        tokenHinova,
        signed: !!user,
        user: user,
        loading,
        conectado,
        associadoLogado,
        tokenAssociadoHinova,
        ativos,
        inativos,
        inadimplentes,
        pendentes,
        horaToken,
        accessData,
        logaHinova,
        getAtivos,
        refreshToken,
        refreshAssociado,
        getAccessData,
        buscaAssociado,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
