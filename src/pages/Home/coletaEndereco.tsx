import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import TextInputMask from 'react-native-text-input-mask';
import VisitanteContext from '../../contexts/guestContext';
import CepService from '../../services/CEPService';
import {useNavigation, useRoute} from '@react-navigation/native';
import styles from './style';
import Icon from 'react-native-vector-icons/Feather';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';

const ColetaEndereco: React.FC = () => {
  const route = useRoute();
  const dadosVisitante = route.params.dadosVisitante;
  const {salvaDadosVisitante} = useContext(VisitanteContext);
  const [cep, setCep] = useState<string>();
  const [logradouro, setLogradouro] = useState<string>();
  const [numero, setNumero] = useState<string>();
  const [complemento, setComplemento] = useState<string>();
  const [bairro, setBairro] = useState<string>();
  const [cidade, setCidade] = useState<string>();
  const [estado, setEstado] = useState<string>();
  const [tokenCM, setTokenCCM] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const date = new Date();

  const dadosVisitanteFinal = {
    nome: dadosVisitante.nome,
    telefone: dadosVisitante.telefone,
    email: dadosVisitante.email,
    cep: cep,
    logradouro: logradouro,
    numero: numero,
    complemento: complemento,
    bairro: bairro,
    cidade: cidade,
    estado: estado,
    userLatLocation: dadosVisitante.latitude,
    userLngLocation: dadosVisitante.longitude,
    tokenCloudMessaging: tokenCM,
  };

  useEffect(() => {
    // Pega o token do dispositivo
    messaging()
      .getToken()
      .then(token => {
        return saveTokenToDatabase(token);
      });
    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []);

  async function saveTokenToDatabase(token) {
    setTokenCCM(token);
    //Salve o token no banco de dados do seu sistema, como salva qualquer outro conteúdo que você utiliza
  }

  async function buscaCep() {
    try {
      if (cep.length < 8) {
        Alert.alert('Atenção!', 'Por favor, digite todos os números do CEP para continuar.');
      } else {
        const response = await CepService.buscaCep(`${cep}/json/`);
        if (response.data.erro === true) {
          Alert.alert(
            'Atenção',
            `O seu CEP não foi encontrado.${'\n'}Confira o CEP digitado e tente novamente.`,
          );
        }
        setLogradouro(response.data.logradouro);
        setCidade(response.data.localidade);
        setEstado(response.data.uf);
        setBairro(response.data.bairro);
      }
    } catch {
      Alert.alert(
        'Atenção!',
        'O seu CEP não foi encontrado. Confira o CEP digitado e tente novamente.',
      );
    }
  }

  async function verificaCampos() {
    setLoading(true);
    if (
      (dadosVisitanteFinal.cep ||
        dadosVisitanteFinal.logradouro ||
        dadosVisitanteFinal.bairro ||
        dadosVisitanteFinal.cidade ||
        dadosVisitanteFinal.estado) !== undefined
    ) {
      salvaDadosVisitante(dadosVisitanteFinal);
      sendMail()
      .then(() => navigation.navigate('DashboardNA'));
    } else {
      setLoading(false);
      Alert.alert('Atenção.', 'Preencha o endereço corretamente para continuar.');
    }
  }

  async function sendMail() {
    try {
      await firestore()
        .collection('Cadastro Visitante')
        .doc(`${dadosVisitanteFinal.nome} = ${date}`)
        .set({
          to: 'falecom@acuidar.com.br',
          message: {
            subject: 'Cadastro visitante - APP Cuidar',
            text: 'Mensagem enviada automaticamente pelo APP',
            html: `Um visitante acabou de passar pela coleta de endereço do <b>aplicativo CUIDAR</b>:<br />Nome: <b>${dadosVisitanteFinal.nome}</b><br />Telefone: <b>${dadosVisitanteFinal.telefone}</b><br />e-mail: <b>${dadosVisitanteFinal.email}</b><br />CEP: <b>${dadosVisitanteFinal.cep}</b><br />Endereço: <b>${dadosVisitanteFinal.logradouro}, ${dadosVisitanteFinal.numero}</b><br />Complemento: <b>${dadosVisitanteFinal.complemento}</b><br />Bairro: <b>${dadosVisitanteFinal.bairro}</b><br />Cidade/UF: <b>${dadosVisitanteFinal.cidade}/${dadosVisitanteFinal.estado}</b><br />GeoLocation: <b>${dadosVisitanteFinal.userLatLocation}, ${dadosVisitanteFinal.userLngLocation}</b><br />Token CloudMessaging: <b>${dadosVisitanteFinal.tokenCloudMessaging}</b><br />`,
          },
        });
    } catch {
      Alert.alert(
        'Atenção',
        'Houve um erro durante a cotela dos dados. Tente novamente.'
      )
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#ffffff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container2}>
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
          <View>
            <Text style={styles.textoCabecalho}>
              Digite seu CEP para continuar
            </Text>
          </View>
        </View>
        <View style={styles.inputs}>
          <TextInputMask
            style={styles.cpfCnpj}
            mask={'[00000]-[000]'}
            placeholder="Seu CEP"
            keyboardType={'phone-pad'}
            placeholderTextColor={'#666666'}
            onChangeText={extracted => setCep(extracted)}
            onEndEditing={buscaCep}
            value={cep}
          />
          <TextInput
            style={styles.telefone}
            placeholder="Rua, Avenida, Alameda..."
            placeholderTextColor={'#666666'}
            onChangeText={text => setLogradouro(text)}
            value={logradouro}
            onEndEditing={Keyboard.dismiss}
            returnKeyType={'next'}
          />
          <View style={styles.doisInputs}>
            <TextInput
              style={styles.telefone50}
              placeholder="Número"
              keyboardType={'phone-pad'}
              placeholderTextColor={'#666666'}
              onChangeText={text => setNumero(text)}
              value={numero}
              onEndEditing={Keyboard.dismiss}
              returnKeyType={'next'}
            />
            <TextInput
              style={styles.telefone50}
              placeholder="Complemento"
              placeholderTextColor={'#666666'}
              onChangeText={text => setComplemento(text)}
              value={complemento}
              onEndEditing={Keyboard.dismiss}
              returnKeyType={'next'}
            />
          </View>
          <TextInput
            style={styles.telefone}
            placeholder="Bairro"
            placeholderTextColor={'#666666'}
            onChangeText={text => setBairro(text)}
            value={bairro}
            onEndEditing={Keyboard.dismiss}
            returnKeyType={'next'}
          />
          <View style={styles.doisInputs}>
            <TextInput
              style={styles.telefone75}
              placeholder="Cidade"
              placeholderTextColor={'#666666'}
              onChangeText={text => setCidade(text)}
              value={cidade}
              onEndEditing={Keyboard.dismiss}
              returnKeyType={'next'}
            />
            <TextInput
              style={styles.email25}
              placeholder="Estado"
              placeholderTextColor={'#666666'}
              onChangeText={text => setEstado(text)}
              value={estado}
              onEndEditing={Keyboard.dismiss}
              returnKeyType={'send'}
            />
          </View>
          <TouchableOpacity
            style={styles.botaoAvancaVisitante}
            onPress={() => {
              setLoading(true);
              verificaCampos();
            }}>
            <Text style={styles.textoAvanca}>Avançar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ColetaEndereco;
