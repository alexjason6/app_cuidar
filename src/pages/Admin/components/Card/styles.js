import styled, {css} from 'styled-components/native';

export const Container = styled.ScrollView`
  padding: 20px;
  height: 100%;
`;

export const Text = styled.Text`

  color: ${({theme}) => theme.colors.oranges.main};
  font-size: 16px;

  ${({nomeAssociado}) => nomeAssociado && css`
    font-weight: bold;
    margin-top: 15px;
    text-align: center;
  `};

  ${({placa}) => placa && css`
    font-weight: bold;
  `};

  ${({situacao}) => situacao && css`
    font-size: 12px;
    font-weight: bold;
    padding: 5px;
    border-width: 1px;
    border-radius: 4px;
    border-color: ${({theme}) => theme.colors.oranges.main};
  `};

  ${({ativo}) => ativo && css`
    color: ${({theme}) => theme.colors.greens.main};
  `};

  ${({inativo}) => inativo && css`
    color: ${({theme}) => theme.colors.oranges.main};
  `};

  ${({inadimplente}) => inadimplente && css`
    color: ${({theme}) => theme.colors.danger.main};
  `};

  ${({pendente}) => pendente && css`
    color: ${({theme}) => theme.colors.alert.main};
  `};

  ${({title}) => title && css`
    color: ${({theme}) => theme.colors.blues.main};
    margin: 20px 0px;
    font-weight: bold;
  `};

  ${({semBoletos}) => semBoletos && css`
    font-size: 18px;
    color: ${({theme}) => theme.colors.blues.main};
    margin: 20px 0px;
    font-weight: bold;
    text-align: center;
  `};

  ${({modelo}) => modelo && css`
    color: ${({theme}) => theme.colors.grays.light};
    margin: 10px 0px;
    font-weight: bold;
  `};

  ${({barCode}) => barCode && css`
    font-size: 12px;
    width: 60%;
    color: ${({theme}) => theme.colors.grays.main};
  `};

  ${({valor}) => valor && css`
    font-weight: bold;
    color: ${({theme}) => theme.colors.grays.main};
  `};

  ${({vencimento}) => vencimento && css`
    font-size: 12px;
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
    color: ${({theme}) => theme.colors.blues.main};
  `};

  ${({buttons}) => buttons && css`
    font-size: 14px;
    color: ${({theme}) => theme.colors.white};
    font-weight: bold;
  `};
`;

export const View = styled.View`
  width: 100%;

  ${({hrOrange}) => hrOrange && css`
    height: 1px;
    background: ${({theme}) => theme.colors.oranges.main};
    margin: 15px 0px;
  `};

  ${({placaSituacao}) => placaSituacao && css`
    margin: 15px 0px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  `};

  ${({copyView}) => copyView && css`
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin: 10px 0px;
  `};

  ${({dateView}) => dateView && css`
    align-items: center;
    flex-direction: row;
    margin: 10px 0px;
  `};

  ${({buttons}) => buttons && css`
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 40px;
  `};
`;

export const ButtonCard = styled.TouchableOpacity`
  margin: 5px 0px;
  padding:15px;
  border-radius: 4px;
  background: ${({theme}) => theme.colors.white};
  justify-content: center;
`;
