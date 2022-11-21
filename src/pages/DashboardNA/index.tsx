import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
  Image,
  ScrollView,
  StatusBar,
  Linking,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';
import VisitanteContext from '../../contexts/guestContext';
import TextInputMask from 'react-native-text-input-mask';
import AuthContext from '../../contexts/authContext';

const DashboardNA: React.FC = () => {
  const {dadosCompletos, visitante} = useContext(VisitanteContext);
  const navigation = useNavigation();
  const [modalAssociado, setModalAssociado] = useState<boolean>(false);
  const [cpfCnpjExtracted, setCpfCnpjExtracted] = useState<string>();
  const {buscaAssociado} = useContext(AuthContext);
  const [cpf_cnpj, setCpf_cnpj] = useState<string>('');
  const idHandler = text => {
    setCpf_cnpj(text);
  };

  async function handleSignIn() {
    if (cpf_cnpj) {
      try {
        await AsyncStorage.multiSet([
          ['@CUIDAR:cpfAssociado', cpf_cnpj],
          ['@CUIDAR:cpfAssociadoExtracted', cpfCnpjExtracted],
        ]);
        buscaAssociado(cpf_cnpj);
      }
      catch {
        Alert.alert(
          'Algo deu errado.',
          'Confira os dados digitados e tente novamente.',
        );
      }
    }
    else {
      Alert.alert(
        'Atenção.',
        'Digite o CPF ou CNPJ cadastrado para continuar.',
      );
    }
  }

  const TrataArray = () => {
    if (dadosCompletos === null || dadosCompletos === undefined) {
      return <View />;
    } else {
      return (
        <View style={styles.cardCotacaoAndamento}>
          <View style={styles.internaCardAndamento}>
            <TouchableOpacity
              style={styles.IconTextCard}
              onPress={() => navigation.navigate('ProdutosContinuaNA')}>
              <Icon
                name="list"
                size={40}
                color={'#ffffff'}
                style={styles.iconCard}
              />
              <Text style={styles.textCardAndamento}>
                Finalize a cotação{' '}
                {dadosCompletos && dadosCompletos.tipo !== 'motos'
                  ? 'do carro:'
                  : 'da motocicleta:'}
                {'\n'}
                {dadosCompletos.veiculo.marca}/{dadosCompletos.veiculo.modelo}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoCard}
              onPress={() => navigation.navigate('ProdutosContinuaNA')}>
              <Icon name={'chevron-right'} color={'#ffffff'} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} animated={true} />
      <ScrollView>
        <View style={styles.cabecalho}>
          <View>
            <TouchableOpacity
              style={styles.voltar}
              onPress={() => {
                setModalAssociado(true);
              }}>
              <Icon
                name="user"
                size={28}
                color={'#0c71c3'}
                style={styles.iconeVoltar}
              />
              <Text style={styles.botaoVoltar}>Login</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.textoCabecalho}>
              {visitante ? `Olá, ${visitante.nome.split(' ')[0]}!` : 'Olá!'}
            </Text>
            <Text style={styles.subTextoCabecalho}>
              Bem-vindo ao nosso APP.
            </Text>
          </View>
        </View>

        <View style={styles.cardsContent}>
          <View style={styles.cards}>
            <TrataArray />
            <View style={styles.cardCotacao}>
              <View style={styles.internaCard}>
                <TouchableOpacity
                  style={styles.IconTextCard}
                  onPress={() => navigation.navigate('CotacaoNA')}>
                  <IconFA
                    name="car"
                    size={35}
                    color="#ffffff"
                    style={styles.iconCard}
                  />
                  <Text style={styles.textoCardCotacao}>
                    Clique aqui e faça a cotação de proteção do seu veículo.
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botaoCardCotacao}
                  onPress={() => navigation.navigate('CotacaoNA')}>
                  <Icon name={'chevron-right'} color={'#ffffff'} size={20} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.internaCard}>
                <TouchableOpacity
                  style={styles.IconTextCard}
                  onPress={() => navigation.navigate('Protecoes')}>
                  <Icon
                    name="shield"
                    size={40}
                    color="#ff9800"
                    style={styles.iconCard}
                  />
                  <Text style={styles.textCard}>
                    Proteção de verdade e que vai muito além do seu veículo.
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botaoCard}
                  onPress={() => navigation.navigate('Protecoes')}>
                  <Icon name={'chevron-right'} color={'#ff9800'} size={20} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.internaCard}>
                <TouchableOpacity
                  style={styles.IconTextCard}
                  onPress={() => navigation.navigate('Assistencia')}>
                  <Image
                    source={require('../../imagens/truck.png')}
                    style={[
                      styles.IconTextCard,
                      {width: 40, height: 40, marginLeft: 40},
                    ]}
                  />
                  <Text style={styles.textCard}>
                    Estamos com você onde você estiver e sempre que precisar.
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botaoCard}
                  onPress={() => navigation.navigate('Assistencia')}>
                  <Icon name={'chevron-right'} color={'#ff9800'} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.cards}>
            <View style={styles.card}>
              <View style={styles.internaCard}>
                <TouchableOpacity
                  style={styles.IconTextCard}
                  onPress={() => navigation.navigate('RastreamentoNA')}>
                  <Icon
                    name="navigation"
                    size={40}
                    color="#ff9800"
                    style={styles.iconCard}
                  />
                  <Text style={styles.textCard}>
                    Rastreamento e monitoramento a R$0,01 para quem tem CUIDAR.
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botaoCard}
                  onPress={() => navigation.navigate('RastreamentoNA')}>
                  <Icon name={'chevron-right'} color={'#ff9800'} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                `https://api.whatsapp.com/send?phone=553141122430&text=Olá, sou o *${
                  visitante.nome.split(' ')[0]
                }*, estava no *APP da CUIDAR* e gostaria de tirar uma dúvida.`,
              );
            }}>
            <View style={styles.cardContato}>
              <Text style={styles.textoCardContato}>
                Fale conosco no WhatsApp {'\n'}
                <Icon name="chevron-down" size={30} color={'#ff9800'} />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal animationType="slide" visible={modalAssociado}>
          <StatusBar barStyle={'light-content'} />
          <View style={styles.boxModal}>
            <View style={styles.btnFechaModal}>
              <TouchableOpacity
                style={styles.fechaModal}
                onPress={() => {
                  setModalAssociado(!modalAssociado);
                }}>
                <Image
                  source={require('../../imagens/close.png')}
                  style={styles.imagemFechaModal}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.modalText}>
                Por favor, digite os dados abaixo.
              </Text>
            </View>
            <View style={styles.input}>
              {Number(cpfCnpjExtracted).length >= 11 ? (
                <TextInputMask
                  style={styles.cpfCnpj}
                  placeholder={'CPF ou CNPJ cadastrado'}
                  placeholderTextColor={'#666666'}
                  keyboardType={'phone-pad'}
                  mask={'[00].[000].[000]/[0000]-[00]'}
                  onSubmitEditing={Keyboard.dismiss}
                  returnKeyType={'send'}
                  onChangeText={(formatted, extracted) => {
                    idHandler(formatted);
                    setCpfCnpjExtracted(extracted);
                  }}
                />
              ) : (
                <TextInputMask
                  style={styles.cpfCnpj}
                  keyboardType={'phone-pad'}
                  mask={'[000].[000].[000]-[00]'}
                  placeholder={'CPF ou CNPJ cadastrado'}
                  placeholderTextColor={'#666666'}
                  onChangeText={(formatted, extracted) => {
                    setCpfCnpjExtracted(extracted);
                    idHandler(formatted); // 1234567890
                  }}
                />
              )}

              <TouchableOpacity
                style={styles.botaoAvanca}
                onPress={() => handleSignIn()}>
                <Text style={styles.textoAvanca}>Avançar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardNA;
