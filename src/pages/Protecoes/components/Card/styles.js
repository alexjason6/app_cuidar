import styled, {css} from "styled-components/native";

export const Container = styled.View`
  background: ${({theme}) => theme.colors.white};
  padding: 30px 20px;
  border-radius: 4px;
  margin: 5px 10px;
`;

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.grays.main};

  ${({title}) => title && css`
    width: 70%;
    font-size: 22px;
    font-weight: bold;
    text-align: left;
    margin-top: 15px;
  `};

  ${({description}) => description && css`
    font-size: 14px;
    text-align: left;
    margin-top: 15px;
  `};
`;

export const CardHeader = styled.View`
  width: 100%;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const Image = styled.Image`
  width: 90px;
  height: 90px;
`;