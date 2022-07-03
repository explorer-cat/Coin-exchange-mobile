import React, { ComponentProps } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import NavigationMenu from './components/navMenu/NavigationMenu'
import {useState} from 'react'
import PropTypes, { InferProps } from "prop-types";
import './stylesheets/public.css';



function App() : React.ReactElement {
  //백그라운드 회색 처리 여부
  const [navigationMenu, setNavigationMenu] = useState<boolean>(false);
   
  //navigation menu 실행
  const getNavigationMenu = (active:boolean) => {
    setNavigationMenu(active)
  }


  return (
    <div className="mobile-view">
     {/* <NavMenu/> */}
     <NavigationMenu view = {navigationMenu}/>
      <div className = "wrap-container menu-active">
        {/* 백그라운드 gray */}
        <div className = {navigationMenu ? "bg-gray-active" : "bg-gray"}></div>
        <Header navigationMenu = {getNavigationMenu}/>
      </div>
    </div>
  );

}




export default App;
