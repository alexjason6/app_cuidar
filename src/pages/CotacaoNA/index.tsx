import React, {useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TextInput,
  Alert,
  Image,
  Keyboard,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import buscarFIPE from '../../services/apiFipe';

const Captacao: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [tipoVeiculo, setTipoVeiculo] = useState<String>();
  const [checkBoxMarca, setCheckBoxMarca] = useState<String>();
  const [checkBoxModelo, setCheckBoxModelo] = useState<String>();
  const [checkBoxAno, setCheckBoxAno] = useState<String>();
  let [marcas, setMarcas] = useState();
  let [modelosFipe, setModelosFipe] = useState();
  let [anoModelo, setAnoModelo] = useState();

  // Filtros listas
  let [filter, setFilter] = useState<string>();
  let [arrayHolder, setArrayHolder] = useState<any>([]);

  async function buscarCarros() {
    setLoading(true);
    try {
      const montadoras = await buscarFIPE.get('/carros/marcas');
      setMarcas(montadoras.data);
      setArrayHolder(montadoras.data);
    } catch {
      Alert.alert('Atenção', 'Algo não deu certo. Tente novamente.');
    }
    setLoading(false);
  }

  async function buscarMotos() {
    setLoading(true);
    const montadoras = await buscarFIPE.get('/motos/marcas');
    setMarcas(montadoras.data);
    setArrayHolder(montadoras.data);
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
      .then((response) => {
        const responseData: Object = response.data;
        navigation.navigate('ProdutosCotacaoNA', {
          responseData,
          tipoVeiculo,
        });
      });
  }

  //FILTRO LISTAS
  function searchData(text) {
    const newData: any = arrayHolder.filter((item) => {
      const itemData = item.nome.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setMarcas(newData);
    setFilter(text);
  }

  function searchModelo(text) {
    const newData: any = arrayHolder.filter((item) => {
      const itemData = item.nome.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setModelosFipe(newData);
    setFilter(text);
  }

  const headerAno = () => {
    return (
      <View style={styles.cabecalho}>
        <View>
          <TouchableOpacity
            style={styles.voltar}
            onPress={() => {
              setAnoModelo(null);
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
          Por favor, selecione o ano/modelo do seu veículo.
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#FF9800" />
      </View>
    );
  }

  // SELECIONAR O ANO MODELO DO VEÍCULO
  if (anoModelo) {
    return (
      <SafeAreaView style={styles.containerMarcas}>
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
      </SafeAreaView>
    );
  }

  // SELECIONAR O MODELO DO VEÍCULO
  if (modelosFipe) {
    return (
      <SafeAreaView style={styles.containerMarcas}>
        <FlatList
          ListHeaderComponent={
            <View>
              <View style={styles.cabecalho}>
                <View>
                  <TouchableOpacity
                    style={styles.voltar}
                    onPress={() => {
                      setModelosFipe(null);
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
                  Por favor, selecione o modelo do seu veículo.
                </Text>
              </View>
              <View>
                <TextInput
                  style={styles.filter}
                  onChangeText={text => searchModelo(text)}
                  underlineColorAndroid="transparent"
                  placeholder="Pesquise aqui o modelo do seu veículo"
                  placeholderTextColor="#cccccc"
                  value={filter}
                  onEndEditing={Keyboard.dismiss}
                  //add onFocus para centralizar na tela o campo
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
      </SafeAreaView>
    );
  }

  // SELECIONAR A MARCA DO VEÍCULO
  if (marcas) {
    return (
      <SafeAreaView style={styles.containerMarcas}>
        <FlatList
          ListHeaderComponent={
            <View>
              <View style={styles.cabecalho}>
                <View>
                  <TouchableOpacity
                    style={styles.voltar}
                    onPress={() => {
                      setMarcas(null);
                      setTipoVeiculo('');
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
                  placeholderTextColor="#cccccc"
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
      </SafeAreaView>
    );
  }

  // SELECIONAR O TIPO DO VEÍCULO
  return (
    <SafeAreaView style={styles.fundoGeral}>
      <ScrollView style={styles.content}>
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
          <Text style={styles.textoCabecalho}>
            Para fazer a cotação precisamos de algumas informações sobre seu
            veículo.
          </Text>
        </View>
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
        <Image
          source={require('../../imagens/icone-launchScreen.png')}
          style={styles.logoCuidar}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Captacao;
