import React, {useState, useContext, useEffect} from "react"
import {
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';

import AuthContext from "../../contexts/authContext";
import ModalContext from "../../contexts/modalContext";

import ClubeCertoService from '../../services/ClubeCertoService';

import ModalDesconto from './components/ModalDesconto';
import Header from '../../components/Header';

import {Container, Tips, Tip, View, Text, TouchableOpacity, Image} from './style';

const ClubeCerto: React.FC = () => {
  const {user} = useContext(AuthContext);
  const {modal, changeModal} = useContext(ModalContext);
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
  const handlePress = () => setExpanded(!expanded);
  const handlePressCity = () => setExpandedCity(!expandedCity);

  async function getCity(uf) {

    await ClubeCertoService.getData(`/1/cidades.php?user=cuidar&token=acuidar%40clube19384&estado=${uf.Codigo}`)
    .then((response) => {
      setCidade(response[0]);
      setCidades(response);
      const cities = JSON.stringify(response);
      AsyncStorage.setItem('@CUIDAR:cities', cities);

      const data = {
        codEstado: uf.Codigo,
        codCidade: response[0].Codigo,
      }

      setEstadoNome(uf.Estado);
      setCidadeNome(response[0].Cidade);
      pegaEstabelecimentos(data);
    })
   }

  async function pegaEstabelecimentos(data:Object) {
    await ClubeCertoService.getData(`/2/estabelecimentos.php?user=cuidar&token=acuidar%40clube19384&estado=${data.codEstado}&cidade=${data.codCidade}`)
    .then((response) => {
      setEstabelecimentos(response.Estabelecimentos);
      setLoading(false);
    })
  }

  async function buscaCidades(estadoCodigo) {
    setLoading(true);
    setEstado(estadoCodigo);

    await ClubeCertoService.getData(`/1/cidades.php?user=cuidar&token=acuidar%40clube19384&estado=${estadoCodigo}`)
    .then((response) => {
      setCidades(response);
      setLoading(false);
    })
  }

  async function buscaEstabelecimentos(data:Object) {
    setCidade(data);
    setLoading(true);

    await ClubeCertoService.getData(`/2/estabelecimentos.php?user=cuidar&token=acuidar%40clube19384&estado=${estado}&cidade=${data}`)
    .then((response) => {
      setEstabelecimentos(response.Estabelecimentos);
      setLoading(false);
    })
  }

  async function buscaPorCategorias(categoria) {
    setCategoriasCCActive(categoria);
    setLoading(true);

    await ClubeCertoService.getData(`/2/estabelecimentos.php?user=cuidar&token=acuidar%40clube19384&estado=${estado}&cidade=${cidade?.Codigo}&categoria=${categoria}`)
    .then((response) => {
      setEstabelecimentos(response.Estabelecimentos);
      setLoading(false);
    })
  }

  async function handleDetails(codEstabelecimento:String) {

    await ClubeCertoService.getData(`/2/estabelecimento_dados.php?user=cuidar&token=acuidar%40clube19384&estabelecimento=${codEstabelecimento}`)
    .then((response) => {
      setDadosEstabelecimento(response.Estabelecimento[0]);
      changeModal({
        modalName: 'modalDesconto',
        active: true,
        device: 0,
      })
    });
  }

  useEffect(() => {
    const [uf] = estados.filter((item) => user.estado === item.Sigla);
    getCity(uf);
  }, []);

  return (
    <Container>
      <Header
        whiteColor
        title={'A sua melhor experiência é com nosso clube de descontos.'}
        description={`Estabelecimentos com desconto em todo Brasil e na internet. Aqui você economiza sempre e pode sempre economizar mais.${'\n'}${'\n'}Veja abaixo os descontos, filtre por categorias, estado ou cidade. Use e abuse.`}
      />
      <Tips horizontal={true}>
        {categorias.map((categoria) => (
          <Tip
            key={categoria.Codigo}
            active={categoriasCCActive === categoria.Codigo}
            onPress={() => buscaPorCategorias(categoria.Codigo)}
          >
            <Text active={categoriasCCActive === categoria.Codigo} tip>
              {categoria.Nome}
            </Text>
          </Tip>
        ))}
      </Tips>

      <View localidade>
        <View>
          <IconFA name="map-marker" size={25} color="#ff9800" />
        </View>
        <View>
          <Text>Mostrando descontos de:</Text>
          <Text>{cidadeNome}/{estadoNome}</Text>
        </View>
      </View>

      <TouchableOpacity filter onPress={() => setFiltro(!filtro)}>
        <Text>Filtros</Text>
        <Icon name={!filtro ? "chevron-down" : "chevron-up"} size={20} color="#FF9800"/>
      </TouchableOpacity>

      {filtro && (
        <List.Section>
          <List.Accordion
            expanded={expanded}
            onPress={handlePress}
            title="Selecione o Estado"
          >
            {estados.map((estado) => (
              <List.Item
                title={`${estado.Estado}`}
                key={estado.Codigo}
                onPress={() => {
                  buscaCidades(estado.Codigo);
                  setEstadoNome(estado.Estado);
                  handlePress();
                }}
              />
            ))}
          </List.Accordion>
          <List.Accordion
            expanded={expandedCity}
            onPress={handlePressCity}
            title="Selecione a Cidade"
          >
            {cidades.map((cidade) => (
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
            ))}
          </List.Accordion>
        </List.Section>
      )}

      {loading && (
        <View loading>
          <ActivityIndicator color="#FF9800" />
        </View>
      )}

      {estabelecimentos ? (
        estabelecimentos.map((item) => (
          <TouchableOpacity
          store
          key={item.Codigo}
          onPress={() => handleDetails(item.Codigo)}>
            <Image source={{uri:item.Marca}}/>
            <View divisor />
            <Text storeName>{item.Nome}</Text>
          </TouchableOpacity>
        ))) : <Text>Erro ao carregar conteúdo. Arraste a página para baixo para atualizar</Text>
      }

      {dadosEstabelecimento && <ModalDesconto visible={modal.modalName === 'modalDesconto' && modal.active} dadosEstabelecimento={dadosEstabelecimento} />}
    </Container>
  )
}

export default ClubeCerto;

