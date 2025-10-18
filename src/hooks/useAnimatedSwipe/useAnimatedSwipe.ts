import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { Swiper as SwiperType } from 'swiper';

interface Props {
  currentSlideIndex: number;
}

/**
 * Хук для анимированных свайпов глобального и внутреннего слайдеров.
 */
export const useAnimatedSwipe = ({ currentSlideIndex }: Props) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const mainSwiperRef = useRef<SwiperType>(null);
  const innerSwiperRef = useRef<HTMLDivElement>(null);

  const hideSwiper = (): Promise<void> => {
    return new Promise((resolve) => {
      if (!innerSwiperRef.current) {
        resolve();

        return;
      }

      gsap.to(innerSwiperRef.current, {
        opacity: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: resolve,
      });
    });
  };

  const showSwiper = (): Promise<void> => {
    return new Promise((resolve) => {
      if (!innerSwiperRef.current) {
        resolve();

        return;
      }

      gsap.fromTo(
        innerSwiperRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.1,
          onComplete: resolve,
        },
      );
    });
  };

  const animateChange = async (slideAction: () => void) => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);

    try {
      await hideSwiper();
      slideAction();
      await showSwiper();
    } finally {
      setIsAnimating(false);
    }
  };

  const goToNextSlide = () => {
    if (mainSwiperRef.current && !mainSwiperRef.current.isEnd) {
      animateChange(() => {
        mainSwiperRef.current?.slideNext();
      });
    }
  };

  const goToPrevSlide = () => {
    if (mainSwiperRef.current && !mainSwiperRef.current.isBeginning) {
      animateChange(() => {
        mainSwiperRef.current?.slidePrev();
      });
    }
  };

  const goToSlide = (index: number) => {
    if (mainSwiperRef.current && index !== currentSlideIndex) {
      animateChange(() => {
        mainSwiperRef.current?.slideTo(index);
      });
    }
  };

  useEffect(() => {
    if (innerSwiperRef.current) {
      showSwiper();
    }
  }, []);

  return {
    goToSlide,
    goToNextSlide,
    goToPrevSlide,
    isAnimating,
    innerSwiperRef,
    mainSwiperRef,
  };
};
