import React, { useContext, useEffect, useState } from 'react';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';

import ModalContext from '../../../../contexts/modalContext';

import Header from '../../../../components/Header';

import { Container, Content, Dados, Info, Produtos, Text } from './styles';

export default function ModalVehicle({produtos, veiculoData}) {
  const {modal} = useContext(ModalContext);
  const returnAtivos = produtos.filter((item: {situacao: string}) => item.situacao !== 'INATIVO');

  return (
    <Container visible={modal.modalName === 'vehiclesDetails' && modal.active === true} animationType="slide" presentationStyle="formSheet" >
      <Content>
        <Header title={veiculoData.modelo} description={'Segue abaixo todos os detalhes do seu veículo cadastrado aqui na CUIDAR.'} closeButton />  
        <Dados>
          <Text title>Informações do veículo</Text>    
          <Info>
            <IconMCI name={'car'} size={30} color={'#f5d787'} />
            <Text labelInfo>Placa:</Text>
            <Text info>{veiculoData.placa}</Text>
          </Info>

          <Info>
            <IconMCI name={'car-info'} size={30} color={'#f5d787'} />
            <Text labelInfo>Chassi:</Text>
            <Text info>{veiculoData.chassi}</Text>
          </Info>

          <Info>
            <IconMI name={'color-lens'} size={30} color={'#f5d787'} />
            <Text labelInfo>Cor:</Text>
            <Text info>{veiculoData.codigo_cor === '1' ? 'Preto' : veiculoData.codigo_cor === '2' ? 'Branca' : veiculoData.codigo_cor === '3' ? 'Azul' : veiculoData.codigo_cor === '4' ? 'Vermelho' : veiculoData.codigo_cor === '5' ? 'Verde' : veiculoData.codigo_cor === '6' ? 'Cinza' : veiculoData.codigo_cor === '7' ? 'Bege' : veiculoData.codigo_cor === '8' ? 'Amarelo' : veiculoData.codigo_cor === '9' ? 'Prata' : veiculoData.codigo_cor === '10' ? 'Não especificado' : veiculoData.codigo_cor === '11' ? 'Dourado' : veiculoData.codigo_cor === '12' ? 'Laranja' : veiculoData.codigo_cor === '13' ? 'Marron' : 'Outra'}</Text>
          </Info>

          <Info>
            <IconMCI name={'fuel'} size={30} color={'#f5d787'} />
            <Text labelInfo>Combustível:</Text>
            <Text info>{veiculoData.codigo_combustivel === '1' ? 'Flex' : veiculoData.codigo_combustivel === '2' ? 'Gasolina' : veiculoData.codigo_combustivel === '3' ? 'Etanol' : veiculoData.codigo_combustivel === '4' ? 'Diesel' : veiculoData.codigo_combustivel === '5' ? 'Bio-Gás' : 'Outro'}</Text>
          </Info>

          <Info>
            <IconFA name={'gears'} size={30} color={'#f5d787'} />
            <Text labelInfo>Câmbio:</Text>
            <Text info>{veiculoData.cambio === 'A' ? 'Automático' : 'Manual'}</Text>
          </Info>

          <Info>
            <IconMCI name={'car-info'} size={30} color={'#f5d787'} />
            <Text labelInfo>Renavam:</Text>
            <Text info>{veiculoData.renavam}</Text>
          </Info>

          <Info>
            <IconFA name={'dollar'} size={30} color={'#f5d787'} />
            <Text labelInfo>Valor FIPE:</Text>
            <Text info>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(veiculoData.valor_fipe)}
            </Text>
          </Info>

          <Info>
            <IconMCI name={'car-info'} size={30} color={'#f5d787'} />
            <Text labelInfo>Código FIPE:</Text>
            <Text info>{veiculoData.codigo_fipe}</Text>
          </Info>

          <Info>
            <IconFA5 name={'file-invoice-dollar'} size={30} color={'#f5d787'} />
            <Text labelInfo>Franquia:</Text>
            <Text info>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(veiculoData.participacao)}
            </Text>
          </Info>

        </Dados>
        <Dados>
          <Text title>Produtos contratados</Text>
          {returnAtivos.sort((a: {descricao: string}, b: {descricao: string}) => a.descricao > b.descricao ? 1 : -1).map((produto: {descricao: string, valor: number}, key: number) => (
            <Produtos key={key}>
              <IconMCI name={'shield-check-outline'} size={30} color={'#ffffff'} />
              <Text produtos key={key}>{produto.descricao}</Text>
              <Text valor>
                {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                }).format(produto.valor)}
              </Text>
            </Produtos>
          ))}
        </Dados>
      </Content>
    </Container>
  ); 
}