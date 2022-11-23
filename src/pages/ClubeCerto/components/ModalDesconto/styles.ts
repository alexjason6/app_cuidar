import styled, {css} from "styled-components/native";

export const Container = styled.Modal`
  width: 100%;
`;

export const Content = styled.ScrollView`
  background: ${({theme}) => theme.colors.white};
  padding: 10px;
`;

export const Text = styled.Text`
  font-size: 12px;
  margin-bottom: 15px;
  color: ${({theme}) => theme.colors.grays.main};

  ${({titleEstabelecimento}) => titleEstabelecimento && css`
    font-size: 16;
    color: ${({theme}) => theme.colors.blues.main};
    font-weight: bold;
    text-transform: uppercase;
  `};

  ${({descricaoEstabelecimento}) => descricaoEstabelecimento && css`
    font-size: 14px;
    margin: 0px;
    color: ${({theme}) => theme.colors.greens.dark};
    font-weight: bold;
  `};

  ${({regrasEstabelecimento}) => regrasEstabelecimento && css`
    font-size: 12px;
    margin: 30px 0px;
  `};

  ${({btnDesconto}) => btnDesconto && css`
    font-size: 14px;
    color: ${({theme}) => theme.colors.white};
    font-weight: bold;
    margin: 0px;
  `};

  ${({titleDetalheDescontos}) => titleDetalheDescontos && css`
    margin: 10px 0px;
  `};

  ${({dadoDetalheDescontos}) => dadoDetalheDescontos && css`
    color: ${({theme}) => theme.colors.grays.disabled};
    padding: 0px 10px;
  `};
`;

export const View = styled.View`

`;

export const Image = styled.Image`
  width: 100px;
  height: 100px;
  align-self: center;
`;
