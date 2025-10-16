import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  color: red;
  text-align: center;
  margin-top: 50px;
`;

const App: React.FC = () => {
  return <Title>Hello world</Title>;
};

export default App;
