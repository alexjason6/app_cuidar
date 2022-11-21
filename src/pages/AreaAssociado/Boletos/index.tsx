import React, {useContext, useState, useEffect, useCallback} from 'react';
import {RefreshControl} from 'react-native';
import moment from 'moment';

import AuthContext from '../../../contexts/authContext';
import ModalContext from '../../../contexts/modalContext';

import {Button} from '../../../components/Button';
import Card from './components/Card';
import ModalBoletos from './components/modalBoletos';
import HinovaService from '../../../services/HinovaService';
import Error from './components/Error';

import {Container, Content, Text} from './styles';

export default function MyWebComponent() {
  const {user, tokenAssociadoHinova} = useContext(AuthContext);
  const {changeModal} = useContext(ModalContext);
  const [error, setError] = useState(false);
  const [boletos, setBoletos] = useState<[]>([]);
  const [linkBoleto, setLinkBoleto] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    buscaBoletos();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    const wait = async function pegaDevices() {
      buscaBoletos();
    };
    wait().then(() => setRefreshing(false));
  }, [buscaBoletos]);

  async function buscaBoletos() {
    const dataVencimentoOriginalInicial = moment().subtract(160, 'days').format('DD/MM/YYYY');
    const hoje = moment().add(30, 'days').format('DD/MM/YYYY');
    const bodyHinovaBoleto = {
      cpf_associado: user.cpf,
      data_vencimento_original_inicial: String(dataVencimentoOriginalInicial),
      data_vencimento_original_final: String(hoje),
    };
    await HinovaService.getBoletos({token: String(tokenAssociadoHinova), body: bodyHinovaBoleto})
    .then((response) => {
      if(response.mensagem === ('Não aceitável' || 'Acesso não autorizado. Verique seu token de acesso')) {
        setError(true);
      };
      setBoletos(response.sort((a, b) => a.data_vencimento > b.data_vencimento ? -1 : 1));
      setError(false);
    })
    .catch(() => setError(true));
  }

  async function buscaPDF(nossoNumero: number) {
    await HinovaService.getPdfBoleto({token: String(tokenAssociadoHinova), nossoNumero})
    .then((response) => {
      setLinkBoleto(response.link_boleto);
      changeModal({modalName: 'modalBoleto', active: true, device: 0});
    });
  }

  if (error) {
    return (
      <Content refreshControl={
        <RefreshControl
          title="Arraste para baixo para atualizar os dados"
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={'#444444'}
          titleColor={'#444444'}
        />
      } >
        <Error />
      </Content>
    );
  }

  return (
    <Container>
      <Content>
        {boletos.map((boleto: {linha_digitavel: string, situacao_boleto: string, valor_boleto: string, tipo_boleto: string, veiculos: [], nosso_numero: number, data_vencimento: string}, index) => (
          <Card
            index={index}
            key={index}
            linhaDigitavel={boleto.linha_digitavel}
            valor={boleto.valor_boleto}
            status={boleto.situacao_boleto === 'ABERTO' ? 'AGUARDANDO PAGAMENTO' : boleto.situacao_boleto === 'BAIXADO' || 'BAIXADO C/ PENDÊNCIA' ? 'BOLETO PAGO' : boleto.situacao_boleto === 'ABERTO' &&  moment().format('X') < moment(boleto.data_vencimento).format('X') ? 'BOLETO ATRASADO' : boleto.situacao_boleto === 'EXCLUIDO' ? 'BOLETO EXCLUÍDO' : null}
            tipo={boleto.tipo_boleto}
            placas={boleto.veiculos}
            vencimento={boleto.data_vencimento}
          >
            <Button boleto onPress={() => buscaPDF(boleto.nosso_numero)}>
              <Text>Visualizar Boleto</Text>
            </Button>
          </Card>
        ))}
      </Content>
      <ModalBoletos linkBoleto={linkBoleto} />
    </Container>
  );
}
