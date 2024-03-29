import './MarketCategory.css';
import './header/Header.css'
import Search from './exchange/Search'
import React from 'react';
import {useState} from 'react'
import { tab } from '@testing-library/user-event/dist/tab';
import "swiper/css/pagination";
import { Skeleton } from '@mui/material';


//Header 컴포넌트 메게변수 타입을 직접 선언합니다.
interface MarketCategoryType {
    coinList : any,
}

function MarketCategory() {

    const handleClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("event",event.target)
        console.log("touch!!!")
    };

    const category = ["KRW", "BTC", "즐겨찾기"]
    const categoryKey = ["exchange", "issue", "premium", "trend", "ddd"]

    const categoryList = category.map((menu) => {
        if(menu === "KRW") { //className={categoryKey[tabCount]
            return(<span onClick={handleClickCategory}><strong className = "select" >{menu}</strong></span>)
        }
        return(<span onClick={handleClickCategory}><strong className = "not_select">{menu}</strong></span>)
    });


    const loadingList = category.map((menu) => {
        return(<span ><strong><Skeleton sx={{bgcolor: "rgba(255, 255, 255, 0.13)",width : "50px",height : "40px"}}/></strong></span>)
    });


    // if(!coinList) {
    //     return (
    //         <div className = "market-category-div">
    //             {loadingList}
    //         </div>
    //   );
    // } else {
        return (
            <div className = "market-category-div">
                {/*<div className = "swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">*/}
                {categoryList}
                {/*</div>*/}
            </div>
      );
    // }
}

export default MarketCategory;
