import React, {useContext, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';

import AuthContext from '../../../../contexts/authContext';
import ModalContext from '../../../../contexts/modalContext';

import HinovaService from '../../../../services/HinovaService';

import {Button} from '../../../../components/Button';
import ModalBoletos from '../Modal';

import {Container, Text, View, ButtonCard} from './styles';

export default function Card({props}) {
  const [associado, setAssociado] = useState(props);
  const {tokenAssociadoHinova, refreshAssociado, refreshToken} = useContext(AuthContext);
  const {modal, changeModal} = useContext(ModalContext);
  const [situacaoAssociado, setSituacaoAssociado] = useState(associado.codigo_situacao);
  const [boletos, setBoletos] = useState([]);
  const [linkBoleto, setLinkBoleto] = useState('');

  useEffect(() => {
    buscaBoletos();
  }, []);

  async function buscaBoletos() {
    const token = await refreshToken();
    const dataVencimentoOriginalInicial = moment().subtract(160, 'days').format('DD/MM/YYYY');
    const hoje = moment().add(30, 'days').format('DD/MM/YYYY');
    const bodyHinovaBoleto = {
      cpf_associado: associado.cpf,
      data_vencimento_original_inicial: String(dataVencimentoOriginalInicial),
      data_vencimento_original_final: String(hoje),
    };

    await HinovaService.getBoletos({token: String(token), body: bodyHinovaBoleto})
    .then((response) => {

      if(response.mensagem === 'Não aceitável') {
        Alert.alert('Erro',  'Não foi possível carregar os boletos deste associado.');
      };

      setBoletos(response.sort((a: {data_vencimento: string}, b: {data_vencimento: string}) => a.data_vencimento > b.data_vencimento ? -1 : 1));
    })
    .catch(() => Alert.alert('Erro',  'Alguma coisa deu errado. Tente novamente em instantes.'));
  }

  async function buscaPDF(nossoNumero: number) {
    const token = await refreshToken();

    await HinovaService.getPdfBoleto({token: String(token), nossoNumero: nossoNumero})
    .then((response) => {

      if (response.error) {
        Alert.alert('Erro',  'Alguma coisa deu errado. Tente novamente em instantes.');
      }

      setLinkBoleto(response.link_boleto);
    })
    .finally(() => changeModal({modalName: 'modalBoletos', active: true, device: 0}));
  }

  async function handleChangeSituacaoAssociado(data: number) {
    const token = await refreshToken();

    await HinovaService.updateSituacaoAssociado({token: String(token), situacao: data, codigo_associado: associado.codigo_associado })
    .then((response) => {
      if (response.mensagem === 'Alterado') {
        Alert.alert('Sucesso', 'Associado alterado com sucesso.');
        setSituacaoAssociado(data);
      } else {
        Alert.alert('Atenção', 'Erro ao alterar o associado. Tente novamente.')
      }
    });

    await HinovaService.getAssociado({token: String(token), cpfCnpj: associado.cpf}).then((response) => setAssociado(response))
  }

  async function handleChangeSituacaoVeiculo(data: {situacao: number, codigo_veiculo: number}) {
    const token = await refreshToken();

    async function changeVeiculo() {
      await HinovaService.updateSituacaoVehicle({token: String(token), situacao: data.situacao, codigo_veiculo: data.codigo_veiculo})
      .then((response) => {
        if (response.mensagem === 'Não aceitável') {
          Alert.alert('Atenção', 'Erro ao alterar o associado. Tente novamente.')
        }
        if (response.mensagem === 'Alterado') {
          Alert.alert('Sucesso', 'Associado alterado com sucesso.')
        }
      })
    }

    async function refreshVeiculo() {
      const token = await refreshToken();

      await HinovaService.getAssociado({token: String(token), cpfCnpj: associado.cpf})
      .then((response) => setAssociado(response));
    }

    await changeVeiculo();
    await refreshVeiculo();
  }

  const copyToClipboard = (index: string) => {
    const copy = boletos[index].linha_digitavel;
    Clipboard.setString(copy);
    Alert.alert('Tudo certo!', 'Código de barras copiado com sucesso.');
  };

  return (
    <Container>
      <Text
        nomeAssociado
        ativo={associado.descricao_situacao === 'ATIVO'}
        inativo={associado.descricao_situacao === 'INATIVO'}
        pendente={associado.descricao_situacao === 'PENDENTE'}
        inadimplente={associado.descricao_situacao === 'INADIMPLENTE'}
      >
        {associado.nome} - {associado.descricao_situacao}
      </Text>
      <View hrOrange/>
      <Text title>
        {associado.veiculos.length > 1 ? 'Veículos' : 'Veículo'} do Associado
      </Text>
      {associado.veiculos
      .sort((a, b) => a.codigo_situacao > b.codigo_situacao ? 1 : -1)
      .map((veiculo, index) => (
        <ButtonCard
          key={index}
          onPress={() => handleChangeSituacaoVeiculo({
            situacao: veiculo.situacao === 'ATIVO' ? 2 : 1,
            codigo_veiculo: veiculo.codigo_veiculo,
          })}
        >
          <IconFA name="list" size={20} color="#cccccc"/>
          <View placaSituacao>
            <Text
              placa
              ativo={veiculo.situacao === 'ATIVO'}
              inativo={veiculo.situacao === 'INATIVO'}
              pendente={veiculo.situacao === 'PENDENTE'}
              inadimplente={veiculo.situacao === 'INADIMPLENTE'}
            >
              {veiculo.placa ? veiculo.placa : veiculo.chassi}
            </Text>
            <Text
              situacao
              ativo={veiculo.situacao === 'ATIVO'}
              inativo={veiculo.situacao === 'INATIVO'}
              pendente={veiculo.situacao === 'PENDENTE'}
              inadimplente={veiculo.situacao === 'INADIMPLENTE'}
            >
              {veiculo.situacao}
            </Text>
          </View>
          <Text modelo>{veiculo.descricao_modelo}</Text>
        </ButtonCard>
      ))}

      <Text title>{boletos.length > 1 ? 'Boletos' : 'Boleto'} do Associado</Text>
      {boletos.length < 1 && (<Text semBoletos>Nenhum boleto para o Associado</Text>)}
      {boletos && (
        boletos.map((boleto: {linha_digitavel: string, situacao_boleto: string, valor_boleto: string, tipo_boleto: string, veiculos: [], nosso_numero: number, data_vencimento: string, }, index) => {
          const status = boleto.situacao_boleto === 'ABERTO' ? 'AGUARDANDO PAGAMENTO' : boleto.situacao_boleto === 'BAIXADO' || 'BAIXADO C/ PENDÊNCIA' ? 'BOLETO PAGO' : boleto.situacao_boleto === 'ABERTO' &&  moment().format('X') < moment(boleto.data_vencimento).format('X') ? 'BOLETO ATRASADO' : boleto.situacao_boleto === 'EXCLUIDO' ? 'BOLETO EXCLUÍDO' : null
          return (
            <ButtonCard onPress={() => buscaPDF(boleto.nosso_numero)} key={index}>
              <Text title>{status}</Text>
              <IconFA name={status === 'AGUARDANDO PAGAMENTO' ? 'barcode' : status === 'BOLETO PAGO' ? 'check' : 'exclamation-triangle'} size={30} color={status === 'AGUARDANDO PAGAMENTO' ? '#999999' : status === 'BOLETO PAGO' ? '#40C351' : '#e60000'} />
            <View copyView>
              <Text barCode>{boleto.linha_digitavel}</Text>
              {status === ('AGUARDANDO PAGAMENTO' || 'BOLETO ATRASADO') && <ButtonCard onPress={copyToClipboard}><Icon name={'copy'} size={30} color={'#0c71c3'} /></ButtonCard>}
            </View>
              <Text valor>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(boleto.valor_boleto)}
              </Text>
              <View dateView>
                <IconFA name={'calendar'} size={15} color={'#e60000'} />
                <Text vencimento>Vencimento em: {moment(boleto.data_vencimento).format('DD/MM/YYYY')}</Text>
              </View>
              <Text tipo>{boleto.tipo_boleto}</Text>
              {boleto.veiculos.map((placa: {codigo_veiculo: number, placa: string}) => (
                <Text placas key={placa.codigo_veiculo}>{placa.placa}</Text>
              ))}
            </ButtonCard>
          )}
        ))
      }
      {situacaoAssociado === 1 ? (
        <View buttons>
          <Button danger onPress={() => handleChangeSituacaoAssociado(2)}>
            <Text buttons>Inativar associado</Text>
          </Button>
          <Button alert onPress={() => handleChangeSituacaoAssociado(1)}>
            <Text buttons>Associado inadimplente</Text>
          </Button>
        </View>
      ) : (
      <Button activate onPress={() => handleChangeSituacaoAssociado(1)}>
        <Text buttons>Ativar Associado</Text>
      </Button>
      )}
      <ModalBoletos visible={modal.modalName === 'modalBoletos' && modal.active === true} linkBoleto={linkBoleto}/>
    </Container>
  )
}
