import styled, {css} from "styled-components/native";

export const Button = styled.TouchableOpacity`
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  ${({associado}) => associado && css`
    background: ${({theme}) => theme.colors.blues.main};
    width: 250px;
    margin: 10px;
  `};

  ${({visitante}) => visitante && css`
    width: 250px;
    margin: 10px;
    border-color: ${({theme}) => theme.colors.white};
    border-width: 2px;
  `};

  ${({avanca}) => avanca && css`
    width: 70%;
    margin-top: 30px;
    background: ${({theme}) => theme.colors.oranges.main};
    align-self: center;
  `};

  ${({edita}) => edita && css`
    margin-top: 20px;
    margin-right: -10px;
    flex-direction: row;
    align-self: flex-end;
  `};

  ${({boletos}) => boletos && css`
    background: ${({theme}) => theme.colors.greens.main};
    width: 250px;
    margin: 30px 10px;
    align-self: center;
  `};

  ${({boleto}) => boleto && css`
    width: 150px;
    height: 40px;
    margin-top: 20px;
    background: ${({theme}) => theme.colors.oranges.main};
  `};

  ${({mapView}) => mapView && css`
    width: 150px;
    height: 40px;
    background: ${({theme}) => theme.colors.oranges.main};
  `};

  ${({historyView}) => historyView && css`
    width: 150px;
    height: 40px;
    border-color: ${({theme}) => theme.colors.grays.disabled};
  `};

  ${({danger}) => danger && css`
    height: 40px;
    background: ${({theme}) => theme.colors.danger.main};
  `};

  ${({alert}) => alert && css`
    height: 40px;
    background: ${({theme}) => theme.colors.alert.main};
  `};

  ${({activate}) => activate && css`
    width: 100%;
    height: 40px;
    background: ${({theme}) => theme.colors.blues.main};
  `};

  ${({shareBoleto}) => shareBoleto && css`
    width: 100%;
    height: 100px;
    background: ${({theme}) => theme.colors.blues.main};
  `};
`;
