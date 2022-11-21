import React, {useContext} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Title, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';

import AuthContext from '../contexts/authContext';
import VisitanteContext from '../contexts/guestContext';
import TrackContext from '../contexts/trackerContext';

import wellcomeMessage from '../utils/wellcomeMessage';

export function DrawerContent(props) {
  const {user, signOut} = useContext(AuthContext);
  const {getDevices} = useContext(TrackContext)
  const {signOutVisitante} = useContext(VisitanteContext);
  const mensagem = wellcomeMessage();

  function navegaRastreador() {
    getDevices();
    props.navigation.navigate('Rastreamento');
  }

  function navegaAssociado() {
    props.navigation.navigate('areaAssociado');
  }

  function navegaBoletos() {
    props.navigation.navigate('Boletos');
  }

  function navegaRegulamentos() {
    props.navigation.navigate('Regulamentos');
  }

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>
                  {mensagem}
                  {user.nome ? <Text>, {user.nome.split(' ')[0]}</Text> : null}!
                </Title>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => <Icon name="home" size={24} color="#FF9800" />}
              label="Início"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            {user.cpf === '07010305692' && (
              <DrawerItem
                style={{backgroundColor: '#FF9800'}}
                icon={() => <Icon name="user" size={24} color="#FFF" />}
                label="Administração"
                labelStyle={{color: '#FFF'}}
                onPress={() => {
                  props.navigation.navigate('Admin');
                }}
              />
            )

            }
          </Drawer.Section>
          <Drawer.Section title="Área do Associado" labelStyle={{color: '#666666'}}>
            <DrawerItem
              icon={() => <Icon name="user" size={24} color="#FF9800" />}
              label="Meus dados"
              onPress={() => {
                navegaAssociado();
              }}
            />
            <DrawerItem
              icon={() => <Icon name="dollar-sign" size={24} color="#FF9800" />}
              label="Meus boletos"
              onPress={() => {
                navegaBoletos();
              }}
            />
            <DrawerItem
              icon={() => <Icon name="file-text" size={24} color="#FF9800" />}
              label="Regulamentos"
              onPress={() => {
                navegaRegulamentos();
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Veiculos" labelStyle={{color: '#666666'}}>
            <DrawerItem
              icon={() => <Icon name="navigation" size={24} color="#FF9800" />}
              label="Rastrear meu veículo"
              onPress={() => {
                navegaRastreador();
              }}
            />
            <DrawerItem
              icon={() => <Icon name="shield" size={24} color="#FF9800" />}
              label="Proteções"
              onPress={() => {
                props.navigation.navigate('Protecoes');
              }}
            />
            <DrawerItem
              icon={() => (
                <Image
                  source={require('../imagens/truck.png')}
                  style={{width: 25, height: 25}}
                />
              )}
              label="Assistência 24h"
              onPress={() => {
                props.navigation.navigate('Assistencia');
              }}
            />
            <DrawerItem
              icon={() => (
                <IconFA
                  name="car"
                  size={20}
                  color={'#ff9800'}
                  style={{marginLeft: 3}}
                />
              )}
              label="Proteger novo veículo"
              onPress={() => {
                props.navigation.navigate('Cotacao');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Clube de descontos" labelStyle={{color: '#666666'}}>
            <DrawerItem
              icon={() => <Icon name="shopping-bag" size={24} color="#FF9800" />}
              label="Clube Certo"
              onPress={() => props.navigation.navigate('ClubeCerto')}
            />
          </Drawer.Section>
          <Drawer.Section title="Contato" labelStyle={{color: '#666666'}}>
            <DrawerItem
              icon={() => <Icon name="send" size={24} color="#FF9800" />}
              label="Fale conosco"
              onPress={() => {
                props.navigation.navigate('Falecom');
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
              icon={() => <Icon name="log-out" size={24} color="#FF9800" />}
              label="Sair"
              onPress={() => {
                signOut();
                signOutVisitante();
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 14,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#666666',
    textTransform: 'capitalize',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
