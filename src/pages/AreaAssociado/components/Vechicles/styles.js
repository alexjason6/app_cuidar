import styled, {css} from "styled-components/native";

export const Container = styled.View`
  background: ${({theme}) => theme.colors.white};
  padding-bottom: 10px;
  border-radius: 4px;
  margin: 5px 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.grays.lighter};
`;