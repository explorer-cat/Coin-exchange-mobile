import './MarketCategory.css';
import './Header.css'
import Search from './Search'
import React from 'react';
import {useState} from 'react'


//Header 컴포넌트 메게변수 타입을 직접 선언합니다.

function MarketCategory() {

  return (
        <div className = "market-category-div">
            <span className = "select">
                원화
            </span>
            <span>BTC</span>
            <span>보유</span>
            <span>관심</span>
        </div>
  );
}

export default MarketCategory;
