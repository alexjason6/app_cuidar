import styled, {css} from "styled-components/native";

export const Container = styled.SafeAreaView`
  background: ${({theme}) => theme.colors.grays.lighter};
`;

export const Content = styled.ScrollView`
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
  width: 180px;
  height: 180px;
  padding: 10px;
  margin: 10px 13px;
  background: ${({theme}) => theme.colors.white};
  align-items: center;
  justify-content: center;
  border-radius: 4px;
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
