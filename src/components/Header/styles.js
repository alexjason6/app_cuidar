import styled, {css} from "styled-components/native";

export const Container = styled.View`
  padding: 10px 10px 20px 10px;
  background: ${({theme}) => theme.colors.blues.main};
  margin-bottom: 15px;

  ${({modalBoleto}) => modalBoleto && css`
    background: ${({theme}) => theme.colors.alert.main};
  `};

  ${({whiteColor}) => whiteColor && css`
    background: ${({theme}) => theme.colors.white};
  `};
`;

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.white};

  ${({title}) => title && css`
    font-size: 28px;
    line-height: 30px;
    font-weight: bold;
    padding: 20px;
  `};

  ${({description}) => description && css`
    font-size: 16px;
    padding: 0px 20px;
  `};

  ${({whiteColor}) => whiteColor && css`
  color: ${({theme}) => theme.colors.blues.main};
  `};
`;
