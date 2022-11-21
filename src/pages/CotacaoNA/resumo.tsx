import React, {useContext, useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Modal,
} from 'react-native';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import VisitanteContext from '../../contexts/guestContext';
import RegulamentoAssociado from '../Cotacao/associado';
import AssistenciaCarros from '../Cotacao/carros';
import AssistenciaMotos from '../Cotacao/motos';
import ProtecaoVidros from '../Cotacao/vidros';
import CarroReserva from '../Cotacao/reserva';

const ResumoCotacaoNA: React.FC = () => {
  const {visitante, dadosCompletos} = useContext(VisitanteContext);
  const navigation = useNavigation();
  const route = useRoute();
  const resumoCotacao: object = route.params.resumo;
  const [modal, setModal] = useState<boolean>(false);

  const [regAssociado, setRegAssociado] = useState<boolean>(true);
  const [regAssistenciaCarros, setRegAssistenciaCarros] =
    useState<boolean>(false);
  const [regAssistenciaMotos, setRegAssistenciaMotos] =
    useState<boolean>(false);
  const [regReserva, setRegReserva] = useState<boolean>(false);
  const [regVidros, setRegVidros] = useState<boolean>(false);

  return (
    <>
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
              Confira abaixo o resumo da cotação de proteção do seu veículo.
            </Text>
          </View>
          <View style={styles.fundoResumo}>
            <Text style={styles.titleProdutosResumo}>Seus dados:</Text>

            <View style={styles.ProdutoResumo}>
              <Text style={styles.nomeProdutoResumo}>Seu nome: </Text>
              <Text style={styles.valorProdutoResumo}>
                {resumoCotacao.visitante.nome}
              </Text>
            </View>

            <View style={styles.ProdutoResumo}>
              <Text style={styles.nomeProdutoResumo}>Seu telefone: </Text>
              <Text style={styles.valorProdutoResumo}>
                {resumoCotacao.visitante.telefone}
              </Text>
            </View>

            <View style={styles.ProdutoResumo}>
              <Text style={styles.nomeProdutoResumo}>Seu email: </Text>
              <Text style={styles.valorProdutoResumo}>
                {resumoCotacao.visitante.email}
              </Text>
            </View>

            <View style={styles.ProdutoResumo}>
              <Text style={styles.nomeProdutoResumo}>Endereço: </Text>
              <Text style={styles.valorProdutoResumo}>
                {resumoCotacao.visitante.logradouro},{' '}
                {resumoCotacao.visitante.numero},{' '}
                {resumoCotacao.visitante.complemento},{' '}
                {resumoCotacao.visitante.bairro} -{' '}
                {resumoCotacao.visitante.cidade}/
                {resumoCotacao.visitante.estado}
              </Text>
            </View>

            <Text style={styles.titleParticipacoesResumo}>
              Produtos selecionados:
            </Text>
            <View style={styles.ProdutoResumo}>
              <Text style={styles.nomeProdutoResumo}>
                Taxa administrativa:{' '}
              </Text>
              <Text style={styles.valorProdutoResumo}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(resumoCotacao.produtos.administrativa)}
              </Text>
            </View>

            <View style={styles.ProdutoResumo}>
              <Text style={styles.nomeProdutoResumo}>Rastreador: </Text>
              <Text style={styles.valorProdutoResumo}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(resumoCotacao.produtos.rastreamento)}
              </Text>
            </View>

            <View style={styles.ProdutoResumo}>
              <Text style={styles.nomeProdutoResumo}>
                Roubo/Furto, colisão, incêndio, fenômenos da natureza e perda
                total:{' '}
              </Text>
              <Text style={styles.valorProdutoResumo}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(resumoCotacao.produtos.protecaoCasco)}
              </Text>
            </View>

            <View style={styles.ProdutoResumo}>
              <Text style={styles.nomeProdutoResumo}>
                Assistência e reboque 24h:{' '}
              </Text>
              <Text style={styles.valorProdutoResumo}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(resumoCotacao.produtos.assistencia)}
              </Text>
            </View>

            <View style={styles.ProdutoResumo}>
              <Text style={styles.nomeProdutoResumo}>
                Vidros, faróis, lanternas e retrovisores:{' '}
              </Text>
              <Text style={styles.valorProdutoResumo}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(resumoCotacao.produtos.vidros)}
              </Text>
            </View>

            <View style={styles.ProdutoResumo}>
              <Text style={styles.nomeProdutoResumo}>
                Proteção para terceiros
                {resumoCotacao.produtos.terceiros === 26
                  ? ' R$30.000,00: '
                  : resumoCotacao.produtos.terceiros === 40
                  ? ' R$50.000,00: '
                  : resumoCotacao.produtos.terceiros === 50
                  ? ' R$75.000,00: '
                  : resumoCotacao.produtos.terceiros === 20
                  ? ' R$20.000,00'
                  : ': '}
              </Text>
              <Text style={styles.valorProdutoResumo}>
                {resumoCotacao.produtos.terceiros === 0 ? (
                  'Sem terceiros'
                ) : (
                  <Text>
                    {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(resumoCotacao.produtos.terceiros)}
                  </Text>
                )}
              </Text>
            </View>

            <View style={styles.ProdutoResumo}>
              <Text style={styles.nomeProdutoResumo}>
                Carro reserva
                {resumoCotacao.produtos.carroReserva === 30
                  ? ' 07 dias: '
                  : resumoCotacao.produtos.carroReserva === 60
                  ? ' 14 dias: '
                  : resumoCotacao.produtos.carroReserva === 90
                  ? ' 30 dias: '
                  : ': '}
              </Text>
              <Text style={styles.valorProdutoResumo}>
                {resumoCotacao.produtos.carroReserva === 0 ? (
                  'Sem carro reserva'
                ) : (
                  <Text>
                    {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(resumoCotacao.produtos.carroReserva)}
                  </Text>
                )}
              </Text>
            </View>

            <View style={styles.ProdutoResumo}>
              <Text style={styles.nomeProdutoResumo}>Clube de descontos: </Text>
              <Text style={styles.valorProdutoResumo}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(resumoCotacao.produtos.clubeCerto)}
              </Text>
            </View>

            <View style={styles.ProdutoResumoMensalidade}>
              <Text style={styles.nomeProdutoResumoMensalidade}>
                Valor mensalidade:{' '}
              </Text>
              <Text style={styles.valorProdutoResumoMensalidade}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(resumoCotacao.veiculo.valorMensalidade)}
              </Text>
            </View>

            <View style={styles.ProdutoResumoMensalidade}>
              <Text style={styles.nomeProdutoResumoMensalidade}>
                Taxa adesão:{' '}
              </Text>
              <Text style={styles.valorProdutoResumoMensalidade}>
                {resumoCotacao.veiculo.adesao}
              </Text>
            </View>

            <Text style={styles.titleParticipacoesResumo}>Participações:</Text>

            <View style={styles.ProdutoResumo}>
              <Text style={styles.nomeProdutoResumo}>
                Cota de participação veículo em acidentes:{' '}
              </Text>
              <Text style={styles.valorProdutoResumo}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(resumoCotacao.veiculo.preco.slice(3, 9) * 5)}
              </Text>
            </View>

            <View style={styles.ProdutoResumo}>
              <Text style={styles.nomeProdutoResumo}>
                Cota de participação vidros, faróis, lanternas e retrovisores:{' '}
              </Text>
              <Text style={styles.valorProdutoResumo}>
                30% do valor da peça
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.ResumoRegulamento}
            onPress={() => setModal(true)}>
            <Text>Leia os regulamentos</Text>
          </TouchableOpacity>

          <View style={styles.botoesResumo}>
            <TouchableOpacity
              style={styles.btnVolta}
              onPress={() => navigation.pop()}>
              <Text style={styles.TextBtnVolta}>alterar produtos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnAvancaMarcas}
              onPress={() => {
                navigation.navigate('ColetaDadosCompletos');
              }}>
              <Text style={styles.textBtnAvanca}>Solicitar proteção</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      <SafeAreaView style={styles.safeAreaCinza} />

      <Modal visible={modal} animationType="slide" style={styles.safeAreaModal}>
        <View style={styles.btnFechaModal}>
          <TouchableOpacity
            style={styles.fechaModal}
            onPress={() => setModal(false)}>
            <Icon name="x" size={28} color={'#FF9800'} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerTitleRegulamentos}>
          <Text style={styles.titleModalRegulamentos}>
            Regulamentos Associação Cuidar Clube de Vantagens
          </Text>
        </View>

        <View style={styles.containerFilters}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollHorizontal}>
            <TouchableOpacity
              onPress={() => {
                setRegAssociado(true);
                setRegAssistenciaCarros(false);
                setRegVidros(false);
                setRegReserva(false);
                setRegAssistenciaMotos(false);
              }}>
              {!regAssociado ? (
                <View style={styles.filterRegulamentos}>
                  <Text style={styles.titleSectionRegulamento}>
                    <Icon name={'file-text'} size={15} /> - Associado
                  </Text>
                </View>
              ) : (
                <View style={styles.filterRegulamentos}>
                  <Text style={styles.titleSectionRegulamentoAtivo}>
                    <Icon name={'file-text'} size={15} /> - Associado
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRegAssistenciaCarros(true);
                setRegAssociado(false);
                setRegReserva(false);
                setRegAssistenciaMotos(false);
                setRegVidros(false);
              }}>
              {!regAssistenciaCarros ? (
                <View style={styles.filterRegulamentos}>
                  <Text style={styles.titleSectionRegulamento}>
                    <Icon name={'file-text'} size={15} /> - Assistência 24h -
                    Carros
                  </Text>
                </View>
              ) : (
                <View style={styles.filterRegulamentos}>
                  <Text style={styles.titleSectionRegulamentoAtivo}>
                    <Icon name={'file-text'} size={15} /> - Assistência 24h -
                    Carros
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRegAssistenciaCarros(false);
                setRegAssociado(false);
                setRegReserva(false);
                setRegAssistenciaMotos(true);
                setRegVidros(false);
              }}>
              {!regAssistenciaMotos ? (
                <View style={styles.filterRegulamentos}>
                  <Text style={styles.titleSectionRegulamento}>
                    <Icon name={'file-text'} size={15} /> - Assistência 24h -
                    Motos
                  </Text>
                </View>
              ) : (
                <View style={styles.filterRegulamentos}>
                  <Text style={styles.titleSectionRegulamentoAtivo}>
                    <Icon name={'file-text'} size={15} /> - Assistência 24h -
                    Motos
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRegAssistenciaCarros(false);
                setRegAssociado(false);
                setRegReserva(false);
                setRegAssistenciaMotos(false);
                setRegVidros(true);
              }}>
              {!regVidros ? (
                <View style={styles.filterRegulamentos}>
                  <Text style={styles.titleSectionRegulamento}>
                    <Icon name={'file-text'} size={15} /> - Vidros, faróis,
                    lanternas e retrovisores
                  </Text>
                </View>
              ) : (
                <View style={styles.filterRegulamentos}>
                  <Text style={styles.titleSectionRegulamentoAtivo}>
                    <Icon name={'file-text'} size={15} /> - Vidros, faróis,
                    lanternas e retrovisores
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRegAssistenciaCarros(false);
                setRegAssociado(false);
                setRegReserva(true);
                setRegAssistenciaMotos(false);
                setRegVidros(false);
              }}>
              {!regReserva ? (
                <View style={styles.filterRegulamentos}>
                  <Text style={styles.titleSectionRegulamento}>
                    <Icon name={'file-text'} size={15} /> - Carro reserva
                  </Text>
                </View>
              ) : (
                <View style={styles.filterRegulamentos}>
                  <Text style={styles.titleSectionRegulamentoAtivo}>
                    <Icon name={'file-text'} size={15} /> - Carro reserva
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View>
          {regAssociado ? <RegulamentoAssociado /> : null}
          {regAssistenciaCarros ? <AssistenciaCarros /> : null}
          {regAssistenciaMotos ? <AssistenciaMotos /> : null}
          {regReserva ? <CarroReserva /> : null}
          {regVidros ? <ProtecaoVidros /> : null}
        </View>
      </Modal>
    </>
  );
};

export default ResumoCotacaoNA;
