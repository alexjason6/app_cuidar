import styled, {css} from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: ${({theme}) => theme.colors.grays.lighter};
`;

export const Content = styled.ScrollView`
  background: transparent;
`;

export const Button = styled.TouchableOpacity`
  width: 170px;
  height: 40px;
  margin: 20px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  align-self: flex-end;
  background: ${({theme}) => theme.colors.alert.main};
  border-radius: 4px;

  ${({editable}) => editable && css`
    background: ${({theme}) => theme.colors.greens.main};
  `};
`;

export const Text = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.colors.grays.disabled};
  margin-top: 20px;

  ${({altera}) => altera && css`
    margin-top: 0px;
    color: ${({theme}) => theme.colors.white};
    font-weight: bold;
  `};
`;