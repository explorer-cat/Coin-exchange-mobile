import '../../../../stylesheets/initialization.css'
import '../../../../stylesheets/palette.css'
import './DetailContent.css'
import CategoryToggle from './ContentCategoryToggle'
import React, {useEffect, useState, useCallback} from 'react';
import {useLocation} from "react-router-dom";
import axios from 'axios';


function DetailContent(): React.ReactElement {
    const [loading, setLoading] = useState(false)

    console.log("load detail content")
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
            console.log("tradeSymbol",tradeSymbol)
            try {
                axios.get(`https://api-manager.upbit.com/api/v1/coin_info/pub/${tradeSymbol}.json`, {
                        headers: {
                            "Content-Type": `application/json;charset=UTF-8`,
                            "Accept": "application/json",
                            // 추가
                            // "Access-Control-Allow-Origin": `http://localhost:3000`,
                            'Access-Control-Allow-Credentials': "true",
                        }
                    }
                ).then(response => {
                    console.log("dd",response);
                    console.log("zzz,", response.data);
                })
            } catch (e) {
                console.log("e",e)
            }
            //https://api-manager.upbit.com/api/v1/coin_info/pub/BTC.json
            // fetch(`https://api-manager.upbit.com/api/v1/coin_info/pub/${tradeSymbol}.json`, {
            //         profile: {
            //             username: username,
            //             password: password
            //         }
            //     },
            //     { withCredentials: true }).then((res) => res.json()).then(result => {
            //     if(result) {
            //         resolve(result)
            //     } else {
            //         resolve(false);
            //     }
            // })
        })
    }

    function getCandleInfo() {
        return new Promise((resolve) => {
            try {
                fetch(`https://crix-api-cdn.upbit.com/v1/crix/trades/days?code=CRIX.UPBIT.${tradeCode}&count=100&convertingPriceUnit=KRW`).then((res) => res.json()).then(result => {
                    if(result) {
                        resolve(result)
                    } else {
                        resolve(false);
                    }
                })
            } catch (e) {
                console.log("e",e)
            }
        })
    }

    const getContentInfo = async () => {
        let result = await Promise.all([getTickerInfo(),getDetailCryptoInfo(),getCandleInfo()]).then((value:any) => {
            let ticker = value[0][0];
            let detail = value[1];
            let candle = value[2];

            console.log("detailzxxxxxx",detail)
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
        console.log("getContentInfo")
        getContentInfo();
    },[])

    return (<>
            <CategoryToggle investInfo = {detailInfo}/>
        </>

    );
}


export default DetailContent;

