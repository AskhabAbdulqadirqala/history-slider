import _ from 'lodash';
import { FC } from 'react';
import styled from 'styled-components';

import { config } from '@/config/config';

const Circle = styled.div`
  position: absolute;
  top: 215px;
  left: calc(50% - 268px);
  z-index: 2;

  width: 536px;
  height: 530px;

  border-radius: 50%;
  border: 1px solid rgba(66, 86, 122, 0.2);
`;

const ActiveTitle = styled.h2<{ shouldDisappear: boolean }>`
  position: absolute;
  top: 24px;
  left: 448px;
  opacity: 1;
  white-space: nowrap;
  transition: opacity 0.4s ease-in-out;

  ${({ shouldDisappear }) => shouldDisappear && 'opacity: 0;'}
`;

const Dot = styled.button<{
  angle: number;
  dotIndex: number;
  isActive: boolean;
  circleAnimationAngle: number | null;
}>`
  top: 50%;
  left: 50%;
  position: absolute;
  width: 268px;
  height: 0;
  background-color: red;
  border-radius: 50%;
  transform-origin: left center;
  transform: rotate(${({ angle }) => angle}deg);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 0;
    right: 0;
    transform: rotate(${({ angle }) => -angle}deg);
    padding: 3px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    transition: background 0.4s ease-in-out
      ${({ isActive }) => `${!isActive ? ', transform 0.8s ease-in-out' : ''}`};
  }

  &:hover,
  &[data-is-animating]${({ isActive }) => `${isActive ? ', &' : ''}`} {
    &::after {
      content: '${({ dotIndex }) => `${dotIndex + 1}`}';
      top: -24px;
      right: -24px;
      width: 56px;
      height: 56px;
      background: ${({ theme }) => theme.colors.bg};
      border: 2px solid ${({ theme }) => theme.colors.primary};
      place-content: center;
    }
  }

  ${({ isActive, circleAnimationAngle, angle }) =>
    !isActive &&
    `
      &[data-is-animating]::after {
        transform: rotate(${-angle - (circleAnimationAngle || 0)}deg);
      }
  `}

  ${({ isActive }) =>
    isActive &&
    `
      &[data-is-animating]::after {
        width: 0;
        height: 0;
        padding: 0;
        top: 0;
        right: 0;
        font-size: 0;
        transition: all 0.8s ease-in-out;
      }
  `}
`;

interface Props {
  onDotClick: (index: number) => void;
  currentSlideIndex: number;
  ref: React.RefObject<HTMLDivElement | null>;
  navDotRefs: React.RefObject<Array<HTMLButtonElement | null>>;
  circleAnimationAngle: number | null;
}

export const NavCircle: FC<Props> = ({
  onDotClick,
  currentSlideIndex,
  ref,
  navDotRefs,
  circleAnimationAngle,
}) => {
  const dotsCount = config.length;
  const dotsRange = _.range(dotsCount);
  const dotsArray = dotsRange
    .slice(currentSlideIndex)
    .concat(dotsRange.slice(0, currentSlideIndex));
  const startAngle = 300;

  const dotAngles = _.map(dotsArray, (_, index) => {
    return {
      dot: dotsArray[index],
      angle: startAngle + (360 / dotsCount) * index,
    };
  });

  return (
    <Circle ref={ref}>
      {dotAngles.map(({ angle, dot }) => (
        <Dot
          key={dot}
          angle={angle}
          dotIndex={dot}
          isActive={dot === currentSlideIndex}
          onClick={() => onDotClick(dot)}
          circleAnimationAngle={circleAnimationAngle}
          ref={(el) => {
            navDotRefs.current[dot] = el;
          }}
        />
      ))}
      <ActiveTitle shouldDisappear={!_.isNull(circleAnimationAngle)}>
        {config[currentSlideIndex].title}
      </ActiveTitle>
    </Circle>
  );
};
