import React, {ComponentProps, useEffect} from 'react';
// import './App.css';
import Header from '../header/Header';
import NavigationMenu from '../navMenu/NavigationMenu'
import Content from '../Content'
import Footer from '../footer/Footer'
import {useState} from 'react'
// import './stylesheets/public.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
// import {connectWS, requestData} from "./dataHandler/socket";
// import TradeView from "./components/exchange/TradeView";



//Header 컴포넌트 메게변수 타입을 직접 선언합니다.
interface MainPage {
    loading : boolean,
    socket : any,
    coinList : any,
}

function MainPage({loading,socket,coinList}:MainPage) : React.ReactElement {


    //백그라운드 회색 처리 여부
    const [navigationMenu, setNavigationMenu] = useState<boolean>(false);
    //로딩 진행중


    //navigation menu 실행
    const getNavigationMenu = (active:boolean) => {
        setNavigationMenu(active)
    }

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
                <Header navigationMenu = {getNavigationMenu}  loading = {loading}/>
                {/* 메인 */}
                <Content loading = {loading} socket = {socket} coinList = {coinList}/>
                {/* 푸터 */}
                <Footer />
            </div>
        </div>
    );

}




export default MainPage;
