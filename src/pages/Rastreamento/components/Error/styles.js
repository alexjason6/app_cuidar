import styled, {css} from 'styled-components/native';

export const Container = styled.ScrollView`
  background: ${({theme}) => theme.colors.grays.lighter};
`;

export const Text = styled.Text`
  font-size: 16px;
  margin: 20px;
  color: ${({theme}) => theme.colors.grays.main};

  ${({botao}) => botao && css`
    color: ${({theme}) => theme.colors.white};
    font-weight: bold,
    margin: 0px;
  `};
`;

