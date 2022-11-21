import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';

import Card from './components/Card';
import AuthContext from '../../contexts/authContext';
import Loading from  '../../components/Loading';
import styles from './style';
import HinovaService from '../../services/HinovaService';

export default function Admin() {
  const {tokenAssociadoHinova, ativos, inativos, inadimplentes, pendentes, refreshToken} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const associados = [...ativos, ...inativos, ...inadimplentes, ...pendentes];
  const [searchTerm, setSearchTerm] = useState('');
  const filteredAssociados = associados.filter((associado) => (
    associado.nome.toLowerCase().includes(searchTerm.toLowerCase())
  ));
  const [associado, setAssociado] = useState([]);
  const [mostraAssociado, setMostraAssociado] = useState(false);

  function handleChangeSearchTerm(event) {
    setMostraAssociado(false);
    setSearchTerm(event);
  }

  async function handleChangeSearchAssociado(associado) {
    setSearchTerm('');
    setLoading(true);

    try {
      const response = await HinovaService.getAssociado({token: String(tokenAssociadoHinova), cpfCnpj: associado.cpf})
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
        <TextInput style={styles.inputSearch} onChangeText={handleChangeSearchTerm} value={searchTerm.toUpperCase()} placeholder='Digite o nome do Associado' placeholderTextColor='#666666' />
        <ScrollView>
          {filteredAssociados.length >= 1 && searchTerm.length >= 3 ? (
            filteredAssociados.map((associado, index) => (
              <TouchableOpacity key={index} onPress={() => handleChangeSearchAssociado(associado)} style={styles.suggestName}>
                <Text style={styles.textSuggestName}>{associado.nome}</Text>
              </TouchableOpacity>
            ))
          ) : null}
        </ScrollView>
      </View>
      {mostraAssociado && (
        <Card props={associado} />
      )}
      {loading && <Loading />}
    </SafeAreaView>
  )
}
