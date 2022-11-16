import React from "react";
import { Image } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import { Container, Text, Interna, Button } from "./styles";

export default function Card({description, icon, iconColor, admin, destaque, rastreamento, navigateTo, image}) {
  const navigation = useNavigation();
  
  return (
    <Container admin={admin} destaque={destaque} rastreamento={rastreamento}>
      <Interna>
        <Button onPress={() => navigation.navigate(navigateTo)}>
          {image ? 
            <Image source={image} style={{ marginLeft: 40, width: 45, height: 45}} /> : 
            <Icon
              name={icon}
              size={40}
              color={iconColor}
              style={{ marginLeft: 40, width: 50, height: 50}}
            />
          }
          <Text admin={admin} destaque={destaque} rastreamento={rastreamento}>
            {description}
          </Text>
        </Button>
        <Button arrow={admin || destaque || rastreamento} arrowOrange={!admin && !destaque && !rastreamento} onPress={() => navigation.navigate(navigateTo)}>
          <Icon
            name={'chevron-right'}
            color={admin || rastreamento || destaque ? '#fff' : '#ff9800'}
            size={20}
          />
        </Button>
      </Interna>
    </Container>
  )
}