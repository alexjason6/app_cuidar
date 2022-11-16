import styled, {css} from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: ${({theme}) => theme.colors.grays.lighter};
`;

export const Content = styled.ScrollView`
  background: transparent;
`;

export const Text = styled.Text`
    color: ${({theme}) => theme.colors.white};
    font-weight: bold;
`;
