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
    // 카테고리 클릭 이벤트
    const handlerClickCategory = () => {
        alert("dfdf")
    }

    const category = ["시세", "이슈", "김프", "트렌드", "선물"]
    const categoryList = category.map((menu) => {
        if(menu === "시세") {
            return(<span onClick={handlerClickCategory}><strong className = "select" >{menu}</strong></span>)
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
