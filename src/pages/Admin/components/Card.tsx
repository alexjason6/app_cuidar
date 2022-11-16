import React, {useContext, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert, ScrollView, Modal, StatusBar, Share} from 'react-native';
import CardView from 'react-native-cardview';

import AuthContext from '../../../contexts/auth';
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';

export default function Card({props}) {
  const [associado, setAssociado] = useState(props);
  const {tokenAssociadoHinova} = useContext(AuthContext);
  const [situacaoAssociado, setSituacaoAssociado] = useState(associado.codigo_situacao);
  const [error, setError] = useState(false);
  const [boletos, setBoletos] = useState([]);
  const [linkBoleto, setLinkBoleto] = useState('');
  const [modal, setModal] = useState(false);
  const  headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenAssociadoHinova}`,
  };

  useEffect(() => {
    buscaBoletos();
  }, []);

  console.log(boletos)

  async function buscaBoletos() {
    const dataVencimentoOriginalInicial = moment().subtract(160, 'days').format('DD/MM/YYYY');
    const hoje = moment().add(30, 'days').format('DD/MM/YYYY');
    const bodyHinovaBoleto = {
      cpf_associado: associado.cpf,
      data_vencimento_original_inicial: String(dataVencimentoOriginalInicial),
      data_vencimento_original_final: String(hoje),
    };
    await fetch(
      'https://api.hinova.com.br/api/sga/v2/listar/boleto-associado-veiculo',
      {
        method: 'post',
        body: JSON.stringify(bodyHinovaBoleto),
        headers: headers,
      },
    )
    .then((response) => response.json())
    .then((data) => {
      if(data.mensagem === 'Não aceitável') {
        setError(true);
      };
      setBoletos(data.sort((a, b) => a.data_vencimento > b.data_vencimento ? -1 : 1));
    })
    .catch(() => setError(true));
  }

  const copyToClipboard = (index: string) => {
    const copy = boletos[index].linha_digitavel;
    Clipboard.setString(copy);
    Alert.alert('Tudo certo!', 'Código de barras copiado com sucesso.');
  };

  async function buscaPDF(nossoNumero: string) {
    await fetch(
      `https://api.hinova.com.br/api/sga/v2/buscar/boleto/${nossoNumero}`,
      {
        method: 'get',
        headers: headers
      },
    )
    .then((response) => response.json())
    .then((data) => setLinkBoleto(data.link_boleto))
    .then(() => setModal(true));
  }

  async function handleChangeSituacaoAssociado(data) {
    await fetch(`https://api.hinova.com.br/api/sga/v2/associado/alterar-situacao-para/${data.situacao}/${associado.codigo_associado}`,
    {
      method: 'get',
      headers: headers,
    },)
    .then((response) => response.json())
    .then(() => Alert.alert('Sucesso', 'Associado alterado com sucesso.'))
    .catch(() => Alert.alert('Atenção', 'Erro ao alterar o associado. Tente novamente.'))
    .then(() => setSituacaoAssociado(data));
  }

  async function handleChangeSituacaoVeiculo({data}) {
    async function changeVeiculo() {
      await fetch(`https://api.hinova.com.br/api/sga/v2/veiculo/alterar-situacao-para/${data.situacao}/${data.codigo_veiculo}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenAssociadoHinova}`,
      },
    },)
    .then((response) => response.json())
    .then((data) => {
      if (data.mensagem === 'Não aceitável') {
        Alert.alert('Atenção', 'Erro ao alterar o associado. Tente novamente.')
      }
    })
    .catch(() => Alert.alert('Atenção', 'Erro ao alterar o associado. Tente novamente.'));
  }

    async function refreshVeiculo() {
        fetch(
        `https://api.hinova.com.br/api/sga/v2/associado/buscar/${associado.cpf}`,
        {
          method: 'get',
          headers: headers,
        },
      )
      .then((response) => response.json())
      .then((dataResponse) => setAssociado(dataResponse));
    }

    await changeVeiculo();
    await refreshVeiculo();
  }

  async function compartilha() {
    await Share.share({
     message: 'Boleto CUIDAR.',
     url: linkBoleto,
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.nomeAssociado}>{associado.nome}</Text>
      <View style={styles.hrOrange} />
      <Text style={styles.titleVeiculo}>{associado.veiculos.length > 1 ? 'Veículos' : 'Veículo'} do Associado</Text>
      {associado.veiculos.sort((a, b) => a.codigo_situacao > b.codigo_situacao ? 1 : -1).map((veiculo, index) => (
        <View key={index}>
          <CardView cardElevation={5}>
            <TouchableOpacity style={styles.buttonPlaca} onPress={() => handleChangeSituacaoVeiculo({data: {situacao: veiculo.situacao === 'ATIVO' ? 2 : 1, codigo_veiculo: veiculo.codigo_veiculo, placa: veiculo.placa, chassi: veiculo.chassi}})}>
              {<IconFA name="list" size={20} color="#FF9800"/>}
              <View style={styles.placaSituacao}>
                <Text style={veiculo.situacao === 'ATIVO' ? styles.placa : styles.placaInativa}>{veiculo.placa ? veiculo.placa : veiculo.chassi}</Text>
                <Text style={veiculo.situacao === 'ATIVO' ? styles.ativo : styles.inativo}>{veiculo.situacao}</Text>
              </View>
              <Text style={veiculo.situacao === 'ATIVO' ? styles.modelo : styles.modeloInativo}>{veiculo.descricao_modelo}</Text>
            </TouchableOpacity>
          </CardView>
        </View>
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
    </ScrollView>
  )
}