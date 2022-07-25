import './Exchange.css';
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState, useCallback} from 'react';
import connectWS from "../../dataHandler/socket";
import Market_KRW from "./Market_KRW";
import getUpbitCryptoList from "../../settings/upbitCryptoSetting";
import Search from "./Search"
import { info } from 'console';
import { isJSDocDeprecatedTag } from 'typescript';



function Exchange():React.ReactElement {
    const coinList : any = getUpbitCryptoList().listing;

    //원화 코인들 이름만 선별
    let KRW_market_listing :any = [];

    coinList.map((code:any)=> {
        // console.log("code.market.replace(/\\'KRW'/g,\"\"),",code.market.replace(/\'KRW'/g,""))
        if(code.market.indexOf("KRW-") !== -1) {
            KRW_market_listing.push({
                key : code.market,
                name : code.korean_name,
                symbol : code.market,
                price : 0,
                percent : 0,
                percent_price : 0,
                volume : 0,
                premium : 0,
                askbid : ""
            });
        }
    })

    const [coinItem, setCoinItem] = useState(KRW_market_listing);

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

    const changeBorder = () => {

    }


    /*컴포넌트 렌더링 후 부터 실행*/
    useEffect(() => {
            connectWS("upbit",(result:any) => {

                changeValue(result);
            })
    }
    ,[])



    return (
        <>
        <div className = "exchange-search">
            <Search />
        </div>
          <div className = "exchange-view">
            <table className = "exchange-public-table">
                <thead>
                    <tr>
                        <th></th>
                        <th className ="title">가상자산명</th>
                        <th className ="price">현재가</th>
                        <th className ="percent">전일대비</th>
                        <th className ="tradecost">거래대금</th>
                    </tr>
                </thead>
            </table>
              <div className = "scroll-table">
                  <table  className = "exchange-public-table">
                    <tbody>
                    {
                        coinItem.map((info:any) =>
                        <Market_KRW
                            key = {info.key}
                            symbol = {info.symbol}
                            name = {info.name}
                            price = {info.price}
                            percent = {info.percent}
                            percent_price = {info.percent_price}
                            volume = {info.volume}
                            askbid = {info.askbid}
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

export default Exchange;

