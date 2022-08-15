import './Exchange.css';
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState, useCallback} from 'react';
import {connectWS,getSocket,requestData} from "../../dataHandler/socket";
import Market_KRW from "./Market_KRW";
import getUpbitCryptoList from "../../settings/upbitCryptoSetting";
import Search from "./Search"
import {Skeleton} from '@mui/material';


interface ExchangeType {
    loading: Boolean
}


function Exchange({loading}: ExchangeType): React.ReactElement {
    const coinList: any = getUpbitCryptoList().listing;

    //원화 코인들 이름만 선별
    let KRW_market_listing: any = [];



    const [coinItem, setCoinItem] = useState(KRW_market_listing);



    const getCoinList = () => {
        coinList.map((code: any) => {
            if (code.market.indexOf("KRW-") !== -1) {
                KRW_market_listing.push({
                    key: code.market,
                    name: code.korean_name,
                    symbol: code.market,
                    price: 0,
                    percent: 0,
                    percent_price: 0,
                    volume: 0,
                    premium: 0,
                    askbid: "",
                    path: "/" + code,
                });
            }
        })
    }


    /*
        const changeValue = (value:any) => {
            if(value.code.indexOf('KRW-') !== -1) {
                const findIndex = coinItem.findIndex((temp:any) => value.code === temp.symbol);
                let copyArray = [...coinItem];
                if(findIndex != -1) {
                    let target = copyArray[findIndex];
                    target['price'] = value.trade_price;
                    target['percent'] = ((value.trade_price - value.opening_price) / value.opening_price * 100).toFixed(2)
                    target['percent_price'] = value.trade_price - value.opening_price
                    target['volume'] = (value.acc_trade_price_24h / 1000000).toFixed(0);
                    target['askbid'] = value.ask_bid;
                    copyArray[findIndex] = target;
                    setCoinItem(copyArray)
                }
            }
        }
     */


    const changeValue = useCallback((value: any) => {
        if (value.code.indexOf('KRW-') !== -1) {
            const findIndex = coinItem.findIndex((temp: any) => value.code === temp.symbol);
            let copyArray = [...coinItem];
            if (findIndex != -1) {
                let target = copyArray[findIndex];
                target['price'] = value.trade_price;
                target['percent'] = ((value.trade_price - value.opening_price) / value.opening_price * 100).toFixed(2)
                target['percent_price'] = value.trade_price - value.opening_price
                target['volume'] = (value.acc_trade_price_24h / 1000000).toFixed(0);
                target['askbid'] = value.ask_bid;
                copyArray[findIndex] = target;
                setCoinItem(copyArray)
            }
        }
    }, [])



    /* 첫 컴포넌트 로드때 코인정보를 한번만 불러옵니다. */
    useEffect(() => {
        coinList.map((code: any) => {
            if (code.market.indexOf("KRW-") !== -1) {
                KRW_market_listing.push({
                    key: code.market,
                    name: code.korean_name,
                    symbol: code.market,
                    price: 0,
                    percent: 0,
                    percent_price: 0,
                    volume: 0,
                    premium: 0,
                    askbid: "",
                    path: "/" + code,
                });
            }
        })
        // console.log("changeValuek",KRW_market_listing)
    }, [])

    useEffect(() => {
        console.log("useEffect")
        if (getSocket()) {
            //처음 로딩할때 소켓정보를 전역에 저장했다가 계속 사용ㄹ하도록 하시오
            // requestData(/*socket*/,(result:any) => {
            //     changeValue(result)
            // })
        } else {
            connectWS("upbit", (socket: any) => {
                //소켓에 연결됐다면
               if(socket) {
                   requestData(socket,(result:any) => {
                       changeValue(result)
                   })
               }
            })
        }
    }, [])


    return (
        <>
            <div className="exchange-search">
                <Search loading={loading}/>
            </div>
            <div className="exchange-view">
                <table className="exchange-public-table">
                    <thead>
                    <tr>
                        <th></th>
                        {loading ? (
                            <th><Skeleton animation="wave" sx={{bgcolor: 'rgba(255, 255, 255, 0.13)'}} height={40}
                                          width="80%"/></th>) : <th className="title">가상자산명</th>}
                        {loading ? (
                            <th><Skeleton animation="wave" sx={{bgcolor: 'rgba(255, 255, 255, 0.13)'}} height={40}
                                          width="80%"/></th>) : <th className="price">현재가</th>}
                        {loading ? (
                            <th><Skeleton animation="wave" sx={{bgcolor: 'rgba(255, 255, 255, 0.13)'}} height={40}
                                          width="80%"/></th>) : <th className="percent">전일대비</th>}
                        {loading ? (
                            <th><Skeleton animation="wave" sx={{bgcolor: 'rgba(255, 255, 255, 0.13)'}} height={40}
                                          width="80%"/></th>) : <th className="tradecost">거래대금</th>}
                    </tr>
                    </thead>
                </table>
                <div className="scroll-table">
                    <table className="exchange-public-table">
                        <tbody>
                        {
                            coinItem.map((info: any) =>
                                <Market_KRW
                                    key={info.key}
                                    symbol={info.symbol}
                                    name={info.name}
                                    price={info.price}
                                    percent={info.percent}
                                    percent_price={info.percent_price}
                                    volume={info.volume}
                                    askbid={info.askbid}
                                    loading={loading}

                                />
                            )

                        }

                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
}


/**
 *                         <BrowserRouter>
 <Routes>
 <Route path = "/main" element = {<Market_KRW />}/>
 </Routes>
 </BrowserRouter>
 <Market_KRW
 */
export default Exchange;

