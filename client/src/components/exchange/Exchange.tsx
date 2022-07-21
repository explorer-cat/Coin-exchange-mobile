import './Exchange.css';
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState, useCallback} from 'react';
import connectWS from "../../dataHandler/socket";
import Market_KRW from "./Market_KRW";
import getUpbitCryptoList from "../../settings/upbitCryptoSetting";
import { info } from 'console';
import { isJSDocDeprecatedTag } from 'typescript';


interface ExchangeViewType {
    viewType : Number
}


function Exchange({viewType} : ExchangeViewType):React.ReactElement {
    const coinList : any = getUpbitCryptoList().listing;
    console.log("coinList",coinList)

    //원화 코인들 이름만 선별
    let KRW_market_listing :any = [];

    coinList.map((code:any)=> {
        if(code.market.indexOf("KRW-") !== -1) {
            KRW_market_listing.push({
                key : code.market,
                name : code.korean_name,
                symbol : code.market,
                price : 0
            });
        }
    })

    const [coinItem, setCoinItem] = useState(KRW_market_listing);


    // const listItems = coinItem.map((info:any) =>
    //     <ListItem
    //      key = {info.key}
    //      symbol = {info.symbol}
    //      name = {info.name}
    //      price = {info.price}/>
    // )

    const changeValue = (value:any) => {
        if(value.code.indexOf('KRW-') !== -1) {
            const findIndex = coinItem.findIndex((temp:any) => value.code === temp.symbol);
            let copyArray = [...coinItem];
            if(findIndex != -1) {
                let test = copyArray[findIndex];
                test['price'] = value.trade_price;
                copyArray[findIndex] = test;
                setCoinItem(copyArray)
            }
        }
    }

    useEffect(() => {
            connectWS("upbit",(result:any) => {
                changeValue(result);
            })
    }
    ,[])



    return (
      <main>
          <div className = "exchange-view">
            <table className = "exchange-public-table">
                <thead>
                    <tr>
                        <th></th>
                        <th className ="title">가상자산명</th>
                        <th className ="price">현재가</th>
                        <th className ="percent">전일대비</th>
                        <th className ="tradecost">거래대금</th>
                        <th className ="premium">프리미엄</th>
                    </tr>
                </thead>
                <tbody>
                {
                    coinItem.map((info:any) =>
                    <Market_KRW
                        key = {info.key}
                        symbol = {info.symbol}
                        name = {info.name}
                        price = {info.price}/>
                    )
                }
                </tbody>
            </table>
          </div>
      </main>
    );
}

export default Exchange;


/*
  // {
                // KRW_market_listing.map((info:any) => (
                //     ///console.log("tt",typeof info.market)
                //     <Market_KRW
                //     key = {info.symbol}
                //     name = {info.name}
                //     status = {info}
                //     />
                // <tr key = {info.symbol}>
                //     <td className="candle"></td>
                //     <td className="name">
                //         <strong>{info.name}</strong>
                //         <p>{info.symbol}</p>
                //     </td>
                //     <td className="price"></td>
                //     <td className="percent up">0</td>
                //     <td className="tradecost">0</td>
                //     <td className="premium">0</td>
                // </tr>
                //    <Market_KRW
                //    key = {info.market.code}
                //    name = {info.market.name}
                //    code = {info.market.code}
                //    pair = {status}

                 //  ))
               // }
*/
