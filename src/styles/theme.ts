import { DefaultTheme } from 'styled-components';

export const baseTheme: DefaultTheme = {
  colors: {
    primary: '#42567A',
    secondary: '#3877EE',
    tertiary: '#F178B6',
    bg: '#FFFFFF',
  },
  media: {
    tablet: '(min-width: 768px)',
    desktop: '(min-width: 1024px)',
  },
};

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bg: string;
      secondary: string;
      primary: string;
      tertiary: string;
    };
    media: {
      tablet: string;
      desktop: string;
    };
  }
}
