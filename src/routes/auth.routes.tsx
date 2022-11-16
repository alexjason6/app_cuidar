import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home/Home';
import Captacao from '../pages/CotacaoNA';
import DashBoardNA from '../pages/DashboardNA';
import ResumoCotacaoNA from '../pages/CotacaoNA/resumo';
import ProdutosCotacaoNA from '../pages/CotacaoNA/produtos';
import ColetaEndereco from '../pages/Home/coletaEndereco';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Home"
        options={{headerShown: false}}
        component={Home}
      />
      <AuthStack.Screen name="Captacao" component={Captacao} />
      <AuthStack.Screen
        name="DashboardNA"
        component={DashBoardNA}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ColetaEndereco"
        component={ColetaEndereco}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="CotacaoNA"
        component={Captacao}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ResumoCotacaoNA"
        component={ResumoCotacaoNA}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ProdutosCotacaoNA"
        component={ProdutosCotacaoNA}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
