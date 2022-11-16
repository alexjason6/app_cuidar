import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Captacao from '../pages/CotacaoNA';
import DashBoardNA from '../pages/DashboardNA';
import ColetaEndereco from '../pages/Home/coletaEndereco';
import ProdutosCotacaoNA from '../pages/CotacaoNA/produtos';
import ProdutosContinuaNA from '../pages/CotacaoNA/produtosContinua';
import ResumoCotacaoNA from '../pages/CotacaoNA/resumo';
import ColetaDadosCompletos from '../pages/CotacaoNA/coletaDados';
import Protecoes from '../pages/Protecoes';
import Assistencia from '../pages/Assistencia';
import RastreamentoNA from '../pages/rastreadorNA';
import RegulamentoAssociado from '../pages/Cotacao/associado';

const VisitanteStack = createStackNavigator();

const VisitanteRoutes: React.FC = () => {
  return (
    <VisitanteStack.Navigator initialRouteName="DashboardNA">
      <VisitanteStack.Screen
        name="DashboardNA"
        options={{title: 'Início', headerShown: false}}
        component={DashBoardNA}
      />
      <VisitanteStack.Screen name="Captacao" component={Captacao} />
      <VisitanteStack.Screen
        name="CotacaoNA"
        component={Captacao}
        options={{headerShown: false}}
      />
      <VisitanteStack.Screen
        name="ResumoCotacaoNA"
        component={ResumoCotacaoNA}
        options={{headerShown: false}}
      />
      <VisitanteStack.Screen
        name="ColetaEndereco"
        component={ColetaEndereco}
        options={{headerShown: false}}
      />
      <VisitanteStack.Screen
        name="ProdutosCotacaoNA"
        component={ProdutosCotacaoNA}
        options={{headerShown: false}}
      />
      <VisitanteStack.Screen
        name="ProdutosContinuaNA"
        component={ProdutosContinuaNA}
        options={{headerShown: false}}
      />
      <VisitanteStack.Screen
        name="ColetaDadosCompletos"
        component={ColetaDadosCompletos}
        options={{headerShown: false}}
      />
      <VisitanteStack.Screen
        name="Protecoes"
        component={Protecoes}
        options={{
          title: 'Proteções',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FF9800', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <VisitanteStack.Screen
        name="Assistencia"
        component={Assistencia}
        options={{
          title: 'Assistências',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FF9800', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <VisitanteStack.Screen
        name="RastreamentoNA"
        component={RastreamentoNA}
        options={{
          title: 'Rastreamento',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FF9800', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <VisitanteStack.Screen
        name="RegulamentoAssociado"
        component={RegulamentoAssociado}
        options={{
          headerShown: false,
        }}
      />
    </VisitanteStack.Navigator>
  );
};

export default VisitanteRoutes;
