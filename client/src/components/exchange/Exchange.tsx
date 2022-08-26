import './Exchange.css';
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState, useCallback} from 'react';
import {connectWS, getSocket} from "../../dataHandler/socket";
import Market_KRW from "./Market_KRW";
import getUpbitCryptoList from "../../settings/upbitCryptoSetting";
import Search from "./Search"
import {Skeleton} from '@mui/material';


interface ExchangeType {
    coinList: any,
}


function Exchange(): React.ReactElement {


    //원화 코인들 이름만 선별
    let KRW_market_listing: any = [];


    const [coinItem, setCoinItem] = useState(KRW_market_listing);
    const [cryptoLoading, setCryptoLoading] = useState(false);


    /* 첫 컴포넌트 로드때 코인정보를 한번만 불러옵니다. */
    // useEffect(() => {
    //     if(coinList) {
    //         for (const list of coinList) {
    //             if (list.market.indexOf("KRW-") !== -1) {
    //                 KRW_market_listing.push({
    //                     key: list.market,
    //                     name: list.korean_name,
    //                     symbol: list.market,
    //                     price: list.prev_closing_price,
    //                     percent: ((list.trade_price - list.opening_price) / list.opening_price * 100).toFixed(2),
    //                     percent_price: list.trade_price - list.opening_price,
    //                     volume: (list.acc_trade_price_24h / 1000000).toFixed(0),
    //                     premium: 0,
    //                     askbid: "",
    //                 });
    //             }
    //         }
    //     }
    //         setCoinItem(KRW_market_listing);
    //         // setCryptoLoading(true)
    // }, [coinList])
    //



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
                          <Market_KRW />


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

