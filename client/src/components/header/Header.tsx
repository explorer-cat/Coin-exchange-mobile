import './Header.css';
import './Search.css';
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import '../../stylesheets/public.css'
import Search from './Search'
import React from 'react';
import {useState} from 'react'


//Header 컴포넌트 메게변수 타입을 직접 선언합니다.
interface HeaderProps {
  isBgGray: any
}

function Header({isBgGray} : HeaderProps) {


  /*옵션 버거 아이콘 클릭 이벤트*/
  const clickSettingBtn = (event:React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target : HTMLDivElement = event.currentTarget;

    //클릭 이벤트가 세팅 버튼이 맞는지 확인
    if(target.classList.contains("navBar_header-setting-btn")) {
      isBgGray(true)

      target.classList.add("active-3")

      
    } 

  }

  return (
    <header>

      <div className = "fixed-header">
        <div className ="navBar_header-content">
          <div className ="navBar_header-left">
            <a className = "navBar_header-main-logo"></a>
          </div>
          <div className = "navBar_header-right">
            <div className = "navBar_header-search-btn">
              로그인
            </div>
            <div className = "navBar_header-setting-btn" onClick={clickSettingBtn}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className ="navBar_search-content">
          <Search />
        </div>
      </div>
    </header>
  );
}

export default Header;
