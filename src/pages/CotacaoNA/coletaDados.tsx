import React, {useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  Modal,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TextInputMask from 'react-native-text-input-mask';
import styles from './style';
import Icon from 'react-native-vector-icons/Feather';
import {List} from 'react-native-paper';
import CardView from 'react-native-cardview';
import ImagePicker from 'react-native-image-crop-picker';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VisitanteContext from '../../contexts/visitante';

const ColetaDadosCompletos: React.FC = () => {
  const navigation = useNavigation();
  const [nomeCompleto, setNomeCompleto] = useState<string>();
  const {visitante} = useContext(VisitanteContext);
  const [cpf_cnpj, setCpf_cnpj] = useState<string>('');
  const [rg, setRg] = useState<string>();
  const [dataNascimento, setDataNascimento] = useState<string>();
  const [placa, setPlaca] = useState<string>();
  const [anoFabricacao, setAnoFabricacao] = useState<string>();
  const [chassi, setChassi] = useState<string>();
  const [renavam, setRenavam] = useState<string>();
  const [color, setColor] = useState<string>();
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCNH, setLoadingCNH] = useState<boolean>(false);
  const [loadingCRLV, setLoadingCRLV] = useState<boolean>(false);
  const [loadingEND, setLoadingEND] = useState<boolean>(false);
  const [cnh, setCnh] = useState<boolean>(false);
  const [crlv, setCrlv] = useState<boolean>(false);
  const [endereco, setEndereco] = useState<boolean>(false);
  const [dadosCompletos, setDadosCompletos] = useState<object>();
  const [expanded, setExpanded] = useState<boolean>(true);
  const date = new Date();

  useEffect(() => {
    getStorage();
  }, []);

  async function getStorage() {
    const data = await AsyncStorage.getItem('@CUIDAR:dadosCompletos');
    setDadosCompletos(JSON.parse(data));
  }

  useEffect(() => {
    function verificaImagens() {
      if (cnh && crlv && endereco) {
        Alert.alert(
          'Sucesso!',
          'Sua solicitação de proteção foi enviada. Agora é só aguardar o nosso contato.',
          [
            {
              text: 'Cancelar',
              onPress: () => {
                setEndereco(false);
                setCnh(false);
                setCrlv(false);
              },
            },
            {
              text: 'Ok',
              onPress: () => {
                AsyncStorage.removeItem('@CUIDAR:veiculoVisitante').then(() =>
                  navigation.navigate('DashboardNA'),
                );
              },
            },
          ],
        );
      }
    }
    verificaImagens();
  }, [cnh, crlv, endereco, navigation]);

  if (dadosCompletos === null) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  const takePhotoFromCameraCNH = () => {
    ImagePicker.openCamera({
      width: 1600,
      height: 2400,
      cropping: true,
      compressImageQuality: 0.8,
    })
      .then(imageSelected => {
        const imageUri = imageSelected.path;
        setLoadingCNH(true);
        uploadImage(imageUri);
      })
      .finally(() => {
        setCnh(true);
      });
  };

  const takePhotoFromCameraCRLV = () => {
    ImagePicker.openCamera({
      width: 1600,
      height: 2400,
      cropping: true,
      compressImageQuality: 0.8,
    })
      .then(imageSelected => {
        const imageUri = imageSelected.path;
        setLoadingCRLV(true);
        uploadImage(imageUri);
      })
      .finally(() => {
        setCrlv(true);
      });
  };

  const takePhotoFromCameraEnd = () => {
    ImagePicker.openCamera({
      width: 1600,
      height: 2400,
      cropping: true,
      compressImageQuality: 0.8,
    })
      .then(imageSelected => {
        const imageUri = imageSelected.path;
        setLoadingEND(true);
        uploadImage(imageUri);
      })
      .finally(() => {
        setEndereco(true);
      });
  };

  const choosePhotoFromLibraryCNH = () => {
    ImagePicker.openPicker({
      width: 1600,
      height: 2400,
      cropping: true,
      compressImageQuality: 0.8,
    })
      .then(imageSelected => {
        const imageUri = imageSelected.path;
        setLoadingCNH(true);
        uploadImage(imageUri);
      })
      .finally(() => {
        setCnh(true);
      });
  };

  const choosePhotoFromLibraryCRLV = () => {
    ImagePicker.openPicker({
      width: 1600,
      height: 2400,
      cropping: true,
      compressImageQuality: 0.8,
    })
      .then(imageSelected => {
        const imageUri = imageSelected.path;
        setLoadingCRLV(true);
        uploadImage(imageUri);
      })
      .finally(() => {
        setCrlv(true);
      });
  };

  const choosePhotoFromLibraryCompEndereco = () => {
    ImagePicker.openPicker({
      width: 1600,
      height: 2400,
      cropping: true,
      compressImageQuality: 0.8,
    })
      .then(imageSelected => {
        const imageUri = imageSelected.path;
        setLoadingEND(true);
        uploadImage(imageUri);
      })
      .finally(() => {
        setEndereco(true);
      });
  };

  const submitPost = async () => {
    await firestore()
      .collection('CotacoesNA-Finalizadas')
      .doc(`${placa} - ${date}`)
      .set({
        dados: {
          associado: {
            nome: nomeCompleto,
            cpfCnpj: cpf_cnpj,
            dataNascimento: dataNascimento,
            rg: rg,
            email: dadosCompletos.visitante.email,
            telefone: dadosCompletos.visitante.telefone,
          },
          endereco: {
            cep: dadosCompletos.visitante.cep,
            logradouro: dadosCompletos.visitante.logradouro,
            numero: dadosCompletos.visitante.numero,
            complemento: dadosCompletos.visitante.complemento,
            bairro: dadosCompletos.visitante.bairro,
            cidade: dadosCompletos.visitante.cidade,
            estado: dadosCompletos.visitante.estado,
          },
          veiculo: {
            placa: placa,
            marca: dadosCompletos.veiculo.marca,
            modelo: dadosCompletos.veiculo.modelo,
            anoModelo: dadosCompletos.veiculo.ano_modelo,
            anoFabricacao: anoFabricacao,
            chassi: chassi,
            renavam: renavam,
            cor: color,
            combustivel: dadosCompletos.veiculo.combustivel,
            codigoFipe: dadosCompletos.veiculo.fipe_codigo,
            referencia: dadosCompletos.veiculo.referencia,
            valorFipe: dadosCompletos.veiculo.preco,
          },
          produtos: {
            administrativa: dadosCompletos.produtos.administrativa,
            assistencia: 'Assistência 24h',
            carroReserva:
              dadosCompletos.produtos.carroReserva === 90
                ? 'Carro reserva 30 dias'
                : dadosCompletos.produtos.carroReserva === 30
                ? 'Carro reserva 7 dias'
                : dadosCompletos.produtos.carroReserva === 60
                ? 'Carro reserva 14 dias'
                : 'Sem carro reserva',
            clubeCerto: 'Clube certo',
            protecaoCasco: 'Casco',
            rastreamento: 'Rastreamento',
            terceiros:
              dadosCompletos.produtos.terceiros === 20
                ? 'Terceiros 20 mil'
                : dadosCompletos.produtos.terceiros === 26
                ? 'Terceiros 30 mil'
                : dadosCompletos.produtos.terceiros === 40
                ? 'Terceiros 50 mil'
                : dadosCompletos.produtos.terceiros === 50
                ? 'Terceiros 75 mil'
                : 'Sem terceiros',
            valorMensalidade: dadosCompletos.veiculo.valorMensalidade,
            adesao: dadosCompletos.veiculo.adesao,
          },
          diversos: {
            tokeCloudMessaging: dadosCompletos.visitante.tokenCloudMessaging,
            latitude: dadosCompletos.visitante.userLatLocation,
            longitude: dadosCompletos.visitante.userLngLocation,
          },
        },
        postTime: firestore.Timestamp.fromDate(new Date()),
        quemPostou: `Postado via APP por: ${nomeCompleto} - ${cpf_cnpj}`,
      })
      .catch(() => {
        Alert.alert(
          'Tente novamente!',
          'Algo deu errado e seus dados não foram enviados.',
        );
        setModal(false);
      });
  };

  async function uploadImage(imageUri) {
    await auth()
      .signInAnonymously()
      .then(() => {
        setLoading(true);
      })
      .catch();

    const uploadUri = imageUri;
    const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const storageRef = storage().ref(`${placa}/${filename}`);
    const task = await storageRef.putFile(uploadUri);

    try {
      await task;
      setLoading(false);
      setLoadingCNH(false);
      setLoadingCRLV(false);
      setLoadingEND(false);
    } catch {
      setLoading(false);
      return null;
    }
  }

  function verificaCampos() {
    if (!nomeCompleto) {
      Alert.alert('Atenção!', 'Digite seu nome para continuar.');
    } else if (!cpf_cnpj) {
      Alert.alert('Atenção', 'Digite seu CPF ou CNPJ para continuar.');
    } else if (!rg) {
      Alert.alert('Atenção', 'Digite seu RG para continuar.');
    } else if (!dataNascimento) {
      Alert.alert('Atenção', 'Digite sua data de nascimento para continuar.');
    } else if (!placa) {
      Alert.alert('Atenção', 'Digite a placa do seu veículo para continuar.');
    } else if (!chassi) {
      Alert.alert('Atenção', 'Digite o chassi do seu veículo para continuar.');
    } else if (!renavam) {
      Alert.alert('Atenção', 'Digite o renavam do seu veículo para continuar.');
    } else if (!color) {
      Alert.alert('Atenção', 'Selecione a cor do seu veículo para continuar.');
    } else {
      submitPost();
      setModal(true);
    }
  }

  const CNHOk = () => {
    return (
      <>
        {loading && cnh && loadingCNH ? (
          <View style={styles.docOK}>
            <ActivityIndicator color="#FF9800" />
          </View>
        ) : (
          <View style={styles.docOK}>
            <Icon name={'check'} size={100} color={'#c2e000'} />
            <Text style={styles.enviado}>CNH enviada</Text>
          </View>
        )}
      </>
    );
  };

  const CRLVOk = () => {
    return (
      <>
        {loading && crlv && loadingCRLV ? (
          <View style={styles.docOK}>
            <ActivityIndicator color="#FF9800" />
          </View>
        ) : (
          <View style={styles.docOK}>
            <Icon name={'check'} size={100} color={'#c2e000'} />
            <Text style={styles.enviado}>Documento do veículo enviado</Text>
          </View>
        )}
      </>
    );
  };

  const CompEndOk = () => {
    return (
      <>
        {loading && endereco && loadingEND ? (
          <View style={styles.docOK}>
            <ActivityIndicator color="#FF9800" />
          </View>
        ) : (
          <View style={styles.docOK}>
            <Icon name={'check'} size={100} color={'#c2e000'} />
            <Text style={styles.enviado}>Comprovante de endereço enviado</Text>
          </View>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView style={styles.contentResumo}>
        <View style={styles.cabecalho}>
          <View>
            <TouchableOpacity
              style={styles.voltar}
              onPress={() => {
                navigation.pop();
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
          <Text style={styles.textoCabecalho}>
            {visitante.nome.split(' ')[0]}, preencha os dados abaixo para
            continuar.
          </Text>
        </View>
        <View style={styles.dadosListaSolicita}>
          <Text style={styles.titleProdutosResumo}>Seus dados:{'\n'}</Text>
          <TextInput
            placeholder={'Digite seu nome completo'}
            placeholderTextColor={'#666666'}
            style={styles.inputDados}
            onChangeText={text => setNomeCompleto(text)}
          />
          {cpf_cnpj.length < 14 ? (
            <TextInputMask
              style={styles.inputDados}
              keyboardType={'phone-pad'}
              mask={'[000].[000].[000]-[00]'}
              placeholder={'Digite seu CPF ou CNPJ'}
              placeholderTextColor={'#666666'}
              onChangeText={formatted => {
                setCpf_cnpj(formatted);
              }}
            />
          ) : (
            <TextInputMask
              style={styles.inputDados}
              placeholder={'Digite seu CPF ou CNPJ'}
              placeholderTextColor={'#666666'}
              keyboardType={'phone-pad'}
              mask={'[00].[000].[000]/[0000]-[00]'}
              onChangeText={formatted => {
                setCpf_cnpj(formatted);
              }}
            />
          )}
          <TextInput
            placeholder={'Digite os números do seu RG'}
            keyboardType={'number-pad'}
            placeholderTextColor={'#666666'}
            style={styles.inputDados}
            onChangeText={setRg}
          />
          <TextInputMask
            style={styles.inputDados}
            placeholder={'Digite sua data de nascimento'}
            placeholderTextColor={'#666666'}
            keyboardType={'phone-pad'}
            mask={'[00]/[00]/[0000]'}
            onChangeText={formatted => {
              setDataNascimento(formatted);
            }}
          />

          <Text style={styles.titleProdutosResumo}>
            Dados do seu veículo:{'\n'}
          </Text>
          <TextInputMask
            mask={'[AAA]-[----]'}
            placeholder={'Digite a placa do veículo'}
            placeholderTextColor={'#666666'}
            maxLength={Platform.OS === 'ios' ? 7 : 8}
            style={styles.inputDados}
            onChangeText={formatted => setPlaca(formatted.toUpperCase())}
          />
          <TextInput
            placeholder={'Digite o ano de fabricação do veículo'}
            placeholderTextColor={'#666666'}
            style={styles.inputDados}
            onChangeText={setAnoFabricacao}
            keyboardType={'phone-pad'}
            maxLength={4}
          />
          <TextInput
            placeholder={'Digite o chassi do veículo'}
            placeholderTextColor={'#666666'}
            style={styles.inputDados}
            onChangeText={text => setChassi(text.toUpperCase())}
            maxLength={17}
          />
          <TextInput
            placeholder={'Digite o Renavam do veículo'}
            placeholderTextColor={'#666666'}
            style={styles.inputDados}
            onChangeText={setRenavam}
            keyboardType={'phone-pad'}
            maxLength={11}
          />
          <List.Section style={styles.inputDados}>
            <List.Accordion
              title="Escolha a cor do seu veículo"
              expanded={expanded}
              onPress={() => {
                !expanded ? setExpanded(true) : setExpanded(false);
              }}>
              <List.Item
                title={'Amarelo'}
                right={props =>
                  color === 'Amarelo' ? (
                    <List.Icon {...props} color={'#FF9800'} icon="check" />
                  ) : null
                }
                left={props => (
                  <List.Icon
                    {...props}
                    color={'#cccccc'}
                    icon="chevron-right"
                  />
                )}
                onPress={() => {
                  setColor('Amarelo');
                  setExpanded(false);
                }}
              />
              <List.Item
                title={'Azul'}
                right={props =>
                  color === 'Azul' ? (
                    <List.Icon {...props} color={'#FF9800'} icon="check" />
                  ) : null
                }
                left={props => (
                  <List.Icon
                    {...props}
                    color={'#cccccc'}
                    icon="chevron-right"
                  />
                )}
                onPress={() => {
                  setColor('Azul');
                  setExpanded(false);
                }}
              />
              <List.Item
                title={'Bege'}
                right={props =>
                  color === 'Bege' ? (
                    <List.Icon {...props} color={'#FF9800'} icon="check" />
                  ) : null
                }
                left={props => (
                  <List.Icon
                    {...props}
                    color={'#cccccc'}
                    icon="chevron-right"
                  />
                )}
                onPress={() => {
                  setColor('Bege');
                  setExpanded(false);
                }}
              />
              <List.Item
                title={'Branca'}
                right={props =>
                  color === 'Branca' ? (
                    <List.Icon {...props} color={'#FF9800'} icon="check" />
                  ) : null
                }
                left={props => (
                  <List.Icon
                    {...props}
                    color={'#cccccc'}
                    icon="chevron-right"
                  />
                )}
                onPress={() => {
                  setColor('Branca');
                  setExpanded(false);
                }}
              />
              <List.Item
                title={'Cinza'}
                right={props =>
                  color === 'Cinza' ? (
                    <List.Icon {...props} color={'#FF9800'} icon="check" />
                  ) : null
                }
                left={props => (
                  <List.Icon
                    {...props}
                    color={'#cccccc'}
                    icon="chevron-right"
                  />
                )}
                onPress={() => {
                  setColor('Cinza');
                  setExpanded(false);
                }}
              />
              <List.Item
                title={'Dourado'}
                right={props =>
                  color === 'Dourado' ? (
                    <List.Icon {...props} color={'#FF9800'} icon="check" />
                  ) : null
                }
                left={props => (
                  <List.Icon
                    {...props}
                    color={'#cccccc'}
                    icon="chevron-right"
                  />
                )}
                onPress={() => {
                  setColor('Dourado');
                  setExpanded(false);
                }}
              />
              <List.Item
                title={'Fantasia'}
                right={props =>
                  color === 'Fantasia' ? (
                    <List.Icon {...props} color={'#FF9800'} icon="check" />
                  ) : null
                }
                left={props => (
                  <List.Icon
                    {...props}
                    color={'#cccccc'}
                    icon="chevron-right"
                  />
                )}
                onPress={() => {
                  setColor('Fantasia');
                  setExpanded(false);
                }}
              />
              <List.Item
                title={'Marron'}
                right={props =>
                  color === 'Marron' ? (
                    <List.Icon {...props} color={'#FF9800'} icon="check" />
                  ) : null
                }
                left={props => (
                  <List.Icon
                    {...props}
                    color={'#cccccc'}
                    icon="chevron-right"
                  />
                )}
                onPress={() => {
                  setColor('Marron');
                  setExpanded(false);
                }}
              />
              <List.Item
                title={'Prata'}
                right={props =>
                  color === 'Prata' ? (
                    <List.Icon {...props} color={'#FF9800'} icon="check" />
                  ) : null
                }
                left={props => (
                  <List.Icon
                    {...props}
                    color={'#cccccc'}
                    icon="chevron-right"
                  />
                )}
                onPress={() => {
                  setColor('Prata');
                  setExpanded(false);
                }}
              />
              <List.Item
                title={'Preto'}
                right={props =>
                  color === 'Preto' ? (
                    <List.Icon {...props} color={'#FF9800'} icon="check" />
                  ) : null
                }
                left={props => (
                  <List.Icon
                    {...props}
                    color={'#cccccc'}
                    icon="chevron-right"
                  />
                )}
                onPress={() => {
                  setColor('Preto');
                  setExpanded(false);
                }}
              />
              <List.Item
                title={'Rosa'}
                right={props =>
                  color === 'Rosa' ? (
                    <List.Icon {...props} color={'#FF9800'} icon="check" />
                  ) : null
                }
                left={props => (
                  <List.Icon
                    {...props}
                    color={'#cccccc'}
                    icon="chevron-right"
                  />
                )}
                onPress={() => {
                  setColor('Rosa');
                  setExpanded(false);
                }}
              />
              <List.Item
                title={'Roxo'}
                right={props =>
                  color === 'Roxo' ? (
                    <List.Icon {...props} color={'#FF9800'} icon="check" />
                  ) : null
                }
                left={props => (
                  <List.Icon
                    {...props}
                    color={'#cccccc'}
                    icon="chevron-right"
                  />
                )}
                onPress={() => {
                  setColor('Roxo');
                  setExpanded(false);
                }}
              />
              <List.Item
                title={'Verde'}
                right={props =>
                  color === 'Verde' ? (
                    <List.Icon {...props} color={'#FF9800'} icon="check" />
                  ) : null
                }
                left={props => (
                  <List.Icon
                    {...props}
                    color={'#cccccc'}
                    icon="chevron-right"
                  />
                )}
                onPress={() => {
                  setColor('Verde');
                  setExpanded(false);
                }}
              />
              <List.Item
                title={'Vermelho'}
                right={props =>
                  color === 'Vermelho' ? (
                    <List.Icon {...props} color={'#FF9800'} icon="check" />
                  ) : null
                }
                left={props => (
                  <List.Icon
                    {...props}
                    color={'#cccccc'}
                    icon="chevron-right"
                  />
                )}
                onPress={() => {
                  setColor('Vermelho');
                  setExpanded(false);
                }}
              />
            </List.Accordion>
          </List.Section>
        </View>
        <View>
          <TouchableOpacity onPress={() => verificaCampos()}>
            <CardView style={styles.cardAvanca}>
              <Text style={styles.textoCardAvanca}>Avançar</Text>
              <Icon name="chevron-down" size={28} color={'#ff9800'} />
            </CardView>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal animationType="slide" visible={modal}>
        <StatusBar barStyle={'dark-content'} />
        <SafeAreaView>
          <ScrollView>
            <View style={styles.cabecalho}>
              <View>
                <TouchableOpacity
                  style={styles.voltar}
                  onPress={() => setModal(false)}>
                  <Icon
                    name="chevron-left"
                    size={28}
                    color={'#0c71c3'}
                    style={styles.iconeVoltar}
                  />
                  <Text style={styles.botaoVoltar}>Voltar</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.textoCabecalho}>
                Agora precisamos das fotos de alguns dos seus documentos.
              </Text>
            </View>
            {cnh ? (
              <CNHOk />
            ) : (
              <View style={styles.docCNH}>
                <Icon name={'image'} size={100} color={'#999999'} />
                <Text>Anexe aqui a foto da sua CNH</Text>
                <View style={styles.viewBtnImagens}>
                  <TouchableOpacity
                    style={styles.btnImagens}
                    onPress={takePhotoFromCameraCNH}>
                    <Icon name={'camera'} color={'#ffffff'} size={20} />
                    <Text style={styles.textBtnImagens}>Tirar foto</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnImagens}
                    onPress={choosePhotoFromLibraryCNH}>
                    <Icon name={'image'} color={'#ffffff'} size={20} />
                    <Text style={styles.textBtnImagens}>Galeria</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {crlv ? (
              <CRLVOk />
            ) : (
              <View style={styles.docCNH}>
                <Icon name={'image'} size={100} color={'#999999'} />
                <Text>Anexe aqui a foto do documento do veículo</Text>
                <View style={styles.viewBtnImagens}>
                  <TouchableOpacity
                    style={styles.btnImagens}
                    onPress={takePhotoFromCameraCRLV}>
                    <Icon name={'camera'} color={'#ffffff'} size={20} />
                    <Text style={styles.textBtnImagens}>Tirar foto</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnImagens}
                    onPress={choosePhotoFromLibraryCRLV}>
                    <Icon name={'image'} color={'#ffffff'} size={20} />
                    <Text style={styles.textBtnImagens}>Galeria</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {endereco ? (
              <CompEndOk />
            ) : (
              <View style={styles.docCNH}>
                <Icon name={'image'} size={100} color={'#999999'} />
                <Text>Anexe aqui a seu comprovante de endereço</Text>
                <View style={styles.viewBtnImagens}>
                  <TouchableOpacity
                    style={styles.btnImagens}
                    onPress={takePhotoFromCameraEnd}>
                    <Icon name={'camera'} color={'#ffffff'} size={20} />
                    <Text style={styles.textBtnImagens}>Tirar foto</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnImagens}
                    onPress={() => {
                      choosePhotoFromLibraryCompEndereco();
                    }}>
                    <Icon name={'image'} color={'#ffffff'} size={20} />
                    <Text style={styles.textBtnImagens}>Galeria</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};
export default ColetaDadosCompletos;
