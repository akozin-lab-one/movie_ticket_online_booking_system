import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
// import "./UpComing.css"
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";

const UpComing = ({ upComing }) => {
  console.log(upComing);
  if (JSON.stringify(upComing) !== "[]") {
    return (
      <div className=" flex  relative lg:w-[80%] xl:h-[75%] md:w-[85%] sm:w-[70%] w-[70%] mx-auto my-2 ">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="max-w-[90%] lg:max-w-[80%]"
        >
          {Array.isArray(upComing)
            ? upComing.map((up) => {
                return [
                  <SwiperSlide key={up.id}>
                    <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
                      <img
                        className="absolute inset-0 bg-cover bg-center"
                        src={`https://image.tmdb.org/t/p/w500/${up.poster_path}`}
                        alt=""
                      />
                      <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
                      <div className="relative flex flex-col gap-3">
                        <h1 className="text-xl lg:text-2xl">{up.title} </h1>
                        <p className="lg:text-[18px]">{up.content} </p>
                      </div>
                    </div>
                  </SwiperSlide>,
                ];
              })
            : ""}
        </Swiper>

        {/* <div class="swiper mySwiper">
          <div class="swiper-wrapper">
            {Array.isArray(upComing)
              ? upComing.map((up) => {
                  return [
                    <div class="swiper-slide">
                      <img
                        className="absolute inset-0 bg-cover bg-center"
                        src={`https://image.tmdb.org/t/p/w500/${up.poster_path}`}
                        alt=""
                      />
                    </div>,
                  ];
                })
              : ""}
          </div>
        </div> */}
        <h3 className="text-center absolute w-[100%] lg:w-auto bottom-11 text-base  left-[4px]  lg:bottom-11 lg:left-[455px] lg:text-2xl tracking-wider font-bold drop-shadow-lg ">
          UpComing Movies
        </h3>
      </div>
    );
  }
};

export default UpComing;
