import styled, {css} from 'styled-components/native';

export const Container = styled.ScrollView`
  background: ${({theme}) => theme.colors.grays.lighter};
`;

export const Tips = styled.ScrollView`
  height: 75px;
`;

export const Tip = styled.TouchableOpacity`
  height: 35px;
  margin: 0px 4px;
  margin-top: 20px;
  background: ${({theme}) => theme.colors.white};
  border-radius: 25px;
  align-items: center;
  justify-content: center;

  ${({active}) => active && css`
    background: ${({theme}) => theme.colors.blues.main};
  `};
`;

export const View = styled.View`

  ${({localidade}) => localidade && css`
    margin: 20px;
    flex-direction: row;
  `};

  ${({loading}) => loading && css`
    height: 200px;
    margin: 20px;
    align-items: center;
    justify-content: center;
  `};

  ${({divisor}) => divisor && css`
    width: 2px;
    height: 90%;
    margin: 0px 10px;
    background: ${({theme}) => theme.colors.oranges.main};
  `};
`;

export const TouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

  ${({filter}) => filter && css`
    width: 100%;
    margin: 5px auto;
    padding-right: 20px;
    justify-content: flex-end;
  `};

  ${({store}) => store && css`
    width: 94%;
    height: 90px;
    margin: 5px auto;
    padding: 0px 10px;
    border-radius: 4px;
    background: ${({theme}) => theme.colors.white};
    justify-content: flex-start;
  `};
`;

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.grays.main};

  ${({tip}) => tip && css`
    margin: 8px 20px;
    color: ${({theme}) => theme.colors.oranges.main};
    font-weight: bold;
  `};

  ${({active}) => active && css`
    color: ${({theme}) => theme.colors.white};
  `};

  ${({storeName}) => storeName && css`
    font-size: 15px;
    font-weight: bold;
  `};
`;

export const Image = styled.Image`
  width: 70px;
  height: 70px;
`;
