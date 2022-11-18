import React, {useContext, useState, useEffect} from 'react';
import {TouchableOpacity, Alert, Modal, StatusBar, Share} from 'react-native';
import CardView from 'react-native-cardview';
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';

import AuthContext from '../../../contexts/auth';

import HinovaService from '../../../services/HinovaService';

import styles, {Container, Text, View, Button} from './styles';

export default function Card({props}) {
  const [associado, setAssociado] = useState(props);
  const {tokenAssociadoHinova} = useContext(AuthContext);
  const [situacaoAssociado, setSituacaoAssociado] = useState(associado.codigo_situacao);
  const [error, setError] = useState(false);
  const [boletos, setBoletos] = useState([]);
  const [linkBoleto, setLinkBoleto] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    buscaBoletos();
  }, []);

  async function buscaBoletos() {
    const dataVencimentoOriginalInicial = moment().subtract(160, 'days').format('DD/MM/YYYY');
    const hoje = moment().add(30, 'days').format('DD/MM/YYYY');
    const bodyHinovaBoleto = {
      cpf_associado: associado.cpf,
      data_vencimento_original_inicial: String(dataVencimentoOriginalInicial),
      data_vencimento_original_final: String(hoje),
    };

    await HinovaService.getBoletos({token: String(tokenAssociadoHinova), body: bodyHinovaBoleto})
    .then((response) => {
      if(response.mensagem === 'Não aceitável') {
        setError(true);
      };
      setBoletos(response.sort((a: {data_vencimento: string}, b: {data_vencimento: string}) => a.data_vencimento > b.data_vencimento ? -1 : 1));
    })
    .catch(() => setError(true));
  }

  async function buscaPDF(nossoNumero: number) {
    await HinovaService.getPdfBoleto({token: String(tokenAssociadoHinova), nossoNumero: nossoNumero})
    .then((response) => setLinkBoleto(response.link_boleto))
    .then(() => setModal(true));
  }

  async function handleChangeSituacaoAssociado(data: number) {
    await HinovaService.updateSituacaoAssociado({token: String(tokenAssociadoHinova), situacao: data, codigo_associado: associado.codigo_associado })
    .then((response) => {
      if (response.mensagem === 'Alterado') {
        Alert.alert('Sucesso', 'Associado alterado com sucesso.');
        setSituacaoAssociado(data);
      } else {
        Alert.alert('Atenção', 'Erro ao alterar o associado. Tente novamente.')
      }
    });
  }

  async function handleChangeSituacaoVeiculo(data: {situacao: number, codigo_veiculo: number}) {
    async function changeVeiculo() {
      await HinovaService.updateSituacaoVehicle({token: String(tokenAssociadoHinova), situacao: data.situacao, codigo_veiculo: data.codigo_veiculo})
      .then((response) => {
        console.log(response)
        if (response.mensagem === 'Não aceitável') {
          Alert.alert('Atenção', 'Erro ao alterar o associado. Tente novamente.')
        }
        if (response.mensagem === 'Alterado') {
          Alert.alert('Sucesso', 'Associado alterado com sucesso.')
        }
      })
    }

    async function refreshVeiculo() {
      await HinovaService.getAssociado({token: String(tokenAssociadoHinova), cpfCnpj: associado.cpf})
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

  async function compartilha() {
    await Share.share({
     message: 'Boleto CUIDAR.',
     url: linkBoleto,
    });
  }


  console.log(associado)
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
        <Button
          style={styles.buttonPlaca}
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
        </Button>
      ))}

      <Text style={styles.titleVeiculo}>{boletos.length > 1 ? 'Boletos' : 'Boleto'} do Associado</Text>
      {boletos.length < 1 && (<Text>Nenhum boleto para o Associado</Text>)}
      {boletos && (
        boletos.map((boleto, index) => (
          <CardView cardElevation={5} key={index}>
            <TouchableOpacity style={styles.buttonBoleto} onPress={() => buscaPDF(boleto.nosso_numero)} >
              {boleto.situacao_boleto === 'BAIXADO' ? (
                  <IconFA name="thumbs-up" size={25} color={'#ff9800'} />
                ) : boleto.situacao_boleto === 'ABERTO' &&
                  moment().format('X') <=
                    moment(boleto.data_vencimento).format('X') ? (
                  <IconFA name="barcode" size={25} color={'#666666'} />
                ) : boleto.situacao_boleto === 'ABERTO' &&
                  moment().format('X') >
                    moment(boleto.data_vencimento).format('X') ? (
                  <Icon name="alert-triangle" size={30} color={'#e60000'} />
                ) : null
              }
              <View style={styles.linhaDigitavel}>
                <Text style={styles.digitavel}>
                  {boleto.linha_digitavel ===
                  'Não foi possível disponibilizar esta informação pois o boleto se encontra na situação BAIXADO'
                    ? null
                    : boleto.linha_digitavel}
                </Text>
                {boleto.situacao_boleto === 'BAIXADO' ? null : (
                  <TouchableOpacity
                    style={styles.iconCopy}
                    onPress={() => {
                      copyToClipboard(index);
                    }}>
                    <Icon name="copy" size={28} color={'#0c71c3'} />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={boleto.situacao_boleto !== 'ABERTO' ? styles.valorBoleto : styles.valorBoletoAberto}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(boleto.valor_boleto)}
              </Text>
              <Text style={styles.situacaoBoleto}>
                {moment().format('X') >
                  moment(boleto.data_vencimento).format('X') &&
                boleto.situacao_boleto === 'ABERTO'
                  ? 'BOLETO ATRASADO'
                  : boleto.situacao_boleto !== 'ABERTO' &&
                    boleto.data_pagamento !== null
                  ? `Boleto pago em ${moment(boleto.data_pagamento).format(
                      'DD/MM/YYYY',
                    )}`
                  : 'Aguardando pagamento'}
              </Text>
              <Text style={styles.vencimentoBoleto}>
                <Icon name="calendar" size={16} color={'#db2800'} />{' '}
                {moment(boleto.data_vencimento).format('DD/MM/YYYY')}
              </Text>
              <Text style={boleto.situacao_boleto !== 'ABERTO' ? styles.tipoBoleto : styles.tipoBoletoAberto}>
                {boleto.tipo_boleto}
              </Text>
            </TouchableOpacity>
          </CardView>
        ))
      )}
      {situacaoAssociado === 1 ? (
      <TouchableOpacity style={styles.buttonDesativar} onPress={() => handleChangeSituacaoAssociado(2)}>
        <Text style={styles.textButton}>Inativar Associado</Text>
      </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonAtivar} onPress={() => handleChangeSituacaoAssociado(1)}>
        <Text style={styles.textButton}>Ativar Associado</Text>
      </TouchableOpacity>
      )}
      <Modal visible={modal} animationType={'fade'} style={styles.viewPDF}>
        <StatusBar barStyle={'dark-content'} animated />
        <View style={{height:100, backgroundColor: '#ff9800'}} />
        <WebView allowFileAccessFromFileURLs source={{uri:linkBoleto}} style={styles.viewBoleto}/>
        <TouchableOpacity onPress={compartilha} style={styles.btnCompartilha}>
          <Text style={{textAlign: 'center', color: '#fff', fontWeight: 'bold'}}>Compartilhar PDF</Text>
        </TouchableOpacity>
        <View style={styles.btnFechaModal}>
          <TouchableOpacity
            style={styles.fechaModal}
            onPress={() => {
              setModal(false);
            }}>
            <Icon name="x" size={18} color={'#FF9800'} />
          </TouchableOpacity>
        </View>
      </Modal>
    </Container>
  )
}
