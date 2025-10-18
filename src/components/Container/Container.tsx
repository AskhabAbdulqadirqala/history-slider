import React, { FC } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from '@styles/GlobalStyles';
import { baseTheme } from '@styles/theme';

const Wrapper = styled.div`
  position: relative;

  height: 568px;
  padding-top: 59px;
  margin-left: 20px;

  font-family: 'PT Sans';
  font-size: 14px;
  transition: font-size 0.1s ease-in-out;
  line-height: 145%;

  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.primary};

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 20px;
  }

  h1 {
    font-size: clamp(20px, 5vw, 56px);
    line-height: 120%;
  }

  h2 {
    font-size: 16px;

    @media ${({ theme }) => theme.media.desktop} {
      font-size: 20px;
    }
  }

  h3 {
    font-size: 16px;

    @media ${({ theme }) => theme.media.desktop} {
      font-size: 25px;
    }
  }
`;

interface Props {
  children: React.ReactNode;
}

export const Container: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={baseTheme}>
      <Wrapper>
        <GlobalStyles />
        {children}
      </Wrapper>
    </ThemeProvider>
  );
};
