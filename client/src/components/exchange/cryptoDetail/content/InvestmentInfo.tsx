import '../../../../stylesheets/initialization.css'
import '../../../../stylesheets/palette.css'
import './DetailContent.css'
import './InvestmentInfo.css'
import '../DetailView.css'
import CategoryToggle from './ContentCategoryToggle'
import React, {useEffect, useState, useCallback} from 'react';
import {useLocation} from "react-router-dom";

interface InvestmentInfoType {
    props : any,
}

function InvestmentInfo({props}:InvestmentInfoType): React.ReactElement {
    const [loading, setLoading] = useState(false)

    const location = useLocation().search
    let tradeCode = location.replace("?", "")

    console.log("propszzz",props)

    return (
        <>
        <div className = "InvestInfoArea">
            <div className = "content-title">
                투자 정보
            </div>
            <div className = "content-info investContent">
                <div className = "content-full">
                    <ul>
                        <li className = "subTitle"> 1일 최고가</li>
                        <li className = "up">{tradeCode.indexOf("BTC-") !== -1 ? (props.high_price).toFixed(10).toLocaleString() : props.high_price.toLocaleString()}{tradeCode.indexOf("BTC-") !== -1 ? " BTC" : "원"}<span></span></li>
                    </ul>
                    <ul>
                        <li className = "subTitle"> 1일 최저가</li>
                        <li className = "down">{tradeCode.indexOf("BTC-") !== -1 ? (props.low_price).toFixed(10).toLocaleString() :  props.low_price.toLocaleString()}{tradeCode.indexOf("BTC-") !== -1 ? " BTC" : "원"}<span></span></li>
                    </ul>
                    <ul>
                        <li className = "subTitle"> 52주 최고가</li>
                        <li className = "up">{tradeCode.indexOf("BTC-") !== -1 ? (props.highest_52_week_price).toFixed(10).toLocaleString() :  props.highest_52_week_price.toLocaleString()}{tradeCode.indexOf("BTC-") !== -1 ? " BTC" : "원"}<span>({props.highest_52_week_date})</span></li>
                    </ul>
                    <ul>
                        <li className = "subTitle"> 52주 최저가</li>
                        <li className = "down">{tradeCode.indexOf("BTC-") !== -1 ? (props.lowest_52_week_price).toFixed(10).toLocaleString() : props.lowest_52_week_price.toLocaleString()}{tradeCode.indexOf("BTC-") !== -1 ? " BTC" : "원"}<span>({props.lowest_52_week_date})</span></li>
                    </ul>
                    <ul>
                        <li className = "subTitle"> 24시간 거래량</li>
                        <li>{Number(props.acc_trade_volume_24h.toFixed(0)).toLocaleString()}개<span></span></li>
                    </ul>
                    <ul>
                        <li className = "subTitle"> 24시간 거래대금</li>
                        <li>{Number(props.acc_trade_price_24h.toFixed(0)).toLocaleString()}{tradeCode.indexOf("BTC-") !== -1 ? " BTC" : "원"}<span></span></li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
}


export default InvestmentInfo;

