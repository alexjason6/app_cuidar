import React, {useEffect, useState, useContext} from 'react';
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
import AuthContext from '../../contexts/auth';
import Loading from  '../../components/Loading';
import styles from './style';

export default function Admin() {
  const {tokenAssociadoHinova, ativos, inativos, inadimplentes, pendentes, tokenHinova} = useContext(AuthContext);
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

  async function handleChangeSearchData(associado) {
    setSearchTerm('');
    setLoading(true);

    await fetch(`https://api.hinova.com.br/api/sga/v2/associado/buscar/${associado.cpf}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenAssociadoHinova}`,
        },
      },
    )
    .then((response) => response.json())
    .catch(() => {
      Alert.alert('Tente novamente', 'Ocorreu um erro ao carregar os dados do associado.')
    })
    .then((data) => setAssociado(data))
    .then(() => setMostraAssociado(true))
    .finally(() => setLoading(false));
  }

  return (
    <SafeAreaView style={{marginBottom: 80}}>
      <View>
        <TextInput style={styles.inputSearch} onChangeText={handleChangeSearchTerm} value={searchTerm.toUpperCase()} placeholder='Digite o nome do Associado' placeholderTextColor='#666666' />
        <ScrollView>
          {filteredAssociados.length >= 1 && searchTerm.length >= 3 ? (
            filteredAssociados.map((associado, index) => (
              <TouchableOpacity key={index} onPress={() => handleChangeSearchData(associado)} style={styles.suggestName}>
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
