import React, {useState, useContext, useEffect} from 'react';
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Modal,
  StatusBar,
  Platform,
  Keyboard,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import styles from './style';
import AuthContext from '../../contexts/auth';
import buscarFIPE from '../../services/apiFipe';
import Icon from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';
import 'moment/locale/pt-br';
import moment from 'moment';
import Associado from './associado';
import AssistenciaCarros from './carros';
import AssistenciaMotos from './motos';
import ProtecaoVidros from './vidros';
import CarroReserva from './reserva';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../components/Loading';

const Cotacao: React.FC = () => {
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [marcas, setMarcas] = useState();
  const [tipoVeiculo, setTipoVeiculo] = useState<String>();
  const [checkBoxMarca, setCheckBoxMarca] = useState<String>();
  const [modelosFipe, setModelosFipe] = useState();
  const [checkBoxModelo, setCheckBoxModelo] = useState<String>();
  const [anoModelo, setAnoModelo] = useState();
  const [checkBoxAno, setCheckBoxAno] = useState<String>();
  const [modalProdutos, setModalProdutos] = useState(false);
  const [modalResumo, setModalResumo] = useState(false);
  const [modalRegulamentos, setModalRegulamentos] = useState(false);
  const date = new Date();

  const [resultadoFipe, setResultadoFipe] = useState<Object>({
    referencia: 'agosto de 2020',
    fipe_codigo: '022001-9',
    name: '3000 GT VR-4',
    combustivel: 'Gasolina',
    marca: 'Mitsubishi',
    ano_modelo: '1998',
    Valor: 'R$ 70.994,00',
    key: '3000-1998',
    time: 0.0,
    veiculo: '3000 GT VR-4',
    id: '1998',
  });

  // Filtros listas
  const [filter, setFilter] = useState('');
  const [arrayHolder, setArrayHolder] = useState([]);

  // Produtos
  const [casco, setCasco] = useState(0);
  const cascoCheck = true;
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
  const vidros = 0;
  const vidrosCheck = true;
  const rastreamento = 0;
  const rastreamentoCheck = true;
  const [Terceiros, setTerceiros] = useState<String>();
  const [Reserva, setReserva] = useState<String>();
  const [aceite, setAceite] = useState<Boolean>(false);
  const [regAssociado, setRegAssociado] = useState<Boolean>(true);
  const [regAssistenciaCarros, setRegAssistenciaCarros] =
    useState<Boolean>(false);
  const [regAssistenciaMotos, setRegAssistenciaMotos] =
    useState<Boolean>(false);
  const [regReserva, setRegReserva] = useState<Boolean>(false);
  const [regVidros, setRegVidros] = useState<Boolean>(false);

  const navigation = useNavigation();

  const total =
    casco +
    terceiros20 +
    terceiros30 +
    terceiros50 +
    terceiros75 +
    rastreamento +
    assistencia +
    vidros +
    reserva7 +
    reserva14 +
    reserva30;

  function totalCount() {
    const totalCasco = resultadoFipe.Valor.slice(3, 9);
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
    } else if (Number(totalCasco) > 75.001 && Number(totalCasco) <= 85.0) {
      setCasco(196);
    } else if (Number(totalCasco) > 85.001 && Number(totalCasco) <= 95.0) {
      setCasco(236);
    } else if (Number(totalCasco) > 95.001 && Number(totalCasco) <= 105.0) {
      setCasco(276);
    } else if (Number(totalCasco) > 105.001 && Number(totalCasco) <= 115.0) {
      setCasco(316);
    }else if (Number(totalCasco) > 115.001) {
      setCasco(525);
    }
    if (assistenciaCheck) {
      setAssistencia(12);
    } else {
      setAssistencia(0);
    }
    if (terceiros20Check) {
      setTerceiros20(20);
      setTerceiros30(0);
      setTerceiros50(0);
      setTerceiros75(0);
      setTerceiros(`20 mil - R$${terceiros20},00`);
    } else {
      setTerceiros20(0);
    }
    if (terceiros30Check) {
      setTerceiros20(0);
      setTerceiros30(26);
      setTerceiros50(0);
      setTerceiros75(0);
      setTerceiros(`30 mil - R$${terceiros30},00`);
    } else {
      setTerceiros30(0);
    }
    if (terceiros50Check) {
      setTerceiros20(0);
      setTerceiros30(0);
      setTerceiros50(40);
      setTerceiros75(0);
      setTerceiros(`50 mil - R$${terceiros50},00`);
    } else {
      setTerceiros50(0);
    }
    if (terceiros75Check) {
      setTerceiros20(0);
      setTerceiros30(0);
      setTerceiros50(0);
      setTerceiros75(50);
      setTerceiros(`75 mil - R$${terceiros75},00`);
    } else {
      setTerceiros75(0);
    }
    if (reserva7Check) {
      setReserva7(30);
      setReserva14(0);
      setReserva30(0);
      setReserva(`7 dias - R$${reserva7},00`);
    } else {
      setReserva7(0);
    }
    if (reserva14Check) {
      setReserva7(0);
      setReserva14(60);
      setReserva30(0);
      setReserva(`14 dias - R$${reserva14},00`);
    } else {
      setReserva14(0);
    }
    if (reserva30Check) {
      setReserva7(0);
      setReserva14(0);
      setReserva30(90);
      setReserva(`30 dias - R$${reserva30},00`);
    } else {
      setReserva30(0);
    }
    if (!reserva7Check && !reserva14Check && !reserva30Check) {
      setReserva('Sem carro reserva');
    }
    if (
      !terceiros20Check &&
      !terceiros30Check &&
      !terceiros50Check &&
      !terceiros75Check
    ) {
      setTerceiros('Sem terceiros');
    }
  }

  useEffect(() => {
    totalCount();
  });

  async function buscarCarros() {
    setLoading(true);
    try {
      await buscarFIPE.get('/carros/marcas')
      .then((data) => {
        console.log(data)
        setMarcas(data.data);
        setArrayHolder(data.data);
      })
      .finally(() => setLoading(false))
    } catch {
      Alert.alert('Atenção', 'Algo não deu certo. Tente novamente.');
      setLoading(false);
    }
  }

  async function buscarMotos() {
    setLoading(true);
    try {
      const montadoras = await buscarFIPE.get('/motos/marcas');
      setMarcas(montadoras.data);
      setArrayHolder(montadoras.data);
    } catch {
      Alert.alert('Atenção', 'Algo não deu certo. Tente novamente.');
    }
    setLoading(false);
  }

  async function buscarModelos() {
    setFilter(null);
    setLoading(true);
    const modeloVeiculos = await buscarFIPE.get(
      `/${tipoVeiculo}/marcas/${checkBoxMarca}/modelos`,
    );
    setModelosFipe(modeloVeiculos.data.modelos);
    setArrayHolder(modeloVeiculos.data.modelos);

    setLoading(false);
  }

  async function buscarAno() {
    setFilter(null);
    setLoading(true);
    const anoVeiculos = await buscarFIPE.get(
      `/${tipoVeiculo}/marcas/${checkBoxMarca}/modelos/${checkBoxModelo}/anos`,
    );
    setAnoModelo(anoVeiculos.data);
    setArrayHolder(anoVeiculos.data);
    setLoading(false);
  }

  async function buscarResultadoFipe() {
    setFilter(null);
    await buscarFIPE
      .get(
        `/${tipoVeiculo}/marcas/${checkBoxMarca}/modelos/${checkBoxModelo}/anos/${checkBoxAno}`,
      )
      .then(response => {
        setResultadoFipe(response.data);
        setModalProdutos(true);
      });
  }

  const searchData = text => {
    const newData: any = arrayHolder.filter(item => {
      const itemData = item.nome.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setMarcas(newData);
    setFilter(text);
  };

  function searchModelo(text) {
    const newData: any = arrayHolder.filter(item => {
      const itemData = item.nome.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setModelosFipe(newData);
    setFilter(text);
  }

  const headerAno = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.textoHeader}>
          Por favor, selecione o ano/modelo do seu veículo.
        </Text>
      </View>
    );
  };

  if (loading) {
    <Loading />
  }

  async function sendCotacao() {
    if (!aceite) {
      Alert.alert(
        'Atenção',
        'Para continuar é necessário aceitar os termos dos regulamentos.',
      );
    } else {
      try {
        await firestore()
          .collection('cotacao-associado')
          .doc(`${user.nome} - ${date}`)
          .set({
            to: 'falecom@acuidar.com.br',
            message: {
              subject: 'Nova cotação - APP Cuidar',
              text: 'Cotação feita pelo APP',
              html: `Cotação feita pelo associado via <code><b>aplicativo CUIDAR</b></code>:<code><br />Associado: <b>${
                user.nome
              }</b><br />Telefone: <b>${
                user.telefone_celular
              }</b><br />CPF: <b>${user.cpf}</b><br />Veiculo: <b>${
                resultadoFipe.Marca
              } - ${resultadoFipe.Modelo}</b><br />Ano modelo: <b>${
                resultadoFipe.AnoModelo
              }</b><br />Valor: <b>${
                resultadoFipe.Valor
              }</b><br />Código FIPE: <b>${
                resultadoFipe.CodigoFipe
              }</b><br />Franquia: <b>R$${
                (resultadoFipe.Valor.slice(3, 9) / 100) * 5 * 1000
              }</b><br />Adesão: <b>${
                user.estado === 'MG' ? 'R$100,00' : 'R$200,00'
              }</b><br />Produtos: <br /><b>TX. Administrativa: R$${casco},00</b><br /><b>Rastreamento: ${rastreamentoCheck}</b><br /><b>Vidros: ${vidrosCheck}</b><br /><b>Assistência: ${assistenciaCheck} - R$${assistencia},00</b><br /><b>Terceiros: ${Terceiros}</b><br /><b>Carro reserva: ${Reserva}</b><br />Valor Mensalidade: <b>R$${total},00</b><br /></code>Data e hora do aceite digital: <b>${moment().format()}</b><br />Plataforma usuário: <b>${
                Platform.OS
              }`,
            },
          });
        setModalResumo(false);
        setMarcas(null);
        setCheckBoxMarca('');
        setModelosFipe(null);
        setCheckBoxModelo('');
        setAnoModelo(null);
        setCheckBoxAno('');
        Alert.alert(
          'Sucesso',
          'Proteção solicitada com sucesso. Em algum minutos você receberá um contato da nossa equipe para prosseguimento.',
        );
        navigation.navigate('Home');
      } catch (error) {
        Alert.alert('Erro', 'Algo deu errado, tente novamente.');
      }
    }
  }

  if (modalResumo) {
    return (
      <ScrollView style={styles.Mapa}>
        {modalResumo ? (
          <StatusBar animated={true} hidden={true} />
        ) : (
          <StatusBar animated={true} hidden={false} />
        )}
        <SafeAreaView>
          <View style={styles.contentResumo}>
            <Text style={styles.titleResumo}>
              Confira abaixo o resumo da cotação.
            </Text>
            <Text style={styles.titleSectionResume}>Dados do seu veículo</Text>
            <View style={styles.veiculoResumo}>
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
                Preço:{'\n'}
                <Text style={styles.dadoResult}>{resultadoFipe.Valor}</Text>
              </Text>
              <Text style={styles.textResult}>
                Cód. Fipe:{'\n'}
                <Text style={styles.dadoResult}>
                  {resultadoFipe.CodigoFipe}
                </Text>
              </Text>

              <Text style={styles.textResult}>
                Participação em casos de acidente:{'\n'}
                {resultadoFipe.Valor.slice(3, 9) > 70.0 ? (
                  <Text style={styles.dadoResult}>
                    {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(
                      (resultadoFipe.Valor.slice(3, 9) / 100) * 8 * 1000,
                    )}
                  </Text>
                ) : (
                  <Text style={styles.dadoResult}>
                    {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(
                      (resultadoFipe.Valor.slice(3, 9) / 100) * 5 * 1000,
                    )}
                  </Text>
                )}
              </Text>

              <Text style={styles.textResult}>
                Adesão novo veículo:{'\n'}
                {user.estado === 'MG' ? (
                  <Text style={styles.dadoResult}>R$ 100,00</Text>
                ) : (
                  <Text style={styles.dadoResult}>R$ 200,00</Text>
                )}
              </Text>

              <Text style={styles.textResult}>
                Benefícios para associados:{'\n'}
                <Text style={styles.dadoResult}>
                  Na inclusão de um segundo veículo você ganha 100% de desconto
                  na mensalidade do próximo mês de um veículo já cadastrado.
                </Text>
              </Text>
            </View>
            <Text style={styles.titleSectionResume}>
              Produtos selecionados para seu veículo
            </Text>
            <View style={styles.veiculoResumo}>
              <Text style={styles.textResult}>Itens gratuitos: </Text>
              <Text style={styles.dadoResult}>
                Clube Certo, rastreamento e monitoramento, proteção de vidros,
                faróis, lanternas e retrovisores externos
              </Text>
              <Text style={styles.detalheProtecao}>
                Clube de descontos, rastreamento e monitoramento do veículo com
                acesso por meio do APP, proteção para vidros, parabrisa, faróis,
                lanternas e retrovisores externos, sem custo para novos
                associados.
              </Text>
              <Text style={styles.textResult}>Proteção para o veículo:</Text>
              <Text style={styles.dadoResult}>
                Taxa administrativa e proteção do veículo - R${casco},00
              </Text>
              <Text style={styles.detalheProtecao}>
                Proteção roubo e furto, colisões, perda total, incêndio e
                fenômenos da natureza, alagamentos e queda de árvore. Proteção
                de 100% da FIPE para veículos regulares, não recuperados e não
                provenientes de leilão, e sem chassi remarcado.
              </Text>
              <Text style={styles.textResult}>Proteção para terceiros: </Text>
              <Text style={styles.dadoResult}>
                Proteção para veículos terceiros para casos de colisão em até{' '}
                {Terceiros}
              </Text>
              <Text style={styles.detalheProtecao}>
                Proteção para casos onde houver envolvimento de veículos
                terceiros no acidente onde a culpa seja do associado. Reparos
                e/ou indenizações com teto no valor contratado descrito acima.
              </Text>
              <Text style={styles.textResult}>Assistência 24h: </Text>
              <Text style={styles.dadoResult}>
                Assistência e reboque 24h com km livre para colisões - R$
                {assistencia},00
              </Text>
              <Text style={styles.detalheProtecao}>
                Assistência 24 horas, 7 dias por semana em qualquer lugar do
                Brasil com reboque de KM livre para casos de colisão e limite de
                300 km para panes. Chaveiro 24h, hospedagem na estrada, meio de
                transporte alternativo, SOS pane seca, socorro elétrico e
                mecânico e auxílio pneu furado.
              </Text>
              {Reserva === 'Sem carro reserva' ? null : (
                <View>
                  <Text style={styles.textResult}>Produtos extras: </Text>
                  <Text style={styles.dadoResult}>Carro reserva {Reserva}</Text>
                  <Text style={styles.detalheProtecao}>
                    Veículo reserva caso seu veículo esteja inutilizado por
                    motivos de colisão ou se sofrer um incêndio. Limitado ao
                    número de dias contratado anualmente.
                  </Text>
                </View>
              )}
              <View style={styles.resumoTotal}>
                <Text style={styles.totalValor}>
                  Total mensalidade{'\n'}R$
                  {total},00
                </Text>
                <Text style={styles.detalheProtecao}>
                  Valor referente a mensalidade. Para proteger o seu veículo é
                  necessário o pagamento da primeira mensalidade que será
                  enviada via e-mail e/ou WhatsApp após a finalização do
                  cadastro do associado e seu veículo.
                </Text>
              </View>
              <View style={styles.resumoTotal}>
                {aceite ? (
                  <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={() => setAceite(false)}>
                    <Text style={styles.aceiteOk}>
                      Eu li e aceitei os termos dos regulamentos da Associação
                      Cuidar Clube de Vantagens.
                    </Text>
                    <Icon name="check-square" size={28} color="#39ff14" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={() => setAceite(true)}>
                    <Text style={styles.aceitar}>
                      Clique aqui para aceitar os termos dos regulamentos e
                      adesão da Associação Cuidar Clube de Vantagens.
                    </Text>
                    <Icon name="check-square" size={28} color="#CCCCCC" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => setModalRegulamentos(true)}>
                  <Text style={styles.aceiteRegulamentos}>
                    Clique aqui para ler os regulamentos
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.botoes}>
              <TouchableOpacity
                style={styles.btnAvanca}
                onPress={() => {
                  sendCotacao();
                }}>
                <Text style={styles.textBtnAvanca}>Proteger veículo</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.botoes}>
              <TouchableOpacity
                style={styles.btnVolta}
                onPress={() => {
                  setModalProdutos(true);
                  setModalResumo(false);
                }}>
                <Text style={styles.TextBtnVolta}>Voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal visible={modalRegulamentos} animationType="slide">
            <SafeAreaView>
              <View style={styles.btnFechaModal}>
                <TouchableOpacity
                  style={styles.fechaModal}
                  onPress={() => setModalRegulamentos(false)}>
                  <Icon name="x" size={28} color={'#FF9800'} />
                </TouchableOpacity>
              </View>
              <View style={[styles.contentResumo, {width: '80%'}]}>
                <Text style={styles.titleResumo}>
                  Regulamentos Associação Cuidar Clube de Vantagens
                </Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scroll}>
                <TouchableOpacity
                  onPress={() => {
                    setRegAssociado(true);
                    setRegAssistenciaCarros(false);
                    setRegVidros(false);
                    setRegReserva(false);
                    setRegAssistenciaMotos(false);
                  }}>
                  {!regAssociado ? (
                    <View style={styles.filterRegulamentos}>
                      <Text style={styles.titleSectionRegulamento}>
                        <Icon name={'file-text'} size={15} /> - Associado
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.filterRegulamentos}>
                      <Text style={styles.titleSectionRegulamentoAtivo}>
                        <Icon name={'file-text'} size={15} /> - Associado
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setRegAssistenciaCarros(true);
                    setRegAssociado(false);
                    setRegReserva(false);
                    setRegAssistenciaMotos(false);
                    setRegVidros(false);
                  }}>
                  {!regAssistenciaCarros ? (
                    <View style={styles.filterRegulamentos}>
                      <Text style={styles.titleSectionRegulamento}>
                        <Icon name={'file-text'} size={15} /> - Assistência 24h
                        - Carros
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.filterRegulamentos}>
                      <Text style={styles.titleSectionRegulamentoAtivo}>
                        <Icon name={'file-text'} size={15} /> - Assistência 24h
                        - Carros
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setRegAssistenciaCarros(false);
                    setRegAssociado(false);
                    setRegReserva(false);
                    setRegAssistenciaMotos(true);
                    setRegVidros(false);
                  }}>
                  {!regAssistenciaMotos ? (
                    <View style={styles.filterRegulamentos}>
                      <Text style={styles.titleSectionRegulamento}>
                        <Icon name={'file-text'} size={15} /> - Assistência 24h
                        - Motos
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.filterRegulamentos}>
                      <Text style={styles.titleSectionRegulamentoAtivo}>
                        <Icon name={'file-text'} size={15} /> - Assistência 24h
                        - Motos
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setRegAssistenciaCarros(false);
                    setRegAssociado(false);
                    setRegReserva(false);
                    setRegAssistenciaMotos(false);
                    setRegVidros(true);
                  }}>
                  {!regVidros ? (
                    <View style={styles.filterRegulamentos}>
                      <Text style={styles.titleSectionRegulamento}>
                        <Icon name={'file-text'} size={15} /> - Vidros, faróis,
                        lanternas e retrovisores
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.filterRegulamentos}>
                      <Text style={styles.titleSectionRegulamentoAtivo}>
                        <Icon name={'file-text'} size={15} /> - Vidros, faróis,
                        lanternas e retrovisores
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setRegAssistenciaCarros(false);
                    setRegAssociado(false);
                    setRegReserva(true);
                    setRegAssistenciaMotos(false);
                    setRegVidros(false);
                  }}>
                  <View style={styles.filterRegulamentos}>
                    {!regReserva ? (
                      <Text style={styles.titleSectionRegulamento}>
                        <Icon name={'file-text'} size={15} /> - Carro reserva
                      </Text>
                    ) : (
                      <Text style={styles.titleSectionRegulamentoAtivo}>
                        <Icon name={'file-text'} size={15} /> - Carro reserva
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </SafeAreaView>
            <ScrollView style={styles.Mapa}>
              <SafeAreaView>
                {regAssociado ? (
                  <View style={styles.contentResumo}>
                    <Associado />
                  </View>
                ) : null}
                {regAssistenciaCarros ? (
                  <View style={styles.contentResumo}>
                    <AssistenciaCarros />
                  </View>
                ) : null}
                {regAssistenciaMotos ? (
                  <View style={styles.contentResumo}>
                    <AssistenciaMotos />
                  </View>
                ) : null}
                {regReserva ? (
                  <View style={styles.contentResumo}>
                    <CarroReserva />
                  </View>
                ) : null}
                {regVidros ? (
                  <View style={styles.contentResumo}>
                    <ProtecaoVidros />
                  </View>
                ) : null}
              </SafeAreaView>
            </ScrollView>
          </Modal>
        </SafeAreaView>
      </ScrollView>
    );
  }

  if (anoModelo) {
    return (
      <View style={styles.containerMarcas}>
        <FlatList
          ListHeaderComponent={headerAno}
          style={styles.ListaMarcas}
          data={Object.keys(anoModelo)}
          keyExtractor={veiculo => String(anoModelo[veiculo].codigo)}
          showsVerticalScrollIndicator={false}
          renderItem={({item: veiculo}) => (
            <View>
              <TouchableOpacity
                style={styles.contentMarca}
                onPress={() => setCheckBoxAno(anoModelo[veiculo].codigo)}
                onPressOut={buscarResultadoFipe}>
                <Text style={styles.dadosLista}>{anoModelo[veiculo].nome}</Text>
                <Icon name="arrow-right" color="#FF9800" size={20} />
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={styles.botoes}>
          <TouchableOpacity
            onPress={() => setAnoModelo(null)}
            style={styles.btnVolta}>
            <Text style={styles.TextBtnVolta}>Voltar</Text>
          </TouchableOpacity>
        </View>
        <Modal animationType="slide" visible={modalProdutos}>
          {modalProdutos ? (
            <StatusBar animated={true} hidden={true} />
          ) : (
            <StatusBar animated={true} hidden={false} />
          )}
          <View>
            <View style={styles.btnFechaModal}>
              <TouchableOpacity
                style={styles.fechaModal}
                onPress={() => setModalProdutos(false)}>
                <Icon name="x" size={28} color={'#FF9800'} />
              </TouchableOpacity>
            </View>
            <View style={styles.valor}>
              <TouchableOpacity
                onPress={() => {
                  setModalResumo(true);
                  setModalProdutos(false);
                }}>
                <View style={styles.boxTotal}>
                  <Text style={styles.textoTotal}>
                    <Text style={{fontSize: 14}}>R$</Text>
                    {'\n'}
                    {total}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.Mapa}>
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
                  <Text style={styles.dadoResult}>
                    {resultadoFipe.AnoModelo}
                  </Text>
                </Text>
                <Text style={styles.textResult}>
                  Preço:{'\n'}
                  <Text style={styles.dadoResult}>{resultadoFipe.Valor}</Text>
                </Text>
                <Text style={styles.textResult}>
                  Cód. Fipe:{'\n'}
                  <Text style={styles.dadoResult}>
                    {resultadoFipe.CodigoFipe}
                  </Text>
                </Text>
                <View style={styles.produtos}>
                  <Text style={styles.titleProdutos}>
                    Selecione os produtos.
                  </Text>
                  <Text style={styles.titleSection}>Produtos obrigatórios</Text>
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
                  <Text style={styles.titleSection}>
                    Produtos para terceiros
                  </Text>
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
                  <Text style={styles.titleSection}>
                    Produtos de assistência
                  </Text>
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
                      <Text style={styles.nomeProduto}>
                        Carro reserva 7 dias
                      </Text>
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
                  <View style={styles.botoes}>
                    <TouchableOpacity
                      style={styles.btnAvanca}
                      onPress={() => {
                        setModalResumo(true);
                        setModalProdutos(false);
                      }}>
                      <Text style={styles.textBtnAvanca}>Ver resumo</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }

  if (modelosFipe) {
    return (
      <SafeAreaView style={styles.containerMarcas}>
        <FlatList
          ListHeaderComponent={
            <View>
              <View style={styles.header}>
                <Text style={styles.textoHeader}>
                  Por favor, selecione o modelo do seu veículo.
                </Text>
              </View>
              <View>
                <TextInput
                  style={styles.filter}
                  onChangeText={text => searchModelo(text)}
                  underlineColorAndroid="transparent"
                  placeholder="Pesquise aqui o modelo do seu veículo"
                  placeholderTextColor="#888888"
                  value={filter}
                  onEndEditing={Keyboard.dismiss}
                />
              </View>
            </View>
          }
          style={styles.ListaMarcas}
          data={Object.keys(modelosFipe)}
          keyExtractor={veiculos => String(modelosFipe[veiculos].codigo)}
          showsVerticalScrollIndicator={false}
          renderItem={({item: modelo}) => (
            <View>
              <TouchableOpacity
                style={styles.contentMarca}
                onPress={() => setCheckBoxModelo(modelosFipe[modelo].codigo)}
                onPressOut={buscarAno}>
                <Text style={styles.dadosLista}>
                  {modelosFipe[modelo].nome}
                </Text>
                <Icon name="arrow-right" color="#FF9800" size={20} />
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={styles.botoes}>
          <TouchableOpacity
            onPress={() => setModelosFipe('')}
            style={styles.btnVolta}>
            <Text style={styles.TextBtnVolta}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (marcas) {
    return (
      <SafeAreaView style={styles.containerMarcas}>
        <FlatList
          ListHeaderComponent={
            <View>
              <View style={styles.header}>
                <Text style={styles.textoHeader}>
                  Por favor, selecione a marca do seu veículo e clique em
                  continuar.
                </Text>
              </View>
              <View>
                <TextInput
                  style={styles.filter}
                  value={filter}
                  onChangeText={text => {
                    searchData(text);
                  }}
                  onEndEditing={Keyboard.dismiss}
                  underlineColorAndroid="transparent"
                  placeholder="Pesquise aqui o fabricante do veículo"
                  placeholderTextColor="#888888"
                />
              </View>
            </View>
          }
          style={styles.ListaMarcas}
          data={Object.keys(marcas)}
          keyExtractor={montadora => marcas[montadora].codigo}
          showsVerticalScrollIndicator={false}
          renderItem={({item: montadora}) => (
            <View>
              <TouchableOpacity
                style={styles.contentMarca}
                onPress={() => setCheckBoxMarca(marcas[montadora].codigo)}
                onPressOut={buscarModelos}>
                <Text style={styles.dadosLista}>{marcas[montadora].nome}</Text>
                <Icon name="arrow-right" color="#FF9800" size={20} />
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={styles.botoes}>
          <TouchableOpacity
            onPress={() => {
              setMarcas(null);
              setTipoVeiculo('');
            }}
            style={styles.btnVolta}>
            <Text style={styles.TextBtnVolta}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView style={styles.fundoGeral}>
      <SafeAreaView style={styles.content}>
        <View style={styles.checkTipo}>
          <TouchableOpacity
            style={styles.tipoContent}
            onPress={() => {
              setTipoVeiculo('carros');
              buscarCarros();
            }}>
            <Text style={styles.titleTipo}>Quero proteger meu carro</Text>
            <IconFA name="car" size={30} color={'#999999'} />
          </TouchableOpacity>
        </View>
        <View style={styles.checkTipo}>
          <TouchableOpacity
            style={styles.tipoContent}
            onPress={() => {
              setTipoVeiculo('motos');
              buscarMotos();
            }}>
            <Text style={styles.titleTipo}>Quero proteger minha moto</Text>
            <IconFA name="motorcycle" size={30} color={'#999999'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Cotacao;
