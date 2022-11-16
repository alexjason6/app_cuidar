import styled, {css} from "styled-components/native";

export const View = styled.View`
  padding: 10px;
`;

export const Text = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.colors.grays.main};
  text-align: justify;
  padding: 10px;
  margin-bottom: 10px;

  ${({title}) => title && css`
    font-weight: bold;
    text-transform: uppercase;
    padding: 0px;
    margin-bottom: 0px;
  `}
`;

export const Image = styled.Image`
  width: 90%;
  align-self: center;
`;
