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
  `};

  ${({markerInicial}) => markerInicial && css`
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background: ${({theme}) => theme.colors.blues.main};
  `};

  ${({markerFinal}) => markerFinal && css`
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background: ${({theme}) => theme.colors.greens.main};
  `};

  ${({changeViagens}) => changeViagens && css`
    height: 40px;
    background: ${({theme}) => theme.colors.greens.lighter};
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: 0px 10px;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.grays.lighter};
  `};

  ${({changeData}) => changeData && css`
    height: 40px;
    background: ${({theme}) => theme.colors.blues.lighter};
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: 0px 10px;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.grays.lighter};
  `};
`;

export const Text = styled.Text`
  ${({changeViagens}) => changeViagens && css`
    font-size: 14px;
    color: ${({theme}) => theme.colors.greens.dark};
    font-weight: bold;
    align-self: center;
  `};

  ${({changeData}) => changeData && css`
    font-size: 14px;
    color: ${({theme}) => theme.colors.blues.main};
    font-weight: bold;
    align-self: center;
  `};

  ${({label}) => label && css`
    font-size: 12px;
    color: ${({theme}) => theme.colors.greens.dark};
    font-weight: bold;
    margin-bottom: 8px;
  `};

  ${({address}) => address && css`
    font-size: 12px;
    color: ${({theme}) => theme.colors.grays.main};
    font-weight: normal;
  `};
`;

export const ChangeViagem = styled.TouchableOpacity`
  align-items: center;
`;
