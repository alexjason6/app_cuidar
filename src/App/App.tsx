import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {VisitanteProvider} from '../contexts/visitante';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from '../contexts/auth';
import {TrackProvider} from '../contexts/rastreamento';
import {StatusBar} from 'react-native';
import Routes from '../routes';
import messaging from '@react-native-firebase/messaging';
import { ModalProvider } from '../contexts/modalContext';

const App: React.FC = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    messaging().onTokenRefresh(() => {});
    const enabled =
      (await authStatus) === messaging.AuthorizationStatus.AUTHORIZED ||
      (await authStatus) === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      const fcmToken = await messaging().getToken();
    }
  }
  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} animated={true} />
      <VisitanteProvider>
        <AuthProvider>
          <TrackProvider>
            <ModalProvider>
              <Routes />
            </ModalProvider>
          </TrackProvider>
        </AuthProvider>
      </VisitanteProvider>
    </NavigationContainer>
  );
};

export default App;
