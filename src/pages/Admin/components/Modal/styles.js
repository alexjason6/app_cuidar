import styled, {css} from 'styled-components/native';

export const Container = styled.Modal`
  width: 100%;
`;

export const View = styled.View`

  ${({header}) => header && css`
    padding-bottom: 10px;
    background: ${({theme}) => theme.colors.oranges.main};
  `};
`

export const Text = styled.Text`
  text-align: center;
  color: ${({theme}) => theme.colors.white};
  font-weight: bold;
`;
