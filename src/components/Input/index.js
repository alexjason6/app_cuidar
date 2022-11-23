import styled, {css} from "styled-components/native";
import { Platform } from "react-native";

export const Input = styled.TextInput`
  width: 80%;
  height: 50px;
  margin: 5px 0px;
  border-radius: 4px;
  background: ${({theme}) => theme.colors.white};
  justify-content: center;
  text-align: center;
  align-self: center;

  ${({indicacao}) => indicacao && css`
    color: ${({theme}) => theme.colors.grays.main};
  `};

  ${({textArea}) => textArea && css`
    height: 200px;
    padding: 15px;
    text-align: left;
  `};

  ${({dados}) => dados && css`
    width: 100%;
    padding: ${Platform.OS === 'ios' ? '20px 15px' : '0px 15px'};
    color: ${({theme}) => theme.colors.grays.main};
    font-weight: bold;
    text-align: left;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.grays.lighter};
  `};

  ${({editable}) => editable && css`
    color: ${({theme}) => theme.colors.blues.dark};
    background: ${({theme}) => theme.colors.alert.lighter};
    border-bottom-color: ${({theme}) => theme.colors.greens.main};
  `};
`;
