import '../../../../stylesheets/initialization.css'
import '../../../../stylesheets/palette.css'
import './DetailContent.css'
import CategoryToggle from './ContentCategoryToggle'
import React, {useEffect, useState, useCallback} from 'react';
import {useLocation} from "react-router-dom";


function DetailContent(): React.ReactElement {
    const [loading, setLoading] = useState(false)

    const [detailInfo, setDetailInfo] = useState({
        highest_52_week_price : 0,
        highest_52_week_date : "",
        lowest_52_week_price : 0,
        lowest_52_week_date : "",
        acc_trade_volume_24h : 0.0,
        acc_trade_price_24h : 0.0,
        prev_closing_price : 0,
        high_price: 0,
        low_price: 0,
        cryptoinfo : null,
        tickerinfo : null
    })

    const location = useLocation().search
    let tradeCode = location.replace("?", "")
    let tradeSymbol = tradeCode.indexOf("BTC-") === -1 ? tradeCode.replace("KRW-","") : tradeCode.replace("BTC-","")

    function getTickerInfo() {
        return new Promise((resolve) => {
            fetch(`https://api.upbit.com/v1/ticker?markets=${tradeCode}`).then((response) => response.json()).then(res => {
                if(res) {
                    resolve(res)
                } else {
                    resolve(false);
                }
            })
        })
    }

    function getDetailCryptoInfo() {
        return new Promise((resolve) => {
            fetch(`https://api-manager.upbit.com/api/v1/coin_info/pub/${tradeSymbol}.json`).then((res) => res.json()).then(result => {
                if(result) {
                    resolve(result)
                } else {
                    resolve(false);
                }
            })
        })
    }

    function getCandleInfo() {
        return new Promise((resolve) => {
            fetch(`https://crix-api-cdn.upbit.com/v1/crix/trades/days?code=CRIX.UPBIT.${tradeCode}&count=50&convertingPriceUnit=KRW`).then((res) => res.json()).then(result => {
                if(result) {
                    resolve(result)
                } else {
                    resolve(false);
                }
            })
        })
    }

    const getContentInfo = async () => {
        let result = await Promise.all([getTickerInfo(),getDetailCryptoInfo(),getCandleInfo()]).then((value:any) => {
            let ticker = value[0][0];
            let detail = value[1];
            let candle = value[2];
            console.log("result0",value[0])
            console.log("result1",value[1])
            console.log("result2",value[2])
            setDetailInfo({
                highest_52_week_price: ticker.highest_52_week_price,
                highest_52_week_date: ticker.highest_52_week_date,
                lowest_52_week_price: ticker.lowest_52_week_price,
                lowest_52_week_date: ticker.lowest_52_week_date,
                acc_trade_volume_24h: ticker.acc_trade_volume_24h,
                acc_trade_price_24h: ticker.acc_trade_price_24h,
                prev_closing_price: ticker.prev_closing_price,
                high_price: ticker.high_price,
                low_price: ticker.low_price,
                cryptoinfo: detail.data,
                tickerinfo: candle,
            })
        })
    }

    useEffect(() => {
        getContentInfo();
    },[])

    return (<>
            <CategoryToggle investInfo = {detailInfo}/>
        </>

    );
}


export default DetailContent;

