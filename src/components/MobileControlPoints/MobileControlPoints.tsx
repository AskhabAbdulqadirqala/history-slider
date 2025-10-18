import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  bottom: 32px;

  display: flex;
  justify-self: center;
  transform: translateX(-10px);
  gap: 10px;

  @media ${({ theme }) => theme.media.desktop} {
    display: none;
  }
`;

const ControlPoint = styled.button`
  width: 6px;
  height: 6px;

  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
`;

interface Props {
  controls: number[];
  activeControl: number;
  onControlClick: (control: number) => void;
}

export const MobileControlPoints: FC<Props> = ({
  controls,
  activeControl,
  onControlClick,
}) => {
  return (
    <Wrapper>
      {controls.map((control) => (
        <ControlPoint
          key={control}
          onClick={() => onControlClick(control)}
          style={{
            opacity: control === activeControl ? 1 : 0.4,
          }}
        />
      ))}
    </Wrapper>
  );
};
