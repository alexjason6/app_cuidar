import React, {useState, useContext, useEffect, useCallback} from "react"
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
  Linking,
} from 'react-native';
import AuthContext from "../../contexts/authContext";
import styles from './style'
import buscarClubeCerto from "../../services/apiClubeCerto";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';

const ClubeCerto: React.FC = () => {
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [categoriasCCActive, setCategoriasCCActive] = useState(null);
  const [estabelecimentos, setEstabelecimentos] = useState();
  const [dadosEstabelecimento, setDadosEstabelecimento] = useState();
  const [filtro, setFiltro] = useState(false);
  const estados = [
    {
      "Codigo": "1",
      "Estado": "Acre",
      "Sigla": "AC"
    },
    {
      "Codigo": "2",
      "Estado": "Alagoas",
      "Sigla": "AL"
    },
    {
      "Codigo": "3",
      "Estado": "Amapá",
      "Sigla": "AP"
    },
    {
      "Codigo": "4",
      "Estado": "Amazonas",
      "Sigla": "AM"
    },
    {
      "Codigo": "5",
      "Estado": "Bahia",
      "Sigla": "BA"
    },
    {
      "Codigo": "6",
      "Estado": "Ceará",
      "Sigla": "CE"
    },
    {
      "Codigo": "7",
      "Estado": "Distrito Federal",
      "Sigla": "DF"
    },
    {
      "Codigo": "8",
      "Estado": "Espiríto Santo",
      "Sigla": "ES"
    },
    {
      "Codigo": "9",
      "Estado": "Goiás",
      "Sigla": "GO"
    },
    {
      "Codigo": "10",
      "Estado": "Maranhão",
      "Sigla": "MA"
    },
    {
      "Codigo": "11",
      "Estado": "Mato Grosso",
      "Sigla": "MT"
    },
    {
      "Codigo": "12",
      "Estado": "Mato Grosso do Sul",
      "Sigla": "MS"
    },
    {
      "Codigo": "13",
      "Estado": "Minas Gerais",
      "Sigla": "MG"
    },
    {
      "Codigo": "14",
      "Estado": "Pará",
      "Sigla": "PA"
    },
    {
      "Codigo": "15",
      "Estado": "Paraíba",
      "Sigla": "PB"
    },
    {
      "Codigo": "16",
      "Estado": "Paraná",
      "Sigla": "PR"
    },
    {
      "Codigo": "17",
      "Estado": "Pernambuco",
      "Sigla": "PE"
    },
    {
      "Codigo": "18",
      "Estado": "Piauí",
      "Sigla": "PI"
    },
    {
      "Codigo": "19",
      "Estado": "Rio de Janeiro",
      "Sigla": "RJ"
    },
    {
      "Codigo": "20",
      "Estado": "Rio Grande do Norte",
      "Sigla": "RN"
    },
    {
      "Codigo": "21",
      "Estado": "Rio Grande do Sul",
      "Sigla": "RS"
    },
    {
      "Codigo": "22",
      "Estado": "Rondônia",
      "Sigla": "RO"
    },
    {
      "Codigo": "23",
      "Estado": "Roraima",
      "Sigla": "RR"
    },
    {
      "Codigo": "24",
      "Estado": "Santa Catarina",
      "Sigla": "SC"
    },
    {
      "Codigo": "25",
      "Estado": "São Paulo",
      "Sigla": "SP"
    },
    {
      "Codigo": "26",
      "Estado": "Sergipe",
      "Sigla": "SE"
    },
    {
      "Codigo": "27",
      "Estado": "Tocantins",
      "Sigla": "TO"
    }
  ]
  const categorias = [
    {
      "Codigo": "1",
      "Nome": "Gastronomia"
    },
    {
      "Codigo": "2",
      "Nome": "Saúde"
    },
    {
      "Codigo": "3",
      "Nome": "Educação"
    },
    {
      "Codigo": "4",
      "Nome": "Beleza e Estética"
    },
    {
      "Codigo": "5",
      "Nome": "Moda"
    },
    {
      "Codigo": "6",
      "Nome": "Turismo"
    },
    {
      "Codigo": "7",
      "Nome": "Delivery"
    },
    {
      "Codigo": "8",
      "Nome": "Hospedagem"
    },
    {
      "Codigo": "9",
      "Nome": "Automotivo"
    },
    {
      "Codigo": "10",
      "Nome": "Comércio"
    },
    {
      "Codigo": "11",
      "Nome": "Serviços"
    },
    {
      "Codigo": "12",
      "Nome": "Loja virtual"
    },
    {
      "Codigo": "13",
      "Nome": "Pets"
    },
    {
      "Codigo": "14",
      "Nome": "Fitness"
    },
    {
      "Codigo": "15",
      "Nome": "Lazer"
    },
    {
      "Codigo": "16",
      "Nome": "Cinema"
    },
    {
      "Codigo": "17",
      "Nome": "Posto de Combustível"
    }
  ]
  const [estado, setEstado] = useState();
  const [estadoNome, setEstadoNome] = useState();
  const [cidadeNome, setCidadeNome] = useState();
  const [cidades, setCidades] = useState([]);
  const [cidade, setCidade] = useState();
  const [expanded, setExpanded] = useState(false);
  const [expandedCity, setExpandedCity] = useState(false);

  const [modal, setModal] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const handlePressCity = () => setExpandedCity(!expandedCity);

  async function getCity(uf) {
    await buscarClubeCerto.get(`1/cidades.php?user=cuidar&token=acuidar%40clube19384&estado=${uf.Codigo}`)
    .then((response) => {
      setCidade(response.data[0]);
      setCidades(response.data);
      const cities = JSON.stringify(response.data);
      AsyncStorage.setItem('@CUIDAR:cities', cities);

      const data = {
        codEstado: uf.Codigo,
        codCidade: response.data[0].Codigo,
      }

      setEstadoNome(uf.Estado);
      setCidadeNome(response.data[0].Cidade);
      pegaEstabelecimentos(data);
    })
   }

   useEffect(() => {
    const [uf] = estados.filter((item) => user.estado === item.Sigla);
     getCity(uf);
  }, []);

  async function pegaEstabelecimentos(data:Object) {
    await buscarClubeCerto.get(`2/estabelecimentos.php?user=cuidar&token=acuidar%40clube19384&estado=${data.codEstado}&cidade=${data.codCidade}`)
    .then((response) => {
      setEstabelecimentos(response.data.Estabelecimentos);
      setLoading(false);
    })
  }

  async function buscaCidades(estadoCodigo) {
    setLoading(true);
    setEstado(estadoCodigo);
    await buscarClubeCerto.get(`1/cidades.php?user=cuidar&token=acuidar%40clube19384&estado=${estadoCodigo}`)
    .then((response) => {
      setCidades(response.data);
      setLoading(false);
    })
  }

  async function buscaEstabelecimentos(data:Object) {
    setCidade(data);
    setLoading(true);
    await buscarClubeCerto.get(`2/estabelecimentos.php?user=cuidar&token=acuidar%40clube19384&estado=${estado}&cidade=${data}`)
    .then((response) => {
      setEstabelecimentos(response.data.Estabelecimentos);
      setLoading(false);
    })
  }

  async function buscaPorCategorias(categoria) {
    setCategoriasCCActive(categoria);
    setLoading(true);
    await buscarClubeCerto.get(`2/estabelecimentos.php?user=cuidar&token=acuidar%40clube19384&estado=${estado}&cidade=${cidade.Codigo}&categoria=${categoria}`)
    .then((response) => {
      setEstabelecimentos(response.data.Estabelecimentos);
      setLoading(false);
    })
  }

  async function handleDetails(codEstabelecimento:String) {
    await buscarClubeCerto.get(`2/estabelecimento_dados.php?user=cuidar&token=acuidar%40clube19384&estabelecimento=${codEstabelecimento}.json`, {
      headers: {
      'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      setDadosEstabelecimento(response.data.Estabelecimento[0]);
      setModal(true)
    });
  }

  return (
    <ScrollView>
      <View style={styles.fundoDesconto}>
        <Text style={styles.titleDescontos}>
          A sua melhor experiência é com nosso clube de descontos.
        </Text>

        <Text style={styles.textoDescontos}>
          Estabelecimentos com desconto em todo Brasil e na internet. Aqui você
          economiza sempre e pode sempre economizar mais.
        </Text>

        <Text style={styles.textoDescontos}>
          Veja abaixo os descontos, filtre por categorias, estado ou cidade. Use e abuse.
        </Text>
      </View>
      <ScrollView horizontal={true} style={styles.scrollTips}>
        {categorias.map((categoria) => {
          return (
            <TouchableOpacity
              key={categoria.Codigo}
              style={categoriasCCActive === categoria.Codigo ? styles.stickCategoriesActive : styles.stickCategories}
              onPress={() => {
                buscaPorCategorias(categoria.Codigo);
              }}
            >
              <Text style={
                categoriasCCActive === categoria.Codigo ? styles.textStickCategoriesActive :
                styles.textStickCategories}>
                  {categoria.Nome}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <View>
      <View style={styles.localização}>
        <View style={styles.icon}>
          <IconFA name="map-marker" size={25} color="#ff9800" />
        </View>
        <View>
          <Text>Mostrando descontos de:</Text>
          <Text>{cidadeNome}/{estadoNome}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
        style={styles.filtro}
        onPress={() => setFiltro(!filtro)}>
          <Text>Filtros</Text>
          {!filtro ? <Icon name="chevron-down" size={20} color="#FF9800"/> : <Icon name="chevron-up" size={20} color="#FF9800"/>}
        </TouchableOpacity>
      </View>
      { filtro ? (
        <List.Section>
          <List.Accordion
            expanded={expanded}
            onPress={handlePress}
            title="Selecione o Estado">
            {estados.map((estado) => {
              return (
                <List.Item
                  title={`${estado.Estado}`}
                  key={estado.Codigo}
                  onPress={() => {
                    buscaCidades(estado.Codigo);
                    setEstadoNome(estado.Estado);
                    handlePress();
                  }}
                />
              )
            })
            }
          </List.Accordion>
          <List.Accordion
            expanded={expandedCity}
            onPress={handlePressCity}
            title="Selecione a Cidade"
          >
            {cidades.map((cidade) => {
              return (
                <List.Item
                  key={cidade.Codigo}
                  title={`${cidade.Cidade}`}
                  onPress={() => {
                    handlePressCity();
                    setCidadeNome(cidade.Cidade);
                    buscaEstabelecimentos(cidade.Codigo);
                    setFiltro(false);
                  }}
                />
              )
            })
            }
          </List.Accordion>
      </List.Section> ) : null}

        {loading ? (
          <View style={styles.containerLoading}>
            <ActivityIndicator color="#FF9800" />
          </View>
        ) : estabelecimentos ? (
          estabelecimentos.map((item) => {
            return (
              <TouchableOpacity
              key={item.Codigo}
              style={styles.cardEstabelecimento}
              onPress={() => handleDetails(item.Codigo)}>
                <Image
                  source={{uri:item.Marca}}
                  style={styles.imageParceiro}
                />
                <View style={styles.divisor} />
                <Text style={styles.nomeParceiro}>{item.Nome}</Text>
              </TouchableOpacity>
            )
          })
        ): <Text>Erro ao carregar conteúdo. Arraste a página para baixo para atualizar</Text>}
      </View>
      <Modal visible={modal} animationType='slide'>
        <SafeAreaView>
          <ScrollView style={styles.fundoDetalheDesconto}>
            <TouchableOpacity onPress={() => setModal(false)}><Text>Fechar</Text></TouchableOpacity>
            {dadosEstabelecimento ? (
            <View>
              <Image
                source={{uri:dadosEstabelecimento.Marca}}
                style={styles.imageParceiroDesconto}
              />
              <Text style={styles.titleEstabelecimento}>{dadosEstabelecimento.Nome}</Text>
              <Text style={styles.descricaoEstabelecimento}>
                {dadosEstabelecimento.Beneficios.map((desconto, index) => {
                  return (
                    <View key={index}>
                      <Text style={styles.descricaoEstabelecimento}>{desconto.desconto}</Text>
                      <Text style={styles.regrasEstabelecimento}>Regra: {desconto.regra}{'\n'}{'\n'}</Text>
                    </View>
                  )
                })}
              </Text>
              {dadosEstabelecimento.Linksite ?
              <TouchableOpacity style={styles.botaoDesconto} onPress={() => {
                Linking.openURL(dadosEstabelecimento.Linksite)
              }}>
                <Text style={styles.btnDesconto}>{dadosEstabelecimento.Linkdescricao}</Text>
              </TouchableOpacity>
              : null }
              <Text style={styles.titleRegras}>
                Regras:
              </Text>
              <Text style={styles.regrasEstabelecimento}>
                {dadosEstabelecimento.Regras.replaceAll('<br/>','')}
              </Text>
              <Text style={styles.titleEnderecos}>Endereços:</Text>
              {dadosEstabelecimento.Enderecos.length !== 0 ? (dadosEstabelecimento.Enderecos.map((item, index) => {
                return (
                  <View key={index}>
                    <Text style={styles.titleDetalheDescontos}>{item.titulo}</Text>
                    <Text style={styles.dadosDetalheDesconto}>{item.endereco} - {item.CidadeNome}</Text>
                  </View>
                )
              })): null}
            </View>
            ): null}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </ScrollView>
  )
}

export default ClubeCerto;

