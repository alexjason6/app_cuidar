import styled, {css} from "styled-components/native";

export const Container = styled.View`
  margin: 5px 10px;
  padding: 20px;
  background: ${({theme}) => theme.colors.white};
  border-radius: 4px;
`;
export const View = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;

  ${({placa}) => placa && css`
    padding-bottom: 20px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.grays.disabled};
  `}

  ${({Buttons}) => Buttons && css`
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
  `}

  ${({speed}) => speed && css`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  `}
`;

export const Text = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.colors.grays.main};
  font-weight: bold;

  ${({placa}) => placa && css`
    font-size: 16px;
    color: ${({theme}) => theme.colors.oranges.main};
  `};

  ${({ligado}) => ligado && css`
    color: ${({theme}) => theme.colors.greens.main};
  `};

  ${({desligado}) => desligado && css`
    color: ${({theme}) => theme.colors.danger.main};
  `};

  ${({speed}) => speed && css`
    color: ${({theme}) => theme.colors.grays.main};
  `};

  ${({time}) => time && css`
    align-self: flex-end;
    color: ${({theme}) => theme.colors.grays.light};
    font-weight: normal;
  `};

  ${({address}) => address && css`
    padding: 20px;
    text-align: center;
    color: ${({theme}) => theme.colors.grays.light};
    font-weight: normal;
  `};
`;
