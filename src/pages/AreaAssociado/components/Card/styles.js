import styled, {css} from "styled-components/native";

export const Container = styled.View`
  background: ${({theme}) => theme.colors.white};
  padding: 20px 20px 10px 20px;
  border-radius: 4px;
  margin: 5px 10px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.oranges.main};
  font-size: 22px;
  text-align: left;
  margin-top: 5px;
  font-weight: bold;
`;