import styled, {css} from "styled-components/native";


export const Container = styled.SafeAreaView`
  background: ${({theme}) => theme.colors.grays.lighter};
`;

export const Content = styled.ScrollView`
  height: 100%;
  background: transparent;
`;

export const View = styled.View`
    justify-content: center;
    align-items: center;
    flex-direction: row;

   ${({Buttons}) => Buttons && css`
    justify-content: space-evenly;
  `};

  ${({changeDevice}) => changeDevice && css`
    width: 96%;
    height: 40px;
    background: transparent;
    margin-top: auto;
    margin-bottom: auto;
    justify-content: space-between;
    align-self: center;
  `};
`;

export const Text = styled.Text`
  ${({mapa}) => mapa && css`
    font-size: 14px;
    text-align: center;
    color: ${({theme}) => theme.colors.white};
    font-weight: bold;
  `};
`;

export const ChangeDevice = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background: ${({theme}) => theme.colors.white};
  border-radius: 25px;
  align-items: center;
  justify-content: center;

  ${({plus}) => plus && css`
    margin-left: auto;
  `};

  ${({minus}) => minus && css`
    margin-right: auto;
  `};
`;
