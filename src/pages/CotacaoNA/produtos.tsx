import React, {useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VisitanteContext from '../../contexts/guestContext';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'; // or any other locale you need

const ProdutosCotacaoNA: React.FC = () => {
  const {visitante, dadosCompletos} = useContext(VisitanteContext);
  const navigation = useNavigation();
  const route = useRoute();
  const resultadoFipe = route.params.responseData;
  const tipoVeiculo = route.params.tipoVeiculo;
  const [casco, setCasco] = useState<number>(0);
  const [cascoCheck, setCascoCheck] = useState(true);
  const protecaoCasco = 0.01;
  const [reserva7, setReserva7] = useState(0);
  const [reserva7Check, setReserva7Check] = useState<Boolean>(false);
  const [reserva14, setReserva14] = useState(0);
  const [reserva14Check, setReserva14Check] = useState<Boolean>(false);
  const [reserva30, setReserva30] = useState(0);
  const [reserva30Check, setReserva30Check] = useState<Boolean>(false);
  const [terceiros20, setTerceiros20] = useState(0);
  const [terceiros20Check, setTerceiros20Check] = useState<Boolean>(false);
  const [terceiros30, setTerceiros30] = useState(0);
  const [terceiros30Check, setTerceiros30Check] = useState<Boolean>(true);
  const [terceiros50, setTerceiros50] = useState(0);
  const [terceiros50Check, setTerceiros50Check] = useState<Boolean>(false);
  const [terceiros75, setTerceiros75] = useState(0);
  const [terceiros75Check, setTerceiros75Check] = useState<Boolean>(false);
  const [assistencia, setAssistencia] = useState(0);
  const [assistenciaCheck, setAssistenciaCheck] = useState<Boolean>(true);
  const vidros = 0.01;
  const [vidrosCheck, setVidrosCheck] = useState(true);
  const [rastreamento, setRastreamento] = useState(0.01);
  const rastreamentoCheck = true;
  const [Terceiros, setTerceiros] = useState<Number>();
  const [Reserva, setReserva] = useState<Number>();
  const descontos = 0.01;
  const total =
    casco +
    descontos +
    terceiros20 +
    terceiros30 +
    terceiros50 +
    terceiros75 +
    rastreamento +
    assistencia +
    vidros +
    reserva7 +
    reserva14 +
    protecaoCasco +
    reserva30;

  useEffect(() => {
    totalCount();
  });

  const resumo = {
    tipo: tipoVeiculo,
    visitante: visitante,
    veiculo: {
      adesao: visitante.estado === 'MG' ? 'R$ 100,00' : 'R$ 200,00',
      valorMensalidade: total,
      ano_modelo: resultadoFipe.AnoModelo,
      combustivel: resultadoFipe.Combustivel,
      fipe_codigo: resultadoFipe.CodigoFipe,
      marca: resultadoFipe.Marca,
      modelo: resultadoFipe.Modelo,
      preco: resultadoFipe.Valor.slice(3, 9),
      referencia: resultadoFipe.MesReferencia,
    },
    produtos: {
      assistencia: assistencia,
      protecaoCasco: 0.01,
      vidros: vidros,
      carroReserva: Reserva,
      terceiros: Terceiros,
      clubeCerto: descontos,
      rastreamento: rastreamento,
      administrativa: casco,
    },
  };

  function totalCount() {
    const valorCarro: Number = resultadoFipe.Valor.slice(3, 9);
    const totalCasco = valorCarro;

    if (Number(totalCasco) < 15.0) {
      setCasco(77);
    } else if (Number(totalCasco) >= 15.001 && Number(totalCasco) < 25.0) {
      setCasco(89);
    } else if (Number(totalCasco) >= 25.001 && Number(totalCasco) < 35.0) {
      setCasco(101);
    } else if (Number(totalCasco) >= 35.001 && Number(totalCasco) < 45.0) {
      setCasco(113);
    } else if (Number(totalCasco) > 45.001 && Number(totalCasco) < 55.0) {
      setCasco(125);
    } else if (Number(totalCasco) > 55.001 && Number(totalCasco) < 65.0) {
      setCasco(138);
    } else if (Number(totalCasco) > 65.001 && Number(totalCasco) < 75.0) {
      setCasco(156);
    } else if (Number(totalCasco) > 75.001 && Number(totalCasco) <= 85) {
      setCasco(196);
    } else if (Number(totalCasco) > 85.001 && Number(totalCasco) <= 95.0) {
      setCasco(236);
    } else if (Number(totalCasco) > 95.001 && Number(totalCasco) <= 105.0) {
      setCasco(276);
    } else if (Number(totalCasco) > 105.001 && Number(totalCasco) <= 115.0) {
      setCasco(316);
    }
    if (casco !== 0 && assistenciaCheck) {
      setAssistencia(12);
    } else if (!assistenciaCheck) {
      setAssistencia(0);
    } else {
      setAssistencia(24);
    }
    if (terceiros20Check) {
      setTerceiros20(20);
      setTerceiros30(0);
      setTerceiros50(0);
      setTerceiros75(0);
      setTerceiros(terceiros20);
    } else {
      setTerceiros20(0);
    }
    if (terceiros30Check) {
      setTerceiros20(0);
      setTerceiros30(26);
      setTerceiros50(0);
      setTerceiros75(0);
      setTerceiros(terceiros30);
    } else {
      setTerceiros30(0);
    }
    if (terceiros50Check) {
      setTerceiros20(0);
      setTerceiros30(0);
      setTerceiros50(40);
      setTerceiros75(0);
      setTerceiros(terceiros50);
    } else {
      setTerceiros50(0);
    }
    if (terceiros75Check) {
      setTerceiros20(0);
      setTerceiros30(0);
      setTerceiros50(0);
      setTerceiros75(50);
      setTerceiros(terceiros75);
    } else {
      setTerceiros75(0);
    }
    if (reserva7Check) {
      setReserva7(30);
      setReserva14(0);
      setReserva30(0);
      setReserva(reserva7);
    } else {
      setReserva7(0);
    }
    if (reserva14Check) {
      setReserva7(0);
      setReserva14(60);
      setReserva30(0);
      setReserva(reserva14);
    } else {
      setReserva14(0);
    }
    if (reserva30Check) {
      setReserva7(0);
      setReserva14(0);
      setReserva30(90);
      setReserva(reserva30);
    } else {
      setReserva30(0);
    }
    if (!reserva7Check && !reserva14Check && !reserva30Check) {
      setReserva(0);
    }
    if (
      !terceiros20Check &&
      !terceiros30Check &&
      !terceiros50Check &&
      !terceiros75Check
    ) {
      setTerceiros(0);
    }
  }

  async function navegaResumo() {
    try {
      await AsyncStorage.setItem(
        '@CUIDAR:dadosCompletos',
        JSON.stringify(resumo),
      ).then(async () => {
        navigation.navigate('ResumoCotacaoNA', {resumo});
      });
    } catch {}
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <ScrollView>
          <View style={styles.cabecalho}>
            <View>
              <TouchableOpacity
                style={styles.voltar}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon
                  name="chevron-left"
                  size={28}
                  color={'#0c71c3'}
                  style={styles.iconeVoltar}
                />
                <Text style={styles.botaoVoltar}>Voltar</Text>
              </TouchableOpacity>
            </View>
            {casco === 0 ? (
              <Text style={styles.textoCabecalho}>
                Para ve??culos acima de R$85.000 fornecemos apenas Rastreamento e
                Assist??ncia 24h.
              </Text>
            ) : (
              <Text style={styles.textoCabecalho}>
                Por favor, selecione os produtos para seu ve??culo.
              </Text>
            )}
          </View>
          <View style={styles.result}>
            <Text style={styles.textResult}>
              Fabricante:{'\n'}
              <Text style={styles.dadoResult}>{resultadoFipe.Marca}</Text>
            </Text>
            <Text style={styles.textResult}>
              Modelo:{'\n'}
              <Text style={styles.dadoResult}>{resultadoFipe.Modelo}</Text>
            </Text>
            <Text style={styles.textResult}>
              Ano modelo:{'\n'}
              <Text style={styles.dadoResult}>{resultadoFipe.AnoModelo}</Text>
            </Text>
            <Text style={styles.textResult}>
              Pre??o:{'\n'}
              <Text style={styles.dadoResult}>{resultadoFipe.Valor}</Text>
            </Text>
          </View>
          <View style={styles.produtos}>
            <Text style={styles.titleProdutos}>Selecione os produtos.</Text>
            <Text style={styles.titleSection}>Produtos obrigat??rios</Text>
            {casco === 0 ? null : (
              <TouchableOpacity style={styles.selecionaProduto}>
                <View style={styles.tipoProdutos}>
                  <Text style={styles.nomeProduto}>
                    Prote????o Roubo, furto, colis??o, inc??ndio e fen??menos da
                    natureza
                  </Text>
                  {cascoCheck ? (
                    <Icon name="check" color="#FF9800" size={23} />
                  ) : (
                    <Icon name="check" color="#666666" size={23} />
                  )}
                </View>
              </TouchableOpacity>
            )}
            {casco === 0 ? null : (
              <TouchableOpacity style={styles.selecionaProduto}>
                <View style={styles.tipoProdutos}>
                  <Text style={styles.nomeProduto}>
                    Prote????o Vidros, far??is, lanternas e retrovisores
                  </Text>
                  {vidrosCheck ? (
                    <Icon name="check" color="#FF9800" size={23} />
                  ) : (
                    <Icon name="check" color="#666666" size={23} />
                  )}
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.selecionaProduto}>
              <View style={styles.tipoProdutos}>
                <Text style={styles.nomeProduto}>
                  Rastreamento e monitoramento
                </Text>
                {rastreamentoCheck ? (
                  <Icon name="check" color="#FF9800" size={23} />
                ) : (
                  <Icon name="check" color="#666666" size={23} />
                )}
              </View>
            </TouchableOpacity>
            {casco === 0 ? null : (
              <View>
                <Text style={styles.titleSection}>Produtos para terceiros</Text>
                <TouchableOpacity
                  style={styles.selecionaProduto}
                  onPress={() => {
                    terceiros20Check
                      ? setTerceiros20Check(false)
                      : setTerceiros20Check(true);
                    setTerceiros30Check(false);
                    setTerceiros50Check(false);
                    setTerceiros75Check(false);
                  }}>
                  <View style={styles.tipoProdutos}>
                    <Text style={styles.nomeProduto}>
                      Prote????o terceiros at?? R$20.000,00
                    </Text>
                    {terceiros20Check ? (
                      <Icon name="check" color="#FF9800" size={23} />
                    ) : (
                      <Icon name="check" color="#666666" size={23} />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.selecionaProduto}
                  onPress={() => {
                    terceiros30Check
                      ? setTerceiros30Check(false)
                      : setTerceiros30Check(true);
                    setTerceiros20Check(false);
                    setTerceiros50Check(false);
                    setTerceiros75Check(false);
                  }}>
                  <View style={styles.tipoProdutos}>
                    <Text style={styles.nomeProduto}>
                      Prote????o terceiros at?? R$30.000,00
                    </Text>
                    {terceiros30Check ? (
                      <Icon name="check" color="#FF9800" size={23} />
                    ) : (
                      <Icon name="check" color="#666666" size={23} />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.selecionaProduto}
                  onPress={() => {
                    terceiros50Check
                      ? setTerceiros50Check(false)
                      : setTerceiros50Check(true);
                    setTerceiros20Check(false);
                    setTerceiros30Check(false);
                    setTerceiros75Check(false);
                  }}>
                  <View style={styles.tipoProdutos}>
                    <Text style={styles.nomeProduto}>
                      Prote????o terceiros at?? R$50.000,00
                    </Text>
                    {terceiros50Check ? (
                      <Icon name="check" color="#FF9800" size={23} />
                    ) : (
                      <Icon name="check" color="#666666" size={23} />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.selecionaProduto}
                  onPress={() => {
                    terceiros75Check
                      ? setTerceiros75Check(false)
                      : setTerceiros75Check(true);
                    setTerceiros20Check(false);
                    setTerceiros30Check(false);
                    setTerceiros50Check(false);
                  }}>
                  <View style={styles.tipoProdutos}>
                    <Text style={styles.nomeProduto}>
                      Prote????o terceiros at?? R$75.000,00
                    </Text>
                    {terceiros75Check ? (
                      <Icon name="check" color="#FF9800" size={23} />
                    ) : (
                      <Icon name="check" color="#666666" size={23} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}
            <Text style={styles.titleSection}>Produtos de assist??ncia</Text>
            {casco === 0 ? (
              <TouchableOpacity style={styles.selecionaProduto}>
                <View style={styles.tipoProdutos}>
                  <Text style={styles.nomeProduto}>
                    Assist??ncia 24h com km Livre colis??o
                  </Text>
                  <Icon name="check" color="#FF9800" size={23} />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.selecionaProduto}
                onPress={() => {
                  assistenciaCheck
                    ? setAssistenciaCheck(false)
                    : setAssistenciaCheck(true);
                }}>
                <View style={styles.tipoProdutos}>
                  <Text style={styles.nomeProduto}>
                    Assist??ncia 24h com km Livre colis??o
                  </Text>
                  {assistenciaCheck ? (
                    <Icon name="check" color="#FF9800" size={23} />
                  ) : (
                    <Icon name="check" color="#666666" size={23} />
                  )}
                </View>
              </TouchableOpacity>
            )}
            {casco === 0 ? null : (
              <View>
                <Text style={styles.titleSection}>Produtos extras</Text>
                <TouchableOpacity
                  style={styles.selecionaProduto}
                  onPress={() => {
                    reserva7Check
                      ? setReserva7Check(false)
                      : setReserva7Check(true);
                    setReserva14Check(false);
                    setReserva30Check(false);
                  }}>
                  <View style={styles.tipoProdutos}>
                    <Text style={styles.nomeProduto}>Carro reserva 7 dias</Text>
                    {reserva7Check ? (
                      <Icon name="check" color="#FF9800" size={23} />
                    ) : (
                      <Icon name="check" color="#666666" size={23} />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.selecionaProduto}
                  onPress={() => {
                    reserva14Check
                      ? setReserva14Check(false)
                      : setReserva14Check(true);
                    setReserva7Check(false);
                    setReserva30Check(false);
                  }}>
                  <View style={styles.tipoProdutos}>
                    <Text style={styles.nomeProduto}>
                      Carro reserva 14 dias
                    </Text>
                    {reserva14Check ? (
                      <Icon name="check" color="#FF9800" size={23} />
                    ) : (
                      <Icon name="check" color="#666666" size={23} />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.selecionaProduto}
                  onPress={() => {
                    reserva30Check
                      ? setReserva30Check(false)
                      : setReserva30Check(true);
                    setReserva7Check(false);
                    setReserva14Check(false);
                  }}>
                  <View style={styles.tipoProdutos}>
                    <Text style={styles.nomeProduto}>
                      Carro reserva 30 dias
                    </Text>
                    {reserva30Check ? (
                      <Icon name="check" color="#FF9800" size={23} />
                    ) : (
                      <Icon name="check" color="#666666" size={23} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.botoes}>
            <TouchableOpacity
              style={styles.btnAvanca}
              onPress={() => {
                navegaResumo();
              }}>
              <Text style={styles.textBtnAvanca}>Ver resumo da cota????o</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.valor}>
          <TouchableOpacity
            onPress={() => {
              navegaResumo();
            }}>
            <View style={styles.boxTotal}>
              <Text style={styles.textoTotal}>Valor mensalidade</Text>
              <Text style={styles.textoTotal}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(total)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.footerValor} />
    </>
  );
};

export default ProdutosCotacaoNA;
