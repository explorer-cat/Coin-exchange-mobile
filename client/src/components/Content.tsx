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
    loading : Boolean,
    socket : any,
    coinList: any,
}


function Content({loading,socket,coinList} : ContentViewType):React.ReactElement {


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
                  speed = {0}
                  pagination={{
                      clickable: true,
                      renderBullet: function (index, className) {
                        console.log("index",index)
                        if(index === 3) {
                            return '<span class="' + className + '"><strong>트렌드</strong></span>';
                        } else {
                            return '<span class="' + className + '"><strong>시세</strong></span>';
                        }
                      },
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
              >
                  <SwiperSlide><Exchange loading = {loading} socket = {socket} coinList = {coinList} /></SwiperSlide>
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

