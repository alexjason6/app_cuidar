import styled, {css} from "styled-components/native";

export const Container = styled.SafeAreaView`
  background: ${({theme}) => theme.colors.grays.lighter};
`;

export const Content = styled.ScrollView`
  width: 100%;
  height: 100%;
  background: transparent;
`;

export const RegulamentosView = styled.View`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Regulamento = styled.TouchableOpacity`
  width: 45%;
  height: 180px;
  padding: 10px;
  margin: 8px 8px;
  background: ${({theme}) => theme.colors.white};
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  align-self: center;
`;

export const Text = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.colors.grays.main};
  text-align: center;

  ${({titleIcon}) => titleIcon && css`
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
    color: ${({theme}) => theme.colors.grays.light};
  `};

  ${({title}) => title && css`
    font-size: 14px;
    font-weight: bold;
  `};
`;
