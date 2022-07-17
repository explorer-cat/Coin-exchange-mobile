import './Exchange.css';
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState} from 'react';
import connectWS from "../../dataHandler/socket";
import Market_KRW from "./Market_KRW";
import getUpbitCryptoList from "../../settings/upbitCryptoSetting";
import { info } from 'console';
import { isJSDocDeprecatedTag } from 'typescript';


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
                symbol : code.market,
                price : "1"
            });
        }
    })


    console.log("KRW_market_listing",KRW_market_listing)
    let socket;

    const coinItem = (info:any,data:any) => {
        const [code, setCode] = useState(info.code);
        const [name, setName] = useState(info.name)
        const [status,setStatus] = useState(data)
        
        return (<main>
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
                    ///console.log("tt",typeof info.market)    
                    <Market_KRW 
                    // key = {info.symbol}
                    key = {code}
                    name = {name}
                    status = {status}
                    />

                    }
                </tbody>
            </table>
            </div>
        </main>) 
    }


    useEffect(() => {
        connectWS("upbit",(result:any) => {
            if(result.code.indexOf('KRW-') !== -1) {
                let info = {
                    key : result.code,
                    name : "비트코인"
                }
                let staus = {
                    symbol : result.code,
                    price : result.prev_closing_price
            
                }
                return coinItem(info,result)
              //  console.log("dfdf")
            }
        })
    },[])
    


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
                    <Market_KRW 
                    // key = {info.symbol}
                    key = {info.symbol}
                    name = {info.name}
                    status = {info}
                    />
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
                                   
                   ))
                }
                </tbody>
            </table>
          </div>
      </main>
    );
}

export default Exchange;
