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
    })

    const location = useLocation().search
    let tradeCode = location.replace("?", "")
    let tradeSymbol = tradeCode.indexOf("BTC-") === -1 ? tradeCode.replace("KRW-","") : tradeCode.replace("BTC-","")

    const getContentInfo = () => {
        fetch(`https://api.upbit.com/v1/ticker?markets=${tradeCode}`).then((response) => response.json()).then(res => {
            console.log("res", res)
            if (res) {
                console.log("tradeSymbol",tradeSymbol)
                fetch(`https://api-manager.upbit.com/api/v1/coin_info/pub/${tradeSymbol}.json`).then((res) => res.json()).then(result => {
                    setDetailInfo({
                        highest_52_week_price : res[0].highest_52_week_price,
                        highest_52_week_date : res[0].highest_52_week_date,
                        lowest_52_week_price : res[0].lowest_52_week_price,
                        lowest_52_week_date : res[0].lowest_52_week_date,
                        acc_trade_volume_24h : res[0].acc_trade_volume_24h,
                        acc_trade_price_24h : res[0].acc_trade_price_24h,
                        prev_closing_price : res[0].prev_closing_price,
                        high_price : res[0].high_price,
                        low_price : res[0].low_price,
                        cryptoinfo : result.data,
                    })
                })} else {
                console.error("REST API 요청에 실패 했습니다.")
            }
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

