import './Header.css';
import './Search.css';
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import '../../stylesheets/public.css'
import Search from './Search'
import MarketCategory from './MarketCategory';
import React from 'react';
import {useState} from 'react'


//Header 컴포넌트 메게변수 타입을 직접 선언합니다.
interface HeaderProps {
  navigationMenu : any
}

function Header({navigationMenu} : HeaderProps) {

  const [navMenu , setNavMenu] = useState(false)

  /*옵션 버거 아이콘 클릭 이벤트*/
  const clickSettingBtn = (event:React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target : HTMLDivElement = event.currentTarget;

    //네비게이션바 class active3가 없다면 네이게이션 애니메이션과 함께 메뉴를 세팅하라
    if(!target.classList.contains("active-3")) {
      //네비게이션 메뉴바 세팅
      navigationMenu(true)
      setNavMenu(true)
    }
    //제거
    else {
      navigationMenu(false)
      setNavMenu(false)
    }
  }

  return (
    <header>
      <div className = {navMenu ? "navBar_header-setting-btn active-3" : "navBar_header-setting-btn"} onClick={clickSettingBtn}>
              <span></span>
              <span></span>
              <span></span>
     </div>
      <div className = "fixed-header">
        <div className ="navBar_header-content">
          <div className ="navBar_header-left">
            <a className = "navBar_header-main-logo"></a>
          </div>
          <div className = "navBar_header-right">
            <div className = "navBar_header-search-btn">
              로그인
            </div>
          </div>
        </div>
        <div className ="navBar_search-content">
          {/* 검색창 */}
          <Search />
        </div>
        <div className = "navBar_market-category">
        <MarketCategory />
        </div>
      </div>
    </header>
  );
}

export default Header;