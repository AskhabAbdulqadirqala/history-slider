import { FC } from 'react';
import styled from 'styled-components';

import { Directions } from '@/types/directions';
import { ControlButton } from '../ControlButton';

const Panel = styled.div`
  position: absolute;
  bottom: 13.33px;

  display: flex;
  flex-direction: column;
  gap: 6.67px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 8.33px;
`;

interface Props {
  currentSlide: number;
  lastSlide: number;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const getFormattedNumber = (number: number) => {
  return String(number).padStart(2, '0');
};

const SlideNumbering = styled.p`
  text-shadow: 0px 4px 4px #00000040;
`;

export const ControlPanel: FC<Props> = ({
  currentSlide,
  lastSlide,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <Panel>
      <SlideNumbering>
        {getFormattedNumber(currentSlide)}/{getFormattedNumber(lastSlide)}
      </SlideNumbering>
      <Buttons>
        <ControlButton
          direction={Directions.LEFT}
          onClick={onPrevClick}
          isDisabled={currentSlide === 1}
        />
        <ControlButton
          direction={Directions.RIGHT}
          onClick={onNextClick}
          isDisabled={currentSlide === lastSlide}
        />
      </Buttons>
    </Panel>
  );
};
