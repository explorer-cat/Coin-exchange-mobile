import React, { ComponentProps } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import {useState} from 'react'
import PropTypes, { InferProps } from "prop-types";
import './stylesheets/public.css';





function App() : React.ReactElement {
  //백그라운드 회색 처리 여부
  const [bgGray, setBgGray] = useState<boolean>(false);
   
  //백그라운드 회색처리 setter 함수
  const getBgGray = (active:boolean) => {
      setBgGray(active)
  }

  return (
    <div className="mobile-view">
      <div className = {bgGray ? "wrap-container menu-active" : "wrap-container"}>
        
        {/* 백그라운드 gray */}
        <div className = {bgGray ? "bg-gray-active" : "bg-gray"}></div>

        <Header isBgGray = {getBgGray}/>
      </div>
    </div>
  );

}


//다크 모드 화이트모드 
function screenViewMode(white: boolean) {
  const body = document.querySelector(".mobile-view");
  console.log("screen View")
}



export default App;
