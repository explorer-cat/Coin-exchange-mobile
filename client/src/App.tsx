import React, {ComponentProps, useEffect} from 'react';
import './App.css';
import {useState} from 'react'
import './stylesheets/public.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import {connectWS, requestData} from "./dataHandler/socket";
import MainPage from "./components/exchange/MainPage";
import TradeView from "./components/exchange/TradeView";


//Header 컴포넌트 메게변수 타입을 직접 선언합니다.


function App() : React.ReactElement {

  //백그라운드 회색 처리 여부
  const [navigationMenu, setNavigationMenu] = useState<boolean>(false);
  //로딩 진행중
  const [loading, setLoading] = useState(true)
  const [socket, setSocket] = useState(null)

  /* 스켈레톤 로딩 시작 */
  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (!theme) {
      localStorage.setItem("theme", "light");
      document.querySelector("html")?.setAttribute("data-theme", "light")
    } else {
      document.querySelector("html")?.setAttribute("data-theme", theme)
    }
    // setTimeout(()=> {
    //   setLoading(false)
    // },0)
  }, [])

  // useEffect(() => {
    connectWS("upbit", (result: any) => {
      console.log("connected")
      setSocket(result)
      return (
          <BrowserRouter>
            <Routes>
              <Route path="/react" element={<MainPage loading={loading} socket={socket}/>}/>
              <Route path="/react/trade" element={<TradeView loading={loading} socket={socket}/>}/>
            </Routes>
          </BrowserRouter>
      )
    })
  // }, [])

  // if (!socket) {
  //   return <div>Loading...</div>;
  // } else {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/react" element={<MainPage loading={loading} socket={socket}/>}/>
          <Route path="/react/trade" element={<TradeView loading={loading} socket={socket}/>}/>
        </Routes>
      </BrowserRouter>
  )
}






export default App;
