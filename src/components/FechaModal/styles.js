import styled, { css } from "styled-components/native";

export const Container = styled.View`
  margin-top: 10px;
  flex-direction: row-reverse;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  background: ${({theme}) => theme.colors.danger.light};
  border-radius: 25px;
`;

export const Image = styled.Image`
  width: 20px;
  height: 20px;
`;
