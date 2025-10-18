import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import _ from 'lodash';
import type { Swiper as SwiperType } from 'swiper';

import { MainYears } from '@components/MainYears';

import { config } from '@/config/config';

interface Props {
  mainSwiperRef: React.RefObject<SwiperType | null>;
  onSlideChange: (swiper: SwiperType) => void;
}

export const MainSwiper: FC<Props> = (props) => {
  const { mainSwiperRef, onSlideChange } = props;

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      onSwiper={(swiper) => {
        mainSwiperRef.current = swiper;
      }}
      onSlideChange={onSlideChange}
      allowTouchMove={false}
      speed={0}
    >
      {config.map(({ slides }, index) => {
        const prevIndex = mainSwiperRef.current?.previousIndex;
        const prevSlides =
          (_.isNumber(prevIndex) && config[prevIndex]?.slides) || null;

        return (
          <SwiperSlide key={index}>
            <MainYears
              startYears={{
                prev: _.first(prevSlides)?.year || null,
                new: _.first(slides)!.year,
              }}
              endYears={{
                prev: _.last(prevSlides)?.year || null,
                new: _.last(slides)!.year,
              }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
