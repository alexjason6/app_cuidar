import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: ${({theme}) => theme.colors.grays.lighter};
`;

export const Content = styled.ScrollView`
  background: ${({theme}) => theme.colors.grays.light};
`;

export const Dados = styled.View`
  width: 100%;
  margin-bottom: 40px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  align-self: center;
  background:transparent;
`;

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-weight: bold;
`;