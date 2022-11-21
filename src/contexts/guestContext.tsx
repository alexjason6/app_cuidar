import React, {createContext, useState, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

interface VisitanteContextData {
  veiculoVisitante: Object;
  nome: String;
  visitante: Object;
  loadingVisitante: boolean;
  conectado: Boolean;
  dadosCompletos: {
    tipo: 'motos';
    visitante: {
      nome: '';
    };
    veiculo: {
      adesao: '';
      valorMensalidade: '';
      ano_modelo: '';
      combustivel: '';
      fipe_codigo: '';
      marca: '';
      modelo: '';
      preco: '';
      referencia: '';
    };
    produtos: {
      assistencia: '';
      protecaoCasco: '';
      vidros: '';
      carroReserva: '';
      terceiros: '';
      clubeCerto: '';
      rastreamento: '';
      administrativa: '';
    };
  };
  salvaDadosVisitante(dadosVisitanteFinal): void;
  buscaNomeVisitante(): void;
  signOutVisitante(): void;
  atualizaVeiculo(resultadoFipe): void;
}

const VisitanteContext = createContext<VisitanteContextData>(
  {} as VisitanteContextData,
);

export const VisitanteProvider: React.FC = ({children}) => {
  const [nome, setNome] = useState<string>(null);
  const [veiculoVisitante, setVeiculoVisitante] = useState<object>();
  const [loadingVisitante, setLoading] = useState<boolean>(true);
  const [dadosCompletos, setDadosCompletos] = useState();
  const [visitante, setVisitante] = useState<object>();
  const [conectado, setConectado] = useState<boolean>(false);

  useEffect(() => {
    function VerificaInternet() {
      NetInfo.fetch().then(state => {
        if ((state.isConnected = true)) {
          setConectado(false);
        }
      });
    }
    VerificaInternet();
    atualizaVeiculo();
    buscaNomeVisitante().then(() => {
      setLoading(false);
    });
  }, []);

  async function buscaNomeVisitante() {
    const NomeUser = await AsyncStorage.getItem('@CUIDAR:nomevisitante');
    const visitanteUser = await AsyncStorage.getItem('@CUIDAR:dadosvisitante');
    const dadosCotacao = await AsyncStorage.getItem('@CUIDAR:dadosCompletos');

    setNome(NomeUser);
    setVisitante(JSON.parse(visitanteUser));
    setDadosCompletos(JSON.parse(dadosCotacao));
  }

  async function salvaDadosVisitante(dadosVisitanteFinal) {
    await AsyncStorage.setItem(
      '@CUIDAR:dadosvisitante',
      JSON.stringify(dadosVisitanteFinal),
    )
      .then(() => {
        setNome(dadosVisitanteFinal.nome);
        setVisitante(dadosVisitanteFinal);
      });
  }

  async function atualizaVeiculo() {
    const dados = await AsyncStorage.getItem('@CUIDAR:veiculoVisitante');
    const recuperaVeiculo = JSON.parse(dados);
    setVeiculoVisitante(recuperaVeiculo);
  }

  function signOutVisitante() {
    setLoading(true);
    setNome(null);
    setVeiculoVisitante(null);
    setLoading(false);
    setVisitante(null);
  }

  return (
    <VisitanteContext.Provider
      value={{
        veiculoVisitante,
        nome,
        visitante,
        loadingVisitante,
        conectado,
        dadosCompletos,
        salvaDadosVisitante,
        atualizaVeiculo,
        signOutVisitante,
        buscaNomeVisitante,
      }}>
      {children}
    </VisitanteContext.Provider>
  );
};

export default VisitanteContext;
