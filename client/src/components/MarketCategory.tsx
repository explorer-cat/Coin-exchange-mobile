import './MarketCategory.css';
import './header/Header.css'
import Search from './exchange/Search'
import React from 'react';
import {useState} from 'react'
import { tab } from '@testing-library/user-event/dist/tab';
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../store/modules/counter";
import "swiper/css/pagination";
import { Skeleton } from '@mui/material';


//Header 컴포넌트 메게변수 타입을 직접 선언합니다.
interface MarketCategoryType {
    loading : Boolean,
}

function MarketCategory({loading}:MarketCategoryType) {

    const handleClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const category = ["시세", "이슈", "김프", "트렌드", "선물"]
    const categoryKey = ["exchange", "issue", "premium", "trend", "ddd"]

    const categoryList = category.map((menu) => {
        if(menu === "시세") { //className={categoryKey[tabCount]
            return(<span onClick={handleClickCategory} className = ""><strong className = "select" >시세</strong></span>)
        }
        return(<span onClick={handleClickCategory} className=""><strong>{menu}</strong></span>)
    });


    const loadingList = category.map((menu) => {
        return(<span ><strong><Skeleton sx={{bgcolor: "rgba(255, 255, 255, 0.13)",width : "50px",height : "40px"}}/></strong></span>)
    });


    if(loading) {
        return (
            <div className = "market-category-div">
                {loadingList}
            </div>
      );
    } else {
        return (
            <div className = "market-category-div">
                {/*<div className = "swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">*/}
                {categoryList}
                {/*</div>*/}
            </div>
      );
    }
}

export default MarketCategory;
