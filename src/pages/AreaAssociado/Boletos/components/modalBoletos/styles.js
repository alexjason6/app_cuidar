import styled from 'styled-components/native';

export const Container = styled.Modal`
  width: 100%;
  height: 100%;
  background: ${({theme}) => theme.colors.white};
`;

export const Content = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
