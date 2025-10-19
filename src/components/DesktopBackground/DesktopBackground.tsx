import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Background = styled.div`
  display: none;

  @media ${({ theme }) => theme.media.desktop} {
    position: absolute;
    top: 0;
    left: -80px;

    display: block;
    width: calc(100% + 80px);
    height: 100%;

    border: 1px solid rgba(66, 86, 122, 0.2);
  }
`;

const Line = styled.div`
  position: absolute;
  z-index: 0;

  background: ${({ theme }) => theme.colors.primary};
  opacity: 0.2;
`;

const VerticalLine = styled(Line)`
  top: 0;
  left: 50%;

  width: 1px;
  height: 100%;
`;

const HorizontalLine = styled(Line)`
  top: 480px;
  left: 0;

  width: 100%;
  height: 1px;
`;

interface Props {
  children: ReactNode;
}

export const DesktopBackground: FC<Props> = ({ children }) => {
  return (
    <Background>
      <VerticalLine />
      <HorizontalLine />
      {children}
    </Background>
  );
};
