import React, {useEffect, useState, useCallback} from 'react';
import Exchange from './exchange/Exchange';
import Issue from './Issue/Issue';
import Premium from './premium/Premium';
import Slider from "react-slick";
import "./Content.css"
import MarketCategory from './MarketCategory';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";


interface ContentViewType {
    view : Number
    loading : Boolean
}


function Content({view,loading} : ContentViewType):React.ReactElement {



    return (
        <main>
            {/* 카테고리 */}
            <div className = "category-view">
                <MarketCategory loading = {loading}/>
            </div>
          <div className = "content-view">
              <Swiper
                  // slidesPerView={1}
                  // spaceBetween={30}
                  touchRatio = {0}
                  speed = {100}
                  pagination={{
                      clickable: true,
                      renderBullet: function (index, className) {
                        return '<span class="' + className + ' 2323"><strong>시세</strong></span>';
                      },
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
              >
                  <SwiperSlide><Exchange loading = {loading} /></SwiperSlide>
                  <SwiperSlide><Issue /></SwiperSlide>
                  <SwiperSlide><Premium /></SwiperSlide>
                  <SwiperSlide><Premium /></SwiperSlide>
                  <SwiperSlide><Premium /></SwiperSlide>
              </Swiper>
          </div>
        </main>

    );
}

export default Content;

