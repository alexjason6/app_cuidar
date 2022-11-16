import styled,  {css} from 'styled-components/native';

export const Container = styled.Modal`
  width: 100%;
  height: 100%;
`;

export const View = styled.View`
  width: 90%;
  background: ${({theme}) => theme.colors.white};

  ${({topButtons}) => topButtons && css`
    width: 100%;
    height: 40px;
    background: transparent;
    justify-content: space-between;
    flex-direction: row;
  `};

  ${({changeDevice}) => changeDevice && css`
    height: 40px;
    background: transparent;
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
`;


export const Text = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.colors.grays.main};
`;
