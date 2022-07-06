import './MarketCategory.css';
import './Header.css'
import Search from './Search'
import React from 'react';
import {useState} from 'react'

//Header 컴포넌트 메게변수 타입을 직접 선언합니다.
interface categoryProps {
    viewType : Number
}

function MarketCategory() {
    const category = ["원화", "BTC", "보유", "관심"]
    const categoryList = category.map((menu) => {
        if(menu === "원화") {
            return(<span><strong className = "select" >{menu}</strong></span>)
        }
        return(<span><strong>{menu}</strong></span>)
    });

  return (
        <div className = "market-category-div">
            {categoryList}
        </div>
  );
}

export default MarketCategory;
