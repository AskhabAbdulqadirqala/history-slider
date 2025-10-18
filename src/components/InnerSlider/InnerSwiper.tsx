import { FC } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Slide } from '@/types/slide';

const Wrapper = styled.div`
  position: absolute;
  bottom: 141px;
`;

const SlideCard = styled.div`
`;

const Year = styled.div`
`;

const SlideDescription = styled.p`
`;

const SliderContainer = styled.div`
  max-width: 100%;
  margin-top: 30px;

  .swiper {
    padding: 20px 0;
  }

  .swiper-slide {
    display: flex;
  }

  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }

  @media (min-width: 1024px) {
    .swiper-slide {
      width: 300px;
    }

    .swiper-button-prev,
    .swiper-button-next {
      &:not(.swiper-button-disabled) {
        display: flex;
      }
    }
  }
`;

const Title = styled.h2`
  font-weight: bold;
`;

export const InnerSwiper: FC<Slide> = ({ title, slides }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <SliderContainer>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          navigation
          slidesPerView={2}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.year}>
              <SlideCard>
                <Year>{slide.year}</Year>
                <SlideDescription>{slide.description}</SlideDescription>
              </SlideCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderContainer>
    </Wrapper>
  );
};
