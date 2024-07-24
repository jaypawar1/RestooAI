import React, { useContext } from 'react';
import images from './menu';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { MenuContext } from '../../context/menuContext.jsx'; 
const Firstmenu = () => {
  const menu = useContext(MenuContext);
  return (
    <div className="w-full h-full flex justify-start items-start gap-2 overflow-x-hidden pt-4">
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        pagination={{ clickable: true }}
        breakpoints={{
          '@0.75': { slidesPerView: 2, spaceBetween: 20 },
          '@1.00': { slidesPerView: 3, spaceBetween: 40 },
          '@1.50': { slidesPerView: 4, spaceBetween: 50 },
        }}
        className="mySwiper"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col justify-start items-center gap-2 ">
              <img
                className="w-[78px] h-[74px] rounded-2xl shadow border-2 "
                src={item.img}
                alt={item.label}
              />
              <div className="text-black text-sm font-medium ">
              {item.label}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Firstmenu;
