import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Linking,
  Platform,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

import {DrawerContent} from '../menu/DrawerContent';

import Dashboard from '../pages/Dashboard';
import Boletos from '../pages/AreaAssociado/Boletos';
import AreaAssociado from '../pages/AreaAssociado/';
import DadosAssociados from '../pages/AreaAssociado/Associado';
import Regulamentos from '../pages/AreaAssociado/Regulamentos';
import Rastreamento from '../pages/Rastreamento';
import Protecoes from '../pages/Protecoes';
import Assistencia from '../pages/Assistencia';
import Falecom from '../pages/Falecom';
import Cotacao from '../pages/Cotacao';
import ClubeCerto from '../pages/ClubeCerto'
import Admin from '../pages/Admin';

const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = props => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => toggleDrawer()}>
          <Icon name="menu" color="#FFFFFF" size={24} style={styles.menu} />
        </TouchableOpacity>
      </View>
    </>
  );
};

function homeStack({navigation}) {
  function dialCall() {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${08002567000}';
    } else {
      phoneNumber = 'telprompt:${08002567000}';
    }

    Linking.openURL(phoneNumber);
  }

  return (
    <AppStack.Navigator initialRouteName="Dashboard">
      <AppStack.Screen
        name="Home"
        component={Dashboard}
        options={{
          title: 'Início', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={dialCall}>
              <Image
                source={require('../../src/imagens/chama-reboque.png')}
                style={styles.iconeAssociado}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#FF9800', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
            fontSize: Platform.OS === 'android' ? 18 : null,
          },
        }}
      />
    </AppStack.Navigator>
  );
}

function RastreamentoStack({navigation}) {
  return (
    <AppStack.Navigator mode="modal">
      <AppStack.Screen
        name="Rastreamento"
        component={Rastreamento}
        options={{
          title: 'Rastreamento', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-left"
                color="#FFFFFF"
                size={24}
                style={styles.iconeAssociado}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#FF9800', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
            fontSize: Platform.OS === 'android' ? 18 : null,
          },
        }}
      />
    </AppStack.Navigator>
  );
}

function BoletosStack({navigation}) {
  return (
    <AppStack.Navigator initialRouteName="Boletos">
      <AppStack.Screen
        name="Boletos"
        component={Boletos}
        options={{
          title: 'Área financeira', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-left"
                color="#FFFFFF"
                size={24}
                style={styles.iconeAssociado}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#FF9800', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
            fontSize: Platform.OS === 'android' ? 18 : null,
          },
        }}
      />
    </AppStack.Navigator>
  );
}

function RegulamentosStack({navigation}) {
  return (
    <AppStack.Navigator initialRouteName="Regulamentos">
      <AppStack.Screen
        name="Regulamentos"
        component={Regulamentos}
        options={{
          title: 'Regulamentos', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-left"
                color="#FFFFFF"
                size={24}
                style={styles.iconeAssociado}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#FF9800', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
            fontSize: Platform.OS === 'android' ? 18 : null,
          },
        }}
      />
    </AppStack.Navigator>
  );
}

function areaAssociadoStack({navigation}) {
  return (
    <AppStack.Navigator
      initialRouteName="areaAssociado"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-left"
              color="#FFFFFF"
              size={24}
              style={styles.iconeAssociado}
            />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#FF9800', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
          fontSize: Platform.OS === 'android' ? 18 : null,
        },
      }}>
      <AppStack.Screen
        name="areaAssociado"
        component={AreaAssociado}
        options={{
          title: 'Área do Associado', //Set Header Title
        }}
      />
    </AppStack.Navigator>
  );
}

function DadosAssociadoStack({navigation}) {
  return (
    <AppStack.Navigator
      initialRouteName="DadosAssociados"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-left"
              color="#FFFFFF"
              size={24}
              style={styles.iconeAssociado}
            />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#FF9800', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
          fontSize: Platform.OS === 'android' ? 18 : null,
        },
      }}>
      <AppStack.Screen
        name="Dados Associado"
        component={DadosAssociados}
        options={{
          title: 'Dados do Associado', //Set Header Title
        }}
      />
    </AppStack.Navigator>
  );
}

