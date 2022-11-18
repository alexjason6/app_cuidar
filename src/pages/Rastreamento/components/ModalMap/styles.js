import styled,  {css} from 'styled-components/native';

export const Container = styled.Modal`
  width: 100%;
  height: 100%;
`;

export const View = styled.View`
  width: 100%;
  background: ${({theme}) => theme.colors.white};

  ${({topButtons}) => topButtons && css`
    height: 40px;
    position: absolute;
    background: transparent;
    justify-content: space-between;
    flex-direction: row;
    z-index: 9999;
  `};

  ${({changeDevice}) => changeDevice && css`
    height: 40px;
    background: ${({theme}) => theme.colors.greens.lighter};
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    padding: 0px 10px;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.grays.lighter};
  `};

  ${({infos}) => infos && css`
    background: transparent;
   `};

  ${({marker}) => marker && css`
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    background: ${({theme}) => theme.colors.grays.main};
  `};

  ${({ligado}) => ligado && css`
    background: ${({theme}) => theme.colors.blues.main};
  `};
`;

export const Text = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.colors.greens.dark};
  font-weight: bold;
  align-self: center;
`;


export const ChangeDevice = styled.TouchableOpacity`
  align-items: center;

  ${({plus}) => plus && css`
    margin-left: auto;
  `};

  ${({minus}) => minus && css`
    margin-right: auto;
  `};
`;
