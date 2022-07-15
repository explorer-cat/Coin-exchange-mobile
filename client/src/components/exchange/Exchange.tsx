import './Exchange.css';
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState} from 'react';
import connectWS from "../../dataHandler/socket";
import Market_KRW from "./Market_KRW";
import getUpbitCryptoList from "../../settings/upbitCryptoSetting";


interface ExchangeViewType {
    viewType : Number
}

interface coinInfo {
    symbol : string,
    name : string,
}


function Exchange({viewType} : ExchangeViewType):React.ReactElement {
    const [coin, setCoin] = useState({});

    //소켓 연결
    let res;
    //업비트 상장되어있는 코인 리스트 전부 불러옴
    let coinList : any = getUpbitCryptoList().listing;

    //원화 코인들 이름만 선별
    let KRW_market_listing :any = [];

    coinList.map((code:any)=> {
        if(code.market.indexOf("KRW-") !== -1) {
            KRW_market_listing.push({
                name : code.korean_name,
                symbol : code.market
            });
        }
    })


    let socket;
    
    useEffect(() => {
        connectWS("upbit",(result:any) => {
           // console.log("resuit.code",result)
            if(result.code.indexOf('KRW-') !== -1) {
                setCoin({
                    name : result.code,
                    price : result.prev_closing_price
                })
              //  console.log("result", result)
                //  return setStatus({socketInfo :{
                //     pair : result.code,
                //     price : result.prev_closing_price
                //  }})
               // return setPrice(result.prev_closing_price);
            }
        })
    },[])

    console.log("coin",coin)


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
                KRW_market_listing.map((info:any) => (
                    ///console.log("tt",typeof info.market)    
                <tr key = {info.symbol}>
                    <td className="candle"></td> 
                    <td className="name">
                        <strong>{info.name}</strong>
                        <p>{info.symbol}</p>
                    </td>
                    <td className="price"></td>
                    <td className="percent up">0</td>
                    <td className="tradecost">0</td>
                    <td className="premium">0</td>
                </tr>
                //    <Market_KRW 
                //    key = {info.market.code} 
                //    name = {info.market.name}
                //    code = {info.market.code}
                //    pair = {status}
                                   
                   ))
                }
                </tbody>
            </table>
          </div>
      </main>
    );
}

export default Exchange;
