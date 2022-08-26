import './Exchange.css';
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState, useCallback} from 'react';
import {connectWS, getSocket} from "../../dataHandler/socket";
import Market_KRW from "./Market_KRW";
import getUpbitCryptoList from "../../settings/upbitCryptoSetting";
import Search from "./Search"
import {Skeleton} from '@mui/material';
import {useNavigate} from "react-router-dom";


interface ExchangeType {
    coinList: any,
}


function Exchange(): React.ReactElement {
    // console.log("info", coinList)
    const navigate = useNavigate();
    const [priceBox, setPriceBox] = useState("")
    const loadingBg: String = "rgba(255, 255, 255, 0.13)";
    const [item, setItem] = useState([]);


    //업비트 전체 자산 정보 가져오기
    // const getAllUpbitCryptoList = (callback:any) => {
    //     let allSymbol:any = []
    //     fetch("https://api.upbit.com/v1/market/all").then((response) => response.json()).then(result => {
    //
    //         result.map((info: any) => {
    //             allSymbol.push(info.market);
    //         })
    //         return callback(allSymbol)
    //     })
    // }

    // let symbol = coinList.symbol;
    // // let price = coinList.price//.toLocaleString()//.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    // let percent = coinList.percent;
    // let percent_price = coinList.percent_price//.toLocaleString()//.toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    // let volume = Number(coinList.volume)//.toLocaleString()//.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    // let askbid = coinList.askbid;
    // let cryptoImg:string
    // symbol ? cryptoImg = `https://static.upbit.com/logos/${symbol.replace("KRW-", "")}.png` : cryptoImg = ""


    let [price,setPrice] = useState(0);
    // //loading Bg color;
    //
    //
    //
    //

    //업비트 전체 자산 정보 가져오기
    const getAllUpbitCryptoList = (callback:any) => {
        let allSymbol:any = []
        fetch("https://api.upbit.com/v1/market/all").then((response) => response.json()).then(result => {
            result.map((info: any) => {
                // if(info.market.indexOf("KRW-") >= 1) {
                allSymbol.push(info.market);
                // }
            })
            return callback(result,allSymbol);
        })
    }
    let krwMarketList :any = []
    let btcMarketList :any = []

    useEffect(() => {
        //업비트 전체 정보를 불러옵니다.
        getAllUpbitCryptoList((coinItem:any,symbol:any) => {
            //모든 심볼 기준 restApi 요청해서 테이블 세팅 시키기
            fetch(`https://api.upbit.com/v1/ticker?markets=${symbol}`).then((response) => response.json()).then(result => {

                result.map((item:any,index:any) => {
                    //원화 usdt btc 구분해서 push
                    result[index]["icon"] = `https://static.upbit.com/logos/${result[index].market.replace("KRW-", "")}.png`
                    if(result[index].market.indexOf("KRW") !== -1) {
                        krwMarketList.push(Object.assign(result[index],coinItem[index]))
                    }
                })
                setItem(krwMarketList)
            })
        });
    },[])



        return (
            <>
                <div className="exchange-search">
                    <Search />
                </div>
                <div className="exchange-view">
                    <table className="exchange-public-table">
                        <thead>
                        <tr>
                            <th></th>
                         <th className="title">가상자산명</th>
                            <th className="price">현재가</th>
                            <th className="percent">전일대비</th>
                         <th className="tradecost">거래대금</th>
                        </tr>
                        </thead>
                    </table>
                    <div className="scroll-table">
                        <table className="exchange-public-table">
                            <tbody>
                          <Market_KRW coinList = {item}/>


                            {/*{*/}
                            {/*    coinItem.map((info: any) =>*/}
                            {/*        <Market_KRW*/}
                            {/*            key={info.key}*/}
                            {/*            symbol={info.symbol}*/}
                            {/*            name={info.name}*/}
                            {/*            price={info.price}*/}
                            {/*            percent={info.percent}*/}
                            {/*            percent_price={info.percent_price}*/}
                            {/*            volume={info.volume}*/}
                            {/*            askbid={info.askbid}*/}
                            {/*            loading={loading}*/}
                            {/*        />*/}
                            {/*    )*/}
                            {/*}*/}


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

