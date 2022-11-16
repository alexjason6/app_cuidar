import React, {useState, useContext, useEffect} from 'react';
import { Image } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import AuthContext from '../../contexts/auth';
import ModalContext from '../../contexts/modalContext';

import {Button} from '../../components/Button/index';
import Loading from '../../components/Loading';
import { Modal } from './components/Modal';
import { ModalVisitante } from './components/ModalVisitante';
import WellcomeMessage from '../../utils/wellcomeMessage';

import styles, {Container, Text} from './style';

const SignIn: React.FC = () => {
  const {loading, conectado} = useContext(AuthContext);
  const {changeModal} = useContext(ModalContext);
  const [currentPosition, setCurrentPosition] = useState<object>();
  const wellcomeMessage = WellcomeMessage();

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition((position) => {
      const latitudeUser = JSON.stringify(position.coords.latitude);
      const longitudeUser = JSON.stringify(position.coords.longitude);
      setCurrentPosition({
        latitude: latitudeUser,
        longitude: longitudeUser,
      })
    });
  };

  if (loading) {
    <Loading />
  };

  return (
    <Container>
      <Text saudacao>
        {wellcomeMessage}!
        {'\n'}Você já é nosso associado?
      </Text>
      <Button associado onPress={() => changeModal({modalName: 'associado', active: true, device: 0})}>
        <Text associado>Sou associado</Text>
      </Button>
      <Button visitante onPress={() => changeModal({modalName: 'visitante', active: true, device: 0})}>
        <Text visitante>Quero me associar</Text>
      </Button>
      <Image
        source={require('../../imagens/icone-launchScreen.png')}
        style={styles.logoCuidar}
      />
      <Modal conectado={conectado} />
      <ModalVisitante currentPosition={currentPosition} />
    </Container>
  );
};

export default SignIn;
