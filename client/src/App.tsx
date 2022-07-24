import React, { ComponentProps } from 'react';
import './App.css';
import Header from './components/header/Header';
import NavigationMenu from './components/navMenu/NavigationMenu'
import Content from './components/Content'
import Footer from './components/footer/Footer'
import {useState} from 'react'
import './stylesheets/public.css';
import { useDispatch, useSelector } from "react-redux";



function App() : React.ReactElement {

  console.log("app.js render")

  //백그라운드 회색 처리 여부
  const [navigationMenu, setNavigationMenu] = useState<boolean>(false);
  //무슨 마켓을 보여줄거임 0:원화 1:BTC 2:보유 3:관심
  const [contentView, setContentView] = useState<Number>(0);



  //navigation menu 실행
  const getNavigationMenu = (active:boolean) => {
    setNavigationMenu(active)
  }

  const count = useSelector((state:any) => state.counter.number);


  return (
    <div className="mobile-view">
     {/*네비게이션 메뉴 미리 생성 해놓기*/}
     <NavigationMenu view = {navigationMenu}/>
      <div className = "wrap-container menu-active">
        {/* 네비게이션 메뉴가 실행되면 뒷배경 회색으로 */}
        <div className = {
          navigationMenu ? "bg-gray-active" : "bg-gray"}>
        </div>

        {/* 헤더 */}
        <Header navigationMenu = {getNavigationMenu}/>
        {/* 메인 */}
        <Content view = {count}/>
        {/* 푸터 */}
        <Footer />

      </div>
    </div>
  );

}




export default App;
