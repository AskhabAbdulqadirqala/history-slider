import { FC } from 'react';
import styled from 'styled-components';

const Background = styled.div`
  display: none;

  @media ${({ theme }) => theme.media.desktop} {
    position: absolute;
    top: 0;
    left: -80px;
    z-index: 0;

    display: block;
    width: calc(100% + 80px);
    height: 100%;

    border: 1px solid rgba(66, 86, 122, 0.2);
  }
`;

const Line = styled.div`
  position: absolute;

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

const Circle = styled.div`
  position: absolute;
  top: 215px;
  left: calc(50% - 268px);

  width: 536px;
  height: 530px;

  border-radius: 50%;
  border: 1px solid rgba(66, 86, 122, 0.2);
`;

export const DesktopBackground: FC = () => {
  return (
    <Background>
      <VerticalLine />
      <HorizontalLine />
      <Circle />
    </Background>
  );
};
