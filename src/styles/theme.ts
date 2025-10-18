import { DefaultTheme } from 'styled-components';

export const baseTheme: DefaultTheme = {
  colors: {
    primary: '#42567A',
    secondary: '#3877EE',
    tertiary: '#F178B6',
    bg: '#FFFFFF',
  },
  media: {
    largeMobile: '(min-width: 500px)',
    tablet: '(min-width: 768px)',
    largeTablet: '(min-width: 900px)',
    desktop: '(min-width: 1024px)',
    largeDesktop: '(min-width: 1440px)',
    hugeDesktop: '(min-width: 1920px)',
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
      largeMobile: string;
      tablet: string;
      largeTablet: string;
      desktop: string;
      largeDesktop: string;
      hugeDesktop: string;
    };
  }
}
