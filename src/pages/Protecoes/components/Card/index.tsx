import React from "react";

import { Container, Text, CardHeader, Image } from "./styles";

export default function Card({image, title, description}) {

  return (
    <Container>
      <CardHeader>
        <Text title>
          {title}
        </Text>
        <Image source={image} />
      </CardHeader>
      <Text description>
        {description}
      </Text>
    </Container>
  );
}