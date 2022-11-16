import styled, {css} from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: ${({theme}) => theme.colors.grays.lighter};
`;

export const Content = styled.ScrollView`
  background: transparent;
`;

export const ButtonVehicle = styled.TouchableOpacity`

`;

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.grays.main};
  font-size: 14px;
  text-align: left;
  margin-top: 5px;
  font-weight: bold;

  ${({label}) => label && css`
    margin-top: 20px;
    margin-left: 10px;
    color: ${({theme}) => theme.colors.grays.light};
  `};

  ${({edita}) => edita && css`
    font-size: 12px;
    color: ${({theme}) => theme.colors.greens.main};
    font-weight: bold;
    margin-right: 10px;
  `};

  ${({boletos}) => boletos && css`
    font-weight: bold;
    color: ${({theme}) => theme.colors.white};
  `};

  ${({placaAtiva}) => placaAtiva && css`
    margin-top: 20px;
    font-size: 24px;
    color: ${({theme}) => theme.colors.blues.main};
  `};

  ${({placaInativa}) => placaInativa && css`
    margin-top: 20px;
    font-size: 24px;
    color: ${({theme}) => theme.colors.grays.disabled};
  `};

  ${({modeloAtivo}) => modeloAtivo && css`
    color: ${({theme}) => theme.colors.greens.main};
  `};

  ${({modeloInativo}) => modeloInativo && css`
    color: ${({theme}) => theme.colors.grays.disabled};
  `};

  ${({statusAtivo}) => statusAtivo && css`
    color: ${({theme}) => theme.colors.greens.main};
  `};

  ${({statusInativo}) => statusInativo && css`
    color: ${({theme}) => theme.colors.danger.light};
  `};

  ${({chassi}) => chassi && css`
    color: ${({theme}) => theme.colors.grays.disabled};
  `};
`;