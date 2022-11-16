import React from 'react';
import {View, Text, Image, ScrollView, StatusBar} from 'react-native';
import styles from './style.js';

export const RastreamentoNA: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={'light-content'} animated={true} />
      <View style={styles.header}>
        <Text style={styles.title}>
          Já pensou em ter seu veículo sempre na palma da sua mão?
        </Text>
      </View>
      <View style={styles.fundoErroTexto}>
        <Text style={styles.textoCorpo}>
          Com nosso sistema de rastreamento você tem seu veículo sempre na palma
          da sua mão e a qualquer momento. Aqui no APP você consegue ver o
          endereço onde o veículo está, se está ligado ou desligado, se estiver
          andando você conseguirá ver a velocidade do veículo e muito mais.
        </Text>
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

export default RastreamentoNA;
