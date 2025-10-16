import React from 'react';
import styled from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';

const Title = styled.h1`
  text-align: center;
  margin-top: 50px;
`;

const App: React.FC = () => {
  return (<>
    <GlobalStyles />
    <Title>Hello world</Title>
  </>);
};

export default App;
