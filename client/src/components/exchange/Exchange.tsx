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



// const coinItem = (info:any,data:any) => {
    
//         return (
//         <Market_KRW 
//             // key = {info.symbol}
//             key = {info.symbol}
//             name = {info.name}
//             status = {info}
//             />) 
//     }

function ListItem(props:any) {
        //업비트 상장되어있는 코인 리스트 전부 불러옴
        console.log("props",props)


    return <tr>
        <td className="candle"></td> 
        <td className="name">
            <strong>{props.name}</strong>
            <p>{props.symbol}</p>
        </td>
        <td className="price">1</td>
        <td className="percent up">0</td>
        <td className="tradecost">0</td>
        <td className="premium">0</td>
    </tr>
}


function Exchange({viewType} : ExchangeViewType):React.ReactElement {
    const [coin, setCoin] = useState({});

    //소켓 연결
    let res;

    let coinList : any = getUpbitCryptoList().listing;

    //원화 코인들 이름만 선별
    let KRW_market_listing :any = [];

    coinList.map((code:any)=> {
        if(code.market.indexOf("KRW-") !== -1) {
            KRW_market_listing.push({
                // key : code.market,
                name : code.korean_name,
                symbol : code.market,
                // price : "1"
            });
        }
    })

    const [test, setTest] = useState([
        {
            key : 0,
            name : "비트코인",
            symbol : "KRW-BTC",
        },
        {
            key : 1,
            name : "이더리움",
            symbol : "KRW-ETH",
        }
    ]);


    const listItems = test.map((info:any) => 
        <ListItem 
         key = {info.key}
         symbol = {info.symbol}
         name = {info.name} />
    )

    
    useEffect(() => {
        setTest([
            {
                key : 0,
                name : "비트코인1",
                symbol : "KRW-BTC",
            },
            {
                key : 1,
                name : "이더리움",
                symbol : "KRW-ETH",
            }
        ])
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
                    {listItems}
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