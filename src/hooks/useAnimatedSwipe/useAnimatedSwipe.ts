import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { Swiper as SwiperType } from 'swiper';

import { SlideMovement } from '@/types/slide';
import { config } from '@/config/config';

interface Props {
  currentSlideIndex: number;
  setNavCircleActiveIndex: (slideIndex: number) => void;
}

/**
 * Хук для анимированных свайпов глобального и внутреннего слайдеров.
 */
export const useAnimatedSwipe = ({
  currentSlideIndex,
  setNavCircleActiveIndex,
}: Props) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [circleAnimationAngle, setCircleAnimationAngle] = useState<
    number | null
  >(null);

  const mainSwiperRef = useRef<SwiperType>(null);
  const innerSwiperRef = useRef<HTMLDivElement>(null);
  const navCircleRef = useRef<HTMLDivElement>(null);
  const navDotRefs = useRef<Array<HTMLButtonElement | null>>([]);

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

  const animateNavCircle = (
    direction: SlideMovement,
    targetIndex: number,
  ): Promise<void> => {
    return new Promise((resolve) => {
      if (
        !navCircleRef.current ||
        !navCircleRef.current.getBoundingClientRect().width
      ) {
        resolve();

        return;
      }
      let rotation = 0;
      const slidesLength = config.length;
      const anglePerSlide = 360 / slidesLength;

      if (direction === SlideMovement.NEXT) {
        rotation = -anglePerSlide; // Вращение по часовой стрелке
      } else if (direction === SlideMovement.PREV) {
        rotation = anglePerSlide; // Вращение против часовой стрелки
      } else if (direction === SlideMovement.TO) {
        const diff = targetIndex - currentSlideIndex;
        const halfWay = slidesLength / 2;

        // Корректируем для кратчайшего пути
        const shortestDiff =
          diff > halfWay
            ? diff - slidesLength
            : diff < -halfWay
              ? diff + slidesLength
              : diff;
        rotation = -shortestDiff * anglePerSlide;
      }

      navDotRefs.current[targetIndex]?.setAttribute(
        'data-is-animating',
        'true',
      );
      navDotRefs.current[currentSlideIndex]?.setAttribute(
        'data-is-animating',
        'true',
      );

      setCircleAnimationAngle(rotation);

      gsap.to(navCircleRef.current, {
        rotation: `+=${rotation}`,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(navCircleRef.current, {
            rotation: `-=${rotation}`,
            duration: 0,
            onComplete: () => {
              setCircleAnimationAngle(null);
              navDotRefs.current[targetIndex]?.removeAttribute(
                'data-is-animating',
              );
              navDotRefs.current[currentSlideIndex]?.removeAttribute(
                'data-is-animating',
              );
              setNavCircleActiveIndex(targetIndex);
              resolve();
            },
          });
        },
      });
    });
  };

  const animateChange = async (
    slideAction: () => void,
    direction: SlideMovement,
    targetIndex: number,
  ) => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);

    try {
      await hideSwiper();
      await Promise.all([
        animateNavCircle(direction, targetIndex),
        slideAction(),
      ]);
      await showSwiper();
    } finally {
      setIsAnimating(false);
    }
  };

  const goToNextSlide = () => {
    if (mainSwiperRef.current && !mainSwiperRef.current.isEnd) {
      animateChange(
        () => mainSwiperRef.current?.slideNext(),
        SlideMovement.NEXT,
        currentSlideIndex + 1,
      );
    }
  };

  const goToPrevSlide = () => {
    if (mainSwiperRef.current && !mainSwiperRef.current.isBeginning) {
      animateChange(
        () => mainSwiperRef.current?.slidePrev(),
        SlideMovement.PREV,
        currentSlideIndex - 1,
      );
    }
  };

  const goToSlide = (index: number) => {
    if (mainSwiperRef.current && index !== currentSlideIndex) {
      animateChange(
        () => {
          mainSwiperRef.current?.slideTo(index);
        },
        SlideMovement.TO,
        index,
      );
    }
  };

  useEffect(() => {
    showSwiper();
  }, []);

  return {
    goToSlide,
    goToNextSlide,
    goToPrevSlide,
    circleAnimationAngle,
    innerSwiperRef,
    mainSwiperRef,
    navCircleRef,
    navDotRefs,
  };
};
