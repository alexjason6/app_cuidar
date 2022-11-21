import React, {useContext, useState} from 'react';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';

import AuthContext from '../../../contexts/authContext';

import HinovaService from '../../../services/HinovaService';
import Loading from '../../../components/Loading';
import cpfFormat from '../../../utils/cpfFormat';
import cepFormat from '../../../utils/cepFormat';
import cnpjFormat from '../../../utils/cnpjFormat';
import emailFormat from '../../../utils/emailFormat';
import dateFormat from '../../../utils/dateFormat';
import phoneFormat from '../../../utils/phoneFormat';
import Card from '../components/Card';
import Header from '../../../components/Header';
import {Input} from '../../../components/Input';
import CEPService from '../../../services/CEPService';

import {Container, Content, Button, Text} from './style';

const DadoAssociado: React.FC = () => {
  const {user, loading, tokenAssociadoHinova, refreshAssociado} = useContext(AuthContext);
  const [editable, setEditable] = useState(false);
  const [nome, setNome] = useState(user.nome);
  const [data_nascimento, setData_nascimento] = useState(moment(user.data_nascimento).format('DD/MM/YYYY'));
  const [cpf, setCpf] = useState(user.cpf);
  const [rg, setRg] = useState(user.rg);
  const [cep, setCep] = useState(user.cep);
  const [logradouro, setLogradouro] = useState(user.logradouro);
  const [numero, setNumero] = useState(user.numero);
  const [complemento, setComplemento] = useState(user.complemento);
  const [bairro, setBairro] = useState(user.bairro);
  const [cidade, setCidade] = useState(user.cidade);
  const [estado, setEstado] = useState(user.estado);
  const [telefone, setTelefone] = useState(phoneFormat(user.telefone_fixo));
  const [celular, setCelular] = useState(phoneFormat(user.telefone_celular));
  const [email, setEmail] = useState(user.email);

  function editaDados() {

    if (!editable) {
      setEditable(true);
    }

    if (editable) {
      Alert.alert('Atenção!', 'Você confirma a alteração dos dados?', [
        {
          text: 'Cancelar',
          onPress: () => setEditable(false)
        },
        {
          text: 'Confirmar',
          onPress: () => {
            setEditable(false);
            handleUpdateAssociado();
          }
        }
      ])
    }
  }

  async function buscaCep(text: string) {
    const cepReceived = cepFormat(text);

    setCep(cepReceived);

    if (cepReceived.length === 9) {
      await CEPService.buscaCep(text)
      .then((response) => {
        setLogradouro(response.logradouro);
        setBairro(response.bairro);
        setCidade(response.localidade);
        setEstado(response.uf);
      })
    }
  }


  function handleChangeDataNascimento(data: string) {
    setData_nascimento(dateFormat(data));
  }

  function handleChangeEmail(text: string) {
    const email = emailFormat(text);

    setEmail(email);
  }

  async function handleUpdateAssociado() {
    await HinovaService.updateAssociado({token: tokenAssociadoHinova, body: {
      codigo_associado: user.codigo_associado,
      nome,
      cpf,
      rg,
      data_nascimento,
      telefone,
      celular,
      email,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
    }})
    .then((response) => {
      if (response.mensagem === 'Alterado') {
        Alert.alert('Sucesso!', 'Associado alterado com sucesso.')
        refreshAssociado();
      }
    })
  }

  if (loading) {
    <Loading />
  }

  return (
    <Container>
      <Content>
        <Header title={'Mantenha seus dados cadastrais sempre atualizados.'} description={'Assim teremos sempre como entrar em contato com você caso seja necessário.'} closeButton={false} children={undefined} />
        <Card title={'Dados Pessoais'}>
          <Text>Nome/Razão Social:</Text>
          <Input dados value={nome.toUpperCase()} onChangeText={(text) => setNome(text)} editable={editable} returnKeyType={'next'} />
          <Text>Data de nascimento: Ex.: 31/12/1985</Text>
          <Input dados value={data_nascimento} onChangeText={(text) => handleChangeDataNascimento(text)} editable={editable} keyBoardType={'phone-pad'} returnKeyType={'next'} maxLength={10}/>
          <Text>CPF/CNPJ:</Text>
          <Input dados value={cpf.length >= 15 ? cnpjFormat(cpf) : cpfFormat(cpf)} onChangeText={(text) => {}} editable={editable} keyBoardType={'phone-pad'} returnKeyType={'next'} />
          <Text>RG:</Text>
          <Input dados value={rg} onChangeText={() => {}} editable={editable} keyBoardType={'phone-pad'} returnKeyType={'next'} />
          <Button onPress={editaDados} editable={editable}>
            <Text altera>Alterar dados</Text>
            <Icon name="edit" color={'#ffffff'} size={18} />
          </Button>
        </Card>

        <Card title={'Contato'}>
          <Text>Email:</Text>
          <Input dados value={email} onChangeText={(text) => handleChangeEmail(text)} editable={editable} keyBoardType={'email-address'} returnKeyType={'next'}  />
          <Text>Celular:</Text>
          <Input dados value={celular} onChangeText={(text) => setCelular(phoneFormat(text))} editable={editable} keyBoardType={'email-address'} returnKeyType={'next'}  />
          <Text>Telefone:</Text>
          <Input dados value={telefone} onChangeText={(text) => setTelefone(phoneFormat(text))} editable={editable} keyBoardType={'email-address'} returnKeyType={'next'}  />
          <Button onPress={editaDados} editable={editable}>
            <Text altera>Alterar dados</Text>
            <Icon name="edit" color={'#ffffff'} size={18} />
          </Button>
        </Card>

        <Card title={'Endereco'}>
          <Text>CEP:</Text>
          <Input dados value={cep} onChangeText={(text: string) => buscaCep(text)} editable={editable} keyBoardType={'phone-pad'} returnKeyType={'next'} maxLength={9}/>
          <Text>Logradouro: Ex.: Rua Camuripeba</Text>
          <Input dados value={logradouro} onChangeText={() => {}} editable={editable} returnKeyType={'next'}  />
          <Text>Número:</Text>
          <Input dados value={numero} onChangeText={() => {}} editable={editable} keyBoardType={'phone-pad'} returnKeyType={'next'} />
          <Text>Complemento:</Text>
          <Input dados value={complemento} onChangeText={() => {}} editable={editable} returnKeyType={'next'} />
          <Text>Bairro:</Text>
          <Input dados value={bairro} onChangeText={() => {}} editable={editable} returnKeyType={'next'} />
          <Text>Cidade:</Text>
          <Input dados value={cidade} onChangeText={() => {}} editable={editable} returnKeyType={'next'} />
          <Text>Estado:</Text>
          <Input dados value={estado} onChangeText={() => {}} editable={editable} returnKeyType={'next'} maxLength={2} />
          <Button onPress={editaDados} editable={editable}>
            <Text altera>Alterar dados</Text>
            <Icon name="edit" color={'#ffffff'} size={18} />
          </Button>
        </Card>
      </Content>
    </Container>
  );
};

export default DadoAssociado;
