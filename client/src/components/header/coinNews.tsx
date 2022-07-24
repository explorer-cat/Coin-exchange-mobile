import './coinNews.css'
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState, useRef} from 'react';

interface ExchangeMarket_KRW_Type {

}


function CoinNews(props:any): React.ReactElement {
        return (
            <div className = "coinNews-content">
                <div className = "coinNews-content-box">
                    <span className = "tag">이슈</span>
                    <p className ="num">1</p>
                    <p className ="content">BTC 채굴 난이도 하락 5년만에 최고</p>
                </div>
        </div>)
    }


export default CoinNews;
