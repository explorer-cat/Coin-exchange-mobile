import './Header.css';
import '../exchange/Search.css';
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import '../../stylesheets/public.css'
import Search from '../exchange/Search'
import ThemeToggle from './ThemeToggle'
import React from 'react';
import {useState} from 'react'
import CoinNews from './coinNews';
import { Skeleton } from '@mui/material';
import bell_select from '../../images/bell_icon_select.png'
import bell from '../../images/bell_icon.png'

//Header 컴포넌트 메게변수 타입을 직접 선언합니다.
interface HeaderProps {
    navigationMenu : any
}

function Header({navigationMenu} : HeaderProps) {

  const [navMenu , setNavMenu] = useState<boolean>(false)

    const searchSkeleton = {
      display : "flex",
      justifyItems : "center",
      justifyContent : "center"
    }

    const profileIcon = {
      width : "24px",
      height: "24px",
  }


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

   const test = 1;
  // if(!coinList) {
  //     return (    <header>
  //         <div className = {navMenu ? "navBar_header-setting-btn active-3" : "navBar_header-setting-btn"} onClick={clickSettingBtn}>
  //             <span></span>
  //             <span></span>
  //             <span></span>
  //         </div>
  //         <div className = "fixed-header">
  //             <div className ="navBar_header-content">
  //                 <div className ="navBar_header-left">
  //                     <Skeleton sx={{
  //                         bgcolor: "rgba(255, 255, 255, 0.13)",
  //                         width : "65px",
  //                         height : "50px",
  //                     }}/>
  //                 </div>
  //                 <div className = "navBar_header-right">
  //                     <Skeleton sx={{
  //                         bgcolor: "rgba(255, 255, 255, 0.13)",
  //                         width : "65px",
  //                         height : "50px",
  //                     }}/>
  //                 </div>
  //             </div>
  //             <div style = {searchSkeleton}>
  //                 {/* 검색창 */}
  //                 <Skeleton sx={{
  //                     bgcolor: "rgba(255, 255, 255, 0.13)",
  //                     width : "80%",
  //                     height : "50px",
  //                     display : "flex",
  //                     justifyContent: 'center',
  //                 }}/>
  //             </div>
  //         </div>
  //     </header>)
  // }
  return (
    <header>

      {/* <div className = {navMenu ? "navBar_header-setting-btn active-3" : "navBar_header-setting-btn"} onClick={clickSettingBtn}>*/}
      {/*        <span></span>*/}
      {/*        <span></span>*/}
      {/*        <span></span>*/}
      {/*</div>*/}
      <div className = "fixed-header">
        <div className ="navBar_header-content">
          <div className ="navBar_header-left">
            <img className ="header_home" /> 
            {/*<p>Coin King</p>*/}
          </div>
          {/*<div className = "navBar_header-right">*/}
          {/*  <ThemeToggle />*/}
          {/*  /!*<img className = "profile_logo" />*!/*/}
          {/*  /!*<img onClick={clickSettingBtn} src = {bell} style={profileIcon}/>*!/*/}
          {/*</div>*/}
        </div>
        {/* <div className ="navBar_news-content">
          <CoinNews />
        </div> */}
      </div>
    </header>
  );
}

export default Header;
