import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: ${({theme}) => theme.colors.grays.lighter};
`;

export const Content = styled.ScrollView`
  background: transparent;
`;