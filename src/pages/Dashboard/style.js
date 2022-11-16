import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: ${({theme}) => theme.colors.white};
`;

export const Content = styled.ScrollView`
  padding: 5px 0px;
  background: ${({theme}) => theme.colors.grays.main};
`;