function ProtecoesStack({navigation}) {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-left"
              color="#FFFFFF"
              size={24}
              style={styles.iconeAssociado}
            />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#FF9800', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
          fontSize: Platform.OS === 'android' ? 18 : null,
        },
      }}>
      <AppStack.Screen
        name="Protecoes"
        component={Protecoes}
        options={{
          title: 'Proteções', //Set Header Title
        }}
      />
    </AppStack.Navigator>
  );
}

function AssistenciaStack({navigation}) {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-left"
              color="#FFFFFF"
              size={24}
              style={styles.iconeAssociado}
            />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#FF9800', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
          fontSize: Platform.OS === 'android' ? 18 : null,
        },
      }}>
      <AppStack.Screen
        name="Assistencia"
        component={Assistencia}
        options={{
          title: 'Assistência 24 horas', //Set Header Title
        }}
      />
    </AppStack.Navigator>
  );
}

function FaleComStack({navigation}) {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Falecom"
        component={Falecom}
        options={{
          title: 'Fale conosco', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-left"
                color="#FFFFFF"
                size={24}
                style={styles.iconeAssociado}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#FF9800', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
            fontSize: Platform.OS === 'android' ? 18 : null,
          },
        }}
      />
    </AppStack.Navigator>
  );
}

function CotacaoStack({navigation}) {
  return (
    <AppStack.Navigator initialRouteName="Cotacao">
      <AppStack.Screen
        name="Cotacao"
        component={Cotacao}
        options={{
          title: 'Cotação de proteção', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-left"
                color="#FFFFFF"
                size={24}
                style={styles.iconeAssociado}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#FF9800', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
            fontSize: Platform.OS === 'android' ? 18 : null,
          },
        }}
      />
    </AppStack.Navigator>
  );
}

function ClubeCertoStack({navigation}) {
  return (
    <AppStack.Navigator initialRouteName="Clube Certo">
      <AppStack.Screen
        name="ClubeCerto"
        component={ClubeCerto}
        options={{
          title: 'Clube Certo', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-left"
                color="#FFFFFF"
                size={24}
                style={styles.iconeAssociado}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#FF9800', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
            fontSize: Platform.OS === 'android' ? 18 : null,
          },
        }}
      />
    </AppStack.Navigator>
  );
}


function AdminStack({navigation}) {
  return (
    <AppStack.Navigator initialRouteName="Admin">
      <AppStack.Screen
        name="Admin"
        component={Admin}
        options={{
          title: 'Administração', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-left"
                color="#FFFFFF"
                size={24}
                style={styles.iconeAssociado}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#FF9800', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
            fontSize: Platform.OS === 'android' ? 18 : null,
          },
        }}
      />
    </AppStack.Navigator>
  );
}


const AppRoutes: React.FC = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={homeStack} />
    <Drawer.Screen name="Admin" component={AdminStack} />
    <Drawer.Screen name="areaAssociado" component={areaAssociadoStack} />
    <Drawer.Screen name="Rastreamento" component={RastreamentoStack} />
    <Drawer.Screen name="Boletos" component={BoletosStack} />
    <Drawer.Screen name="Regulamentos" component={RegulamentosStack} />
    <Drawer.Screen name="DadosAssociado" component={DadosAssociadoStack} />
    <Drawer.Screen name="Protecoes" component={ProtecoesStack} />
    <Drawer.Screen name="Assistencia" component={AssistenciaStack} />
    <Drawer.Screen name="Falecom" component={FaleComStack} />
    <Drawer.Screen name="Cotacao" component={CotacaoStack} />
    <Drawer.Screen name="ClubeCerto" component={ClubeCertoStack} />
  </Drawer.Navigator>
);

export default AppRoutes;

const styles = StyleSheet.create({
  menu: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  iconeAssociado: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});
