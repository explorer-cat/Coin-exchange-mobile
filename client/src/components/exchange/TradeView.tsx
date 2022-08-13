// import 'TradeView.css'
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState, useRef} from 'react';
import Header from '../header/Header';
import { Skeleton } from '@mui/material';
import {connectWS , closeWS} from "../../dataHandler/socket";

import { Link, Route, Routes, BrowserRouter,useNavigate} from 'react-router-dom'

interface TradeViewType {
    component : any,
}




//pair : ExchangeMarket_KRW_Type
function TradeView(): React.ReactElement {
    const loadingBg : String = "rgba(255, 255, 255, 0.13)";
    const navigate = useNavigate();


    //뒤로가기 버튼

    const handleGoBack = () => {
        navigate(-1)
    }

    // useEffect(() => {
    //     closeWS();
    //   },[]);


    return (
    <div onClick = {handleGoBack}>
        뒤로가기
    </div>)
}


export default TradeView;
