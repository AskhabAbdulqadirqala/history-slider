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
  bottom: 121px;

  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;

  @media ${({ theme }) => theme.media.desktop} {
    bottom: 60px;
  }

  @media ${({ theme }) => theme.media.largeDesktop} {
    bottom: 77px;
  }
`;

const SlideCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Year = styled.h3`
  font-family: Bebas Neue;
  line-height: 120%;
  color: ${({ theme }) => theme.colors.secondary};
`;

const SlideDescription = styled.p`
  max-height: 90px;
  overflow: auto;
  text-shadow: 0px 4px 4px #00000040;

  @media ${({ theme }) => theme.media.desktop} {
    max-height: 150px;

    text-shadow: unset;
  }
`;

const SliderContainer = styled.div`
  max-width: 100%;

  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }

  @media ${({ theme }) => theme.media.desktop} {
    max-width: 82%;

    .swiper {
      position: unset;
    }

    .swiper-slide {
      width: 300px;
    }

    .swiper-button-prev,
    .swiper-button-next {
      display: block;
      width: 40px;
      height: 40px;
      justify-items: center;
      place-content: center;

      background: #ffffff;
      box-shadow: 0px 0px 15px rgba(56, 119, 238, 0.1);
      border-radius: 50%;
      stroke: ${({ theme }) => theme.colors.secondary};
      stroke-width: 2px;

      svg {
        width: 5px;
        height: 10px;
      }
    }

    .swiper-button-next {
      right: 40px;
    }

    .swiper-button-prev {
      left: -60px;
    }
  }
`;

const Title = styled.h2`
  padding-bottom: 10px;

  font-weight: bold;
  border-bottom: 1px solid #c7cdd9;

  @media ${({ theme }) => theme.media.desktop} {
    display: none;
  }
`;

interface Props extends Slide {
  ref: React.RefObject<HTMLDivElement | null>;
}

export const InnerSwiper: FC<Props> = ({ title, slides, ref }) => {
  return (
    <Wrapper ref={ref}>
      <Title>{title}</Title>
      <SliderContainer>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          navigation
          slidesPerView={'auto'}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              spaceBetween: 25,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 80,
            },
          }}
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
