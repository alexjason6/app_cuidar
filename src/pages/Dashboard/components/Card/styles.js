import styled, {css} from "styled-components/native";

export const Container = styled.View`
  height: 200px;
  margin: 5px 10px;
  border-radius: 4px;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
  border-left-width: 3px;
  border-left-color: ${({theme}) => theme.colors.oranges.main};
  background: ${({theme}) => theme.colors.white};
  justify-content: center;
  align-items: center;

  ${({admin}) => admin && css`
    background: ${({theme}) => theme.colors.oranges.main};
    border-left-color: ${({theme}) => theme.colors.blues.main};
  `};

  ${({destaque}) => destaque && css`
    background: ${({theme}) => theme.colors.blues.main};
    border-left-color: ${({theme}) => theme.colors.oranges.main};
  `};

  ${({rastreamento}) => rastreamento && css`
    background: ${({theme}) => theme.colors.greens.main};
    border-left-color: ${({theme}) => theme.colors.oranges.main};
  `};
`;

export const Text = styled.Text`
  font-size: 16px;
  padding: 20px;
  color: ${({theme}) => theme.colors.grays.main};

  ${({admin}) => admin&& css`
    color: ${({theme}) => theme.colors.white};
  `};

  ${({destaque}) => destaque&& css`
    color: ${({theme}) => theme.colors.white};
  `};

  ${({rastreamento}) => rastreamento&& css`
    color: ${({theme}) => theme.colors.white};
  `};
`;

export const Interna = styled.View`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: column;
  width: 75%;

  ${({arrow}) => arrow && css`
    width: 50px;
    height: 180px;
    border-left-width: 2px;
    border-left-color: ${({theme}) => theme.colors.white};
    justify-content: center;
    align-items: center;
    flex-direction: row;
  `};

  ${({arrowOrange}) => arrowOrange && css`
    width: 50px;
    height: 180px;
    border-left-width: 2px;
    border-left-color: ${({theme}) => theme.colors.blues.main};
    justify-content: center;
    align-items: center;
    flex-direction: row;
  `};
`;