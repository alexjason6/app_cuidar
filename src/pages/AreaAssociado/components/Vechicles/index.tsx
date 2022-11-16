import React from "react";

import { Container } from "./styles";

export default function Vehicles({children}) {

  return (
    <Container>
      {children}
    </Container>
  );
}