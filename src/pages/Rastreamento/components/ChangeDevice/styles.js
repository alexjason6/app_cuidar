import styled, {css} from "styled-components/native";

export const Container = styled.View`
  width: 50px;
  height: 50px;
  flex-direction: row;
`;

export const View = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  background: ${({theme}) => theme.colors.oranges.main};
`;
