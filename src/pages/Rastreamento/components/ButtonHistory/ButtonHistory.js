import styled from "styled-components/native";

export const ButtonHistory = styled.TouchableOpacity`
  margin-top: 10px;
  margin-left: 10px;
  width: 40px;
  height: 40px;
  background: ${({theme}) => theme.colors.blues.main};
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;
