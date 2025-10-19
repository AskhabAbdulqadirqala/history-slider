import React, { useState } from 'react';
import { useKey } from 'react-use';
import _ from 'lodash';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Swiper as SwiperType } from 'swiper';

import { Container } from '@components/Container';
import { DesktopBackground } from '@components/DesktopBackground';
import { MainTitle } from '@components/MainTitle';
import { MainSwiper } from '@components/MainSwiper';
import { InnerSwiper } from '@components/InnerSlider';
import { MobileControlPoints } from '@components/MobileControlPoints';
import { ControlPanel } from '@components/ControlPanel';

import { useAnimatedSwipe } from '@hooks/useAnimatedSwipe';

import { config } from '@/config/config';

export const HistorySlider: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const {
    mainSwiperRef,
    innerSwiperRef,
    navCircleRef,
    navDotRefs,
    goToSlide,
    goToNextSlide,
    goToPrevSlide,
    circleAnimationAngle,
  } = useAnimatedSwipe({
    currentSlideIndex,
  });

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlideIndex(swiper.activeIndex);
  };

  useKey('ArrowRight', goToNextSlide);
  useKey('ArrowLeft', goToPrevSlide);

  return (
    <Container>
      <DesktopBackground
        onDotClick={goToSlide}
        currentSlideIndex={currentSlideIndex}
        navCircleRef={navCircleRef}
        navDotRefs={navDotRefs}
        circleAnimationAngle={circleAnimationAngle}
      />
      <MainTitle>
        Исторические
        <br />
        даты
      </MainTitle>
      <MainSwiper
        mainSwiperRef={mainSwiperRef}
        onSlideChange={handleSlideChange}
      />
      <InnerSwiper {...config[currentSlideIndex]} ref={innerSwiperRef} />

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
