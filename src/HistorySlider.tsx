import React, { useRef, useState } from 'react';
import { useKey } from 'react-use';
import _ from 'lodash';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Swiper as SwiperType } from 'swiper';
import { Container } from '@components/Container';
import { MainYears } from '@components/MainYears/MainYears';
import { MobileControlPoints } from '@components/MobileControlPoints';
import { ControlPanel } from '@components/ControlPanel';
import { InnerSwiper } from '@components/InnerSlider';

import { config } from '@/config/config';

const Title = styled.h1`
  width: fit-content;
`;

export const HistorySlider: React.FC = () => {
  const swiperRef = useRef<SwiperType>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const goToPrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.activeIndex;

    setCurrentSlideIndex(newIndex);
  };

  useKey('ArrowRight', goToNextSlide);
  useKey('ArrowLeft', goToPrevSlide);

  return (
    <Container>
      <Title>
        Исторические
        <br />
        даты
      </Title>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        allowTouchMove={false}
        speed={0}
      >
        {config.map(({ slides }, index) => {
          const prevIndex = swiperRef.current?.previousIndex;
          const prevSlides =
            (_.isNumber(prevIndex) && config[prevIndex]?.slides) || null;

          return (
            <SwiperSlide key={index}>
              <MainYears
                startYears={{
                  prev: _.first(prevSlides)?.year || null,
                  new: slides[0].year,
                }}
                endYears={{
                  prev: _.last(prevSlides)?.year || null,
                  new: slides[slides.length - 1].year,
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <InnerSwiper {...config[currentSlideIndex]} />

      <ControlPanel
        currentSlide={currentSlideIndex + 1}
        lastSlide={config.length}
        onPrevClick={goToPrevSlide}
        onNextClick={goToNextSlide}
      />
      <MobileControlPoints
        controls={_.range(config.length)}
        activeControl={currentSlideIndex}
        onControlClick={goToSlide}
      />
    </Container>
  );
};
