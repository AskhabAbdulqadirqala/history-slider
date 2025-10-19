import { FC } from 'react';
import styled from 'styled-components';

import ButtonImg from './button.svg';
import { Directions } from '@/types/directions';

interface RotatedButtonProps {
  direction: Directions;
  isDisabled: boolean;
}

interface ControlButtonProps extends RotatedButtonProps {
  onClick: () => void;
}

const Button = styled.button`
  transition: transform 0.1s ease-in-out;

  &:hover {
    background-color: #ebebebff;
    border-radius: 50%;
  }

  &:active {
    transform: translateY(1.5px);
  }
`;

const RotatedButtonImg = styled(ButtonImg)<{
  direction?: Directions;
  isDisabled: boolean;
}>`
  width: 25px;
  height: 25px;

  transform: ${({ direction }) =>
    `rotate(${direction === Directions.RIGHT ? 180 : 0}deg)`};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};

  @media ${({ theme }) => theme.media.desktop} {
    width: 50px;
    height: 50px;
  }
`;

export const ControlButton: FC<ControlButtonProps> = (props) => {
  const { direction, isDisabled, onClick } = props;

  return (
    <Button onClick={onClick}>
      <RotatedButtonImg direction={direction} isDisabled={isDisabled} />
    </Button>
  );
};
