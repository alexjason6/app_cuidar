import React, {useContext} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import AuthContext from '../contexts/authContext';
import VisitanteContext from '../contexts/guestContext';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import VisitanteRoutes from './visitante.routes';

const Routes: React.FC = () => {
  const {loadingVisitante, visitante} = useContext(VisitanteContext);
  const {signed, loading} = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#FF9800" />
      </View>
    );
  }

  if (loadingVisitante) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#FF9800" />
      </View>
    );
  }

  return signed ? (
    <AppRoutes />
  ) : !signed && !visitante ? (
    <AuthRoutes />
  ) : visitante && !signed ? (
    <VisitanteRoutes />
  ) : (
    <AuthRoutes />
  );
};

export default Routes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
