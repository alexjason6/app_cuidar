import styled, {css} from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 80%;
  max-height: 180px;
  padding: 15px 20px 20px 20px;
  background: ${({theme}) => theme.colors.white};

`;

export const View = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${({deviceName}) => deviceName && css`
    padding-bottom: 10px;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.grays.lighter};
  `};

  ${({address}) => address && css`
    justify-content: flex-start;
  `};
`;

export const Text = styled.Text`
  font-size: 14px;
  margin: 5px 0px;

  ${({placa}) => placa && css`
    font-size: 16px;
    font-weight: bold;
  `};

  ${({desligado}) => desligado && css`
    margin-top: 0px;
    color: ${({theme}) => theme.colors.grays.main};
  `};

  ${({ligado}) => ligado && css`
    margin-top: 0px;
    color: ${({theme}) => theme.colors.oranges.main};
  `};

  ${({speed}) => speed && css`
    font-weight: bold;
    color: ${({theme}) => theme.colors.alert.main};
  `};

  ${({ignition}) => ignition && css`
    color: ${({theme}) => theme.colors.grays.light};
  `};

  ${({stoped}) => stoped && css`
    font-size: 12px;
    color: ${({theme}) => theme.colors.blues.main};
  `};

  ${({address}) => address && css`
    width: 90%;
    font-size: 12px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.grays.light};
  `};

  ${({refresh}) => refresh && css`
    color: ${({theme}) => theme.colors.grays.light};
    align-self: flex-end;
  `};
`;
