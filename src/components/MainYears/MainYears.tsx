import styled from 'styled-components';
import CountUp from 'react-countup';
import _ from 'lodash';
import { FC } from 'react';

const MainYearsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 56px;
  padding-right: 29px;
  font-size: 17.5vw;
  transition: font-size 0.1s ease-in-out;
  font-weight: bold;
  line-height: normal;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.secondary};

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 13vw;
  }

  & > :last-child {
    color: ${({ theme }) => theme.colors.tertiary};
  }
`;

type Years = {
  prev: number | null;
  new: number;
};

interface Props {
  startYears: Years;
  endYears: Years;
}

export const MainYears: FC<Props> = ({ startYears, endYears }) => {
  return (
    <MainYearsContainer>
      <>
        {_.map([startYears, endYears], ({ prev: prevYear, new: newYear }) =>
          _.isNumber(prevYear) ? (
            <CountUp separator='' start={prevYear} end={newYear} duration={1} />
          ) : (
            <span>{newYear}</span>
          ),
        )}
      </>
    </MainYearsContainer>
  );
};
