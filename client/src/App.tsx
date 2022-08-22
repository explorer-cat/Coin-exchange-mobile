import React, {ComponentProps, useEffect} from 'react';
import './App.css';
import {useState} from 'react'
import './stylesheets/public.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link, useLocation
} from "react-router-dom";
import {connectWS} from "./dataHandler/socket";
import MainPage from "./components/exchange/MainPage";
import DetailView from "./components/exchange/cryptoDetail/DetailView";

//Header 컴포넌트 메게변수 타입을 직접 선언합니다.


function App() : React.ReactElement {

  //백그라운드 회색 처리 여부
  const [navigationMenu, setNavigationMenu] = useState<boolean>(false);
  //로딩 진행중
  const [loading, setLoading] = useState(false)


  // /* 스켈레톤 로딩 시작 */
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


    const [socket, setSocket] = useState(null)
    const [coinList, setCoinList] = useState(null)


    //업비트 전체 자산 정보 가져오기
    const getAllUpbitCryptoList = (callback:any) => {
        let allSymbol:any = []
        fetch("https://api.upbit.com/v1/market/all").then((response) => response.json()).then(result => {

            result.map((info: any) => {
                allSymbol.push(info.market);
            })
            return callback(allSymbol);
        })
    }


    useEffect(() => {
        //업비트 전체 정보를 불러옵니다.
        getAllUpbitCryptoList((result:any) => {
            //모든 심볼 기준 restApi 요청해서 테이블 세팅 시키기
            fetch(`https://api.upbit.com/v1/ticker?markets=${result}`).then((response) => response.json()).then(result => {
                setCoinList(result);
                //새팅완료돠ㅣ면 소켓 연결 요청해서 실시간
                connectWS("upbit", (result: any) => {
                    setSocket(result)
                })

            })
        });
    },[])


  return (
      <BrowserRouter>
        <Routes>
          <Route path="/react" element={<MainPage loading={loading} socket = {socket} coinList={coinList}/>}/>
          <Route path="/react/trade" element={<DetailView />}/>
        </Routes>
      </BrowserRouter>
  )
}






export default App;
