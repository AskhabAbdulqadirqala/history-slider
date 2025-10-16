import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  body {
    font-family: "PT Sans";
    background-color: #FFFFFF;
    color: #42567A;
    line-height: 145%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, ol {
    list-style: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    background: none;
    border: none;
  }

  input, textarea, button, select {
    font: inherit;
    color: inherit;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
`;
