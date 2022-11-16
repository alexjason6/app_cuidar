import styled, {css} from "styled-components/native";

export const Container = styled.Modal`
  width: 100%;
  height: 100%;
`;

export const Content = styled.ScrollView`
  background: ${({theme}) => theme.colors.grays.lighter};
`;

export const Dados = styled.View`
  margin: 10px 10px;
  padding: 20px;
  border-radius: 4px;
  background: ${({theme}) => theme.colors.white};
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Info = styled.View`
  width: 100px;
  height: 100px;
  padding: 10px;
  margin: 9px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.alert.light};
  justify-content: center;
  align-items: center;
`;

export const Produtos = styled.View`
  width: 44.3%;
  height: 150px;
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  background: ${({theme}) => theme.colors.greens.light};
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.grays.main};
  text-align: center;

  ${({title}) => title && css`
    font-size: 18px;
    text-transform: uppercase;
    margin: 15px 0px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.oranges.main};
    text-align: left;
  `};

  ${({produtos}) => produtos && css`
    font-size: 11px;
    margin-top: 10px;
    font-weight: bold;
    text-transform: capitalize;
  `};

  ${({valor}) => valor && css`
    font-size: 12px;
    margin-top: 5px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.white};
  `};

  ${({labelInfo}) => labelInfo && css`
    font-size: 12px;
    margin-top: 15px;
    color: ${({theme}) => theme.colors.grays.main};
  `};

  ${({info}) => info && css`
    font-size: 10px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.grays.main};
  `};
`;