import styled, {css} from "styled-components/native";

export const Container = styled.View`
  margin: 10px;
  padding: 20px;
  border-radius: 4px;
  background: ${({theme}) => theme.colors.white};
`;

export const CopyView = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 10px 0px;
`;

export const DateView = styled.View`
  align-items: center;
  flex-direction: row;
  margin: 10px 0px;
`;

export const Text = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.colors.grays.main};

  ${({title}) => title && css`
    font-size: 18px;
    margin-bottom: 15px;
    color: ${({theme}) => theme.colors.oranges.main};
    font-weight: bold;
  `};

  ${({barCode}) => barCode && css`
    width: 60%;
  `};

  ${({valor}) => valor && css`
    font-size: 16px;
    font-weight: bold;
  `};

  ${({vencimento}) => vencimento && css`
    color: ${({theme}) => theme.colors.blues.main};
    margin-left: 10px;
  `};

  ${({tipo}) => tipo && css`
    font-size: 14px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.alert.main};
    margin-bottom: 10px;
  `};

  ${({placas}) => placas && css`
    font-size: 14px;
    color: ${({theme}) => theme.colors.blues.main};;
  `};
`;
