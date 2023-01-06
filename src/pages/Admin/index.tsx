import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Platform,
} from 'react-native';

import AuthContext from '../../contexts/authContext';

import Card from './components/Card/Card';

import Loading from  '../../components/Loading';
import HinovaService from '../../services/HinovaService';
import formatCpf from '../../utils/cpfFormat';
import formatCnpj from '../../utils/cnpjFormat';

import styles from './style';

export default function Admin() {
  const {ativos, inativos, inadimplentes, pendentes, veiculosAtivos, veiculosInativos, veiculosPendentes, veiculosInadimplentes ,refreshToken} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const associados = [...ativos, ...inativos, ...inadimplentes, ...pendentes];
  const veiculos = [...veiculosAtivos, ...veiculosInativos, ...veiculosInadimplentes, ...veiculosPendentes];
  const [searchTerm, setSearchTerm] = useState('');
  const filteredAssociados = associados.filter((associado) => (
    associado?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) || associado?.cpf.includes(searchTerm)
  ));
  const filteredVeiculos = veiculos.filter((veiculo) => (
    veiculo?.placa?.toLowerCase().includes(searchTerm.toLowerCase())
  ));
  const [associado, setAssociado] = useState([]);
  const [mostraAssociado, setMostraAssociado] = useState(false);

  function handleChangeSearchTerm(event: string) {
    setMostraAssociado(false);
    setSearchTerm(Platform.OS === 'ios' ? event.toUpperCase() : event);
  }

  async function handleChangeSearchAssociado(associado) {
    setSearchTerm('');
    setLoading(true);

    const token = await refreshToken();

    try {
      const response = await HinovaService.getAssociado({token: String(token), cpfCnpj: associado})
      setAssociado(response);
      setMostraAssociado(true);
      setLoading(false);
  } catch {
      Alert.alert('Tente novamente', 'Ocorreu um erro ao carregar os dados do associado.');
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{marginBottom: 80}}>
      <View>
        <TextInput
          style={styles.inputSearch}
          onChangeText={handleChangeSearchTerm}
          value={searchTerm}
          autoCorrect={true}
          placeholder='Digite o nome do Associado'
          placeholderTextColor='#666666'
        />
        <ScrollView>
          {filteredAssociados.length >= 1 && searchTerm.length >= 3 && (
            filteredAssociados.map((associado, index) => (
              <TouchableOpacity key={index} onPress={() => handleChangeSearchAssociado(associado.cpf)} style={styles.suggestName}>
                <Text style={styles.textSuggestName}>{Number(searchTerm) && associado.cpf.length === 11 ? formatCpf(associado.cpf) : Number(searchTerm) && associado.cpf.length > 11 ? formatCnpj(associado.cpf)
                : associado.nome}</Text>
              </TouchableOpacity>
            ))
          )}

          {filteredVeiculos.length >= 1 && searchTerm.length >= 3 && (
            filteredVeiculos.map((veiculo, index) => (
              <TouchableOpacity key={index} onPress={() => handleChangeSearchAssociado(veiculo.cpf_associado)} style={styles.suggestName}>
                <Text style={styles.textSuggestName}>{veiculo.placa}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
      {mostraAssociado && (
        <Card props={associado} />
      )}
      {loading && <Loading />}
    </SafeAreaView>
  )
}
