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
  const [circleAnimationAngle, setCircleAnimationAngle] = useState<number | null>(null);

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

  const animateNavCircle = (direction: 'next' | 'prev' | 'to', targetIndex: number): Promise<void> => {
    return new Promise((resolve) => {
      if (
        !navCircleRef.current ||
        !navCircleRef.current.getBoundingClientRect().width
      ) {
        resolve();

        return;
      }
      let rotation = 0;

      if (direction === 'next') {
        rotation = -60; // Вращение по часовой стрелке
      } else if (direction === 'prev') {
        rotation = 60; // Вращение против часовой стрелки
      } else if (direction === 'to' && targetIndex !== undefined) {
        // Вычисляем угол вращения на основе разницы индексов
        const anglePerSlide = 360 / 6; // 6 точек = 60° каждая
        const diff = targetIndex - currentSlideIndex;
        // Корректируем для кратчайшего пути
        const shortestDiff = diff > 3 ? diff - 6 : diff < -3 ? diff + 6 : diff;
        rotation = -shortestDiff * anglePerSlide;
      }

      navDotRefs.current[targetIndex]?.setAttribute('data-is-animating', 'true');
      navDotRefs.current[currentSlideIndex]?.setAttribute('data-is-animating', 'true');

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
              navDotRefs.current[targetIndex]?.removeAttribute('data-is-animating');
              navDotRefs.current[currentSlideIndex]?.removeAttribute('data-is-animating');
              resolve();
            },
          });
        },
      });
    });
  };

  const animateChange = async (
    slideAction: () => void,
    direction: 'next' | 'prev' | 'to' = 'next',
    targetIndex: number,
  ) => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);

    try {
      await Promise.all([
        hideSwiper(),
        animateNavCircle(direction, targetIndex),
      ]);
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
      }, 'next', currentSlideIndex + 1);
    }
  };

  const goToPrevSlide = () => {
    if (mainSwiperRef.current && !mainSwiperRef.current.isBeginning) {
      animateChange(() => {
        mainSwiperRef.current?.slidePrev();
      }, 'prev', currentSlideIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    if (mainSwiperRef.current && index !== currentSlideIndex) {
      animateChange(() => {
        mainSwiperRef.current?.slideTo(index);
      }, 'to', index);
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
    circleAnimationAngle,
    innerSwiperRef,
    mainSwiperRef,
    navCircleRef,
    navDotRefs,
  };
};
