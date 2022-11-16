import React, {useContext} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import AuthContext from '../../contexts/auth';

import styles from './style.js';

export const ErroRastreamento: React.FC = () => {
  const {user} = useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerError}>
        <Text style={styles.title}>Alguma coisa está errada.</Text>
        <Text style={styles.textoHeader}>
          Aparentemente o seu veículo não possui rastreador ou aconteceu algum
          erro na exibição dos veículos rastreados.
        </Text>
      </View>
      <View style={styles.fundoErroTexto}>
        <Text style={styles.textoCorpo}>
          Se seu veículo já rastreador e não está aparecendo aqui, entre em
          contato com a gente e assim verificaremos o motivo do erro e
          resolveremos o problema.
        </Text>

        <View>
          <Text style={styles.textoCorpo}>
            Caso seu veículo não tenha rastreador, entre em contato conosco e
            solicite a instalação de um equipamento.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              `https://api.whatsapp.com/send?phone=5531996658610&text=Olá, sou o *${
                user.nome.split(' ')[0]
              }*, estava no *APP da CUIDAR* e gostaria de tirar uma dúvida.`,
            );
          }}
          style={styles.botaoContato}>
          <Text style={styles.textoDetalhes}>Fale conosco</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mapaExemplo}>
        <Image
          source={require('../../imagens/telamapa.png')}
          style={styles.imageMapa}
        />
      </View>
    </ScrollView>
  );
};

export default ErroRastreamento;
