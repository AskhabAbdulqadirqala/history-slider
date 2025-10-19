import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  width: fit-content;

  @media ${({ theme }) => theme.media.desktop} {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -80px;
      width: 5px;
      height: 100%;
      background: linear-gradient(180deg, #3877ee 0%, #ef5da8 100%);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }
`;

interface Props {
  children: ReactNode;
}

export const MainTitle: FC<Props> = (props) => {
  const { children } = props;

  return <Title>{children}</Title>;
};
