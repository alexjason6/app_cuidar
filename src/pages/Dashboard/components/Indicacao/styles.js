import styled, {css} from "styled-components/native";

export const Container = styled.View`
  background: ${({theme}) => theme.colors.blues.main};
  padding: 10px 10px 30px 10px;
  margin: 10px 10px 20px 10px;
  border-radius: 4px;
`;

export const Text = styled.Text`
  color:${({theme}) => theme.colors.white};
  padding: 0px 20px;

  ${({title}) => title && css`
    font-size: 18px;
    font-weight: bold;
    line-height: 38px;
    margin-top: 38px;
  `};

  ${({description}) => description && css`
    font-size: 14px;
    margin: 15px 0px;
  `};

  ${({enviar}) => enviar && css`
    font-weight: bold;
  `};
`;