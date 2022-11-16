import styled, {css} from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.Modal`
  width: 100%;
  height: 100%;
`;

export const View = styled.View`
  height: 100%;
  background: ${({theme}) => theme.colors.grays.lighter};
`;

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-size: 18px;
  font-weight: bold;

  ${({modalText}) => modalText && css`
    margin: 30px 40px;
    font-size: 40px;
    font-Weight: ${Platform.OS === 'ios' ? '200' : 'normal'};
    font-family: ${Platform.OS === 'ios' ? 'System' : 'Roboto-Light'};
    color: ${({theme}) => theme.colors.grays.main};

  `}
`;

