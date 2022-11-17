import styled, {css} from "styled-components/native";

export const Modal = styled.Modal`
`;

export const View = styled.View`
  width: 100%;
  background: ${({theme}) => theme.colors.white};

  ${({topButtons}) => topButtons && css`
    height: 40px;
    position: absolute;
    background: transparent;
    justify-content: flex-end;
    flex-direction: row;
    z-index: 9999;
  `};

  ${({infos}) => infos && css`
    width: 100%;
    height: 80%;
    max-height: 180px;
    padding: 15px 20px 20px 20px;
    background: ${({theme}) => theme.colors.white};
  `};
`;

export const Text = styled.Text`
`;

export const ChangeViagem = styled.TouchableOpacity`

`;
