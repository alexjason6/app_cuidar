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
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VisitanteContext from '../../contexts/visitante';

const ProdutosContinuaNA: React.FC = () => {
  const {dadosCompletos} = useContext(VisitanteContext);
  const navigation = useNavigation();
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
    tipo: dadosCompletos.tipo,
    visitante: dadosCompletos.visitante,
    veiculo: {
      adesao:
        dadosCompletos.visitante.estado === 'MG' ? 'R$ 100,00' : 'R$ 200,00',
      valorMensalidade: total,
      ano_modelo: dadosCompletos.veiculo.ano_modelo,
      combustivel: dadosCompletos.veiculo.combustivel,
      fipe_codigo: dadosCompletos.veiculo.fipe_codigo,
      marca: dadosCompletos.veiculo.marca,
      modelo: dadosCompletos.veiculo.modelo,
      preco: dadosCompletos.veiculo.preco,
      referencia: dadosCompletos.veiculo.referencia,
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
    const totalCasco = Number(dadosCompletos.veiculo.preco);

    if (totalCasco < 15.0) {
      setCasco(77);
    }
    if (totalCasco >= 15.001 && totalCasco < 25.0) {
      setCasco(89);
    }
    if (totalCasco >= 25.001 && totalCasco < 35.0) {
      setCasco(101);
    }
    if (totalCasco >= 35.001 && totalCasco < 45.0) {
      setCasco(113);
    }
    if (totalCasco > 45.001 && totalCasco < 55.0) {
      setCasco(125);
    }
    if (totalCasco > 55.001 && totalCasco < 65.0) {
      setCasco(138);
    }
    if (totalCasco > 65.001 && totalCasco < 75.0) {
      setCasco(156);
    }
    if (totalCasco > 75.001 && totalCasco <= 85) {
      setCasco(196);
    }
    if (totalCasco > 85.001) {
      setCasco(0);
      setRastreamento(45 - 0.00000000000003);
      setCascoCheck(false);
      setVidrosCheck(false);
      setTerceiros30Check(false);
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
    await AsyncStorage.setItem(
      '@CUIDAR:veiculoVisitante',
      JSON.stringify(resumo),
    );
    navigation.navigate('ResumoCotacaoNA', {resumo});
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
                Para veículos acima de R$85.000 fornecemos apenas Rastreamento e
                Assistência 24h.
              </Text>
            ) : (
              <Text style={styles.textoCabecalho}>
                Por favor, selecione os produtos para seu veículo.
              </Text>
            )}
          </View>
          <View style={styles.result}>
            <Text style={styles.textResult}>
              Fabricante:{'\n'}
              <Text style={styles.dadoResult}>
                {dadosCompletos.veiculo.marca}
              </Text>
            </Text>
            <Text style={styles.textResult}>
              Modelo:{'\n'}
              <Text style={styles.dadoResult}>
                {dadosCompletos.veiculo.modelo}
              </Text>
            </Text>
            <Text style={styles.textResult}>
              Ano modelo:{'\n'}
              <Text style={styles.dadoResult}>
                {dadosCompletos.veiculo.ano_modelo}
              </Text>
            </Text>
            <Text style={styles.textResult}>
              Preço:{'\n'}
              <Text style={styles.dadoResult}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(dadosCompletos.veiculo.preco * 1000)}
              </Text>
            </Text>
          </View>
          <View style={styles.produtos}>
            <Text style={styles.titleProdutos}>Selecione os produtos.</Text>
            <Text style={styles.titleSection}>Produtos obrigatórios</Text>
            {casco === 0 ? null : (
              <TouchableOpacity style={styles.selecionaProduto}>
                <View style={styles.tipoProdutos}>
                  <Text style={styles.nomeProduto}>
                    Proteção Roubo, furto, colisão, incêndio e fenômenos da
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
                    Proteção Vidros, faróis, lanternas e retrovisores
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
                      Proteção terceiros até R$20.000,00
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
                      Proteção terceiros até R$30.000,00
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
                      Proteção terceiros até R$50.000,00
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
                      Proteção terceiros até R$75.000,00
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
            <Text style={styles.titleSection}>Produtos de assistência</Text>
            {casco === 0 ? (
              <TouchableOpacity style={styles.selecionaProduto}>
                <View style={styles.tipoProdutos}>
                  <Text style={styles.nomeProduto}>
                    Assistência 24h com km Livre colisão
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
                    Assistência 24h com km Livre colisão
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
              <Text style={styles.textBtnAvanca}>Ver resumo da cotação</Text>
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

export default ProdutosContinuaNA;
