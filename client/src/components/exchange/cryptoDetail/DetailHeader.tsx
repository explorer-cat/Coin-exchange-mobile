import './DetailHeader.css';
import '../../../stylesheets/initialization.css'
import '../../../stylesheets/palette.css'
import '../../../stylesheets/public.css'
import '../Market_KRW.css'
import React, {useEffect, useState} from 'react';
import {Link, Route, Routes, BrowserRouter, useNavigate, useLocation} from 'react-router-dom'
import {connectWS, getSocket} from "../../../dataHandler/socket";
import {Skeleton} from '@mui/material';

// import { useAlert } from "react-alert";
//Header 컴포넌트 메게변수 타입을 직접 선언합니다.
interface HeaderProps {
    loadingFuc: any,
    crpytoInfo : any
}


let headerLoading = {
    height: "23px",

}


//뒤로가기 버튼


function DetailHeader({loadingFuc,crpytoInfo}: HeaderProps) {
    const [loading, setLoading] = useState(false);
    const [detailInfo, setDetailInfo] = useState({
        market: '',
        korean: '',
        symbol: '',
        warning: "",
        price: 0,
        change: "",
        change_price: 0,
        change_rate: 0,
    })
    const [bookMark,setBookMark] = useState("");

    const location = useLocation().search
    let tradeCode = location.replace("?", "")


    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1)
    }

    const setFavoriteCrpyto = () => {
        console.log("localStorage.getItem(detailInfo.market)",localStorage.getItem(detailInfo.market))
        if(bookMark === "bookmark") {
            localStorage.removeItem(detailInfo.market)
        } else {
            localStorage.setItem(detailInfo.market, "bookmark")
        }
        setBookMark(localStorage.getItem(detailInfo.market) ? "bookmark" : "no_bookmark");
    }


    /* 현재 접속한 페이지의 코인 이름을 가져옵니다.*/
    const setCrpytoInfo = () => {
        fetch("https://api.upbit.com/v1/market/all").then((response) => response.json()).then(result => {
            result.map((info: any) => {
                if (tradeCode === info.market) {
                    fetch(`https://api.upbit.com/v1/ticker?markets=${tradeCode}`).then((response) => response.json()).then(res => {
                        console.log("res", res)
                        if (res) {
                            setDetailInfo({
                                market: info.market,
                                korean: info.korean_name,
                                symbol: info.english_name,
                                warning: "",
                                price: res[0].trade_price,
                                change: res[0].change,
                                change_price: res[0].trade_price - res[0].opening_price,
                                change_rate: res[0].signed_change_rate * 100,
                            })
                        } else {
                            console.error("REST API 요청에 실패 했습니다.")
                        }
                    })
                }
            })
        })
    }



    useEffect(() => {
        if (loading) {
            //부모 컴포넌트에도 로딩완료됐다고 보내줌.
            loadingFuc(true);

            connectWS([detailInfo.market], (result: any) => {
                // console.log("result",result)
                if (result) {
                    console.log("result",result)
                    setDetailInfo({
                        market: detailInfo.market,
                        korean: detailInfo.korean,
                        symbol: detailInfo.symbol,
                        warning: "",
                        price: result.trade_price,
                        change: result.change,
                        change_price: result.trade_price - result.opening_price,
                        change_rate: result.signed_change_rate * 100
                    })
                }
            })
        }
    }, [loading])

    useEffect(() => {
        if (detailInfo.price !== 0 && !loading) {
            crpytoInfo(detailInfo)
            setLoading(true)
        }
        if (loading && bookMark.length < 1) {
            setBookMark(localStorage.getItem(detailInfo.market) ? "bookmark" : "no_bookmark")
        }
    }, [detailInfo])


    useEffect(() => {
        setCrpytoInfo()
    }, [])

    /**
     *                     <Skeleton sx={{
     *                         bgcolor: "rgba(255, 255, 255, 0.13)",
     *                         width: "80px",
     *                         height: "40px",
     *                         margin: "0px 0px 0px 0px"
     *                     }}/>
     */
    if (!loading) {
        return (<header>
            <div className="headerDiv">
                <div className="detailView_Header">
                    <div className="backToHome">
                        <img className="arrow_back" onClick={handleGoBack}/>
                    </div>
                    {/*<div className="detailTitle">*/}
                    {/*    <span>{detailInfo.}</span>*/}
                    {/*    /!*<span>tradeCode/KRW</span>*!/*/}
                    {/*</div>*/}
                    <div className="favoriteCrpyto">
                        <img className="bookMark" onClick={setFavoriteCrpyto}/>
                    </div>
                </div>
                <div className="detailView_page_Info">
                    <span className="name" style={headerLoading}>
                       <Skeleton sx={{
                           bgcolor: "rgba(255, 255, 255, 0.13)",
                           width: "80px",
                           height: "35px",
                           margin: "0px 0px 0px 0px"
                       }}/>
                    </span>
                    <span className="price" style={headerLoading}>
                        <Skeleton sx={{
                            bgcolor: "rgba(255, 255, 255, 0.13)",
                            width: "120px",
                            height: "35px",
                            margin: "0px 0px 0px 0px"
                        }}/></span>
                    <span className="name" style={headerLoading}>
                        <Skeleton sx={{
                            bgcolor: "rgba(255, 255, 255, 0.13)",
                            width: "60px",
                            height: "25px",
                            margin: "0px 0px 0px 0px"
                        }}/></span>
                </div>
            </div>

        </header>)
    } else {
        return (
            <header>
                <div className="headerDiv">
                    <div className="detailView_Header">
                        <div className="backToHome">
                            <img className="arrow_back" onClick={handleGoBack}/>
                        </div>
                        <div className="favoriteCrpyto">
                            <img className={bookMark === "bookmark" ? "active_bookMark" : "disable_bookMark"} onClick={setFavoriteCrpyto}/>
                        </div>
                    </div>
                </div>
                <div className="detailView_page_Info">
                    <span className="name">{detailInfo.korean}</span>
                    <span className="price">{detailInfo.price.toLocaleString()}{tradeCode.indexOf("BTC-") !== -1 ? " btc" : "원"}</span>
                    <span className={detailInfo.change === "FALL" ? "down" : "up"}>{detailInfo.change_price.toLocaleString()} ({(detailInfo.change_rate).toFixed(2)}%)</span>
                </div>
            </header>
        );
    }
}

export default DetailHeader;
