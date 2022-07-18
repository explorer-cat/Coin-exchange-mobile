import './Exchange.css';
import './Market_KRW.css'
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState} from 'react';
import connectWS from "../../dataHandler/socket";
import CoinItems from "./CoinItem"
import CoinItem from './CoinItem';


interface ExchangeMarket_KRW_Type {
    // name : any,
    // code :any,
    // price :any,
    // percent:any,
    // tradecost :any,
    // premium : any,
}



//pair : ExchangeMarket_KRW_Type
function Market_KRW(info:any,status:any): React.ReactElement {

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
                
                // coinItem(info,result)
              //  console.log("dfdf")
            }
        })
    },[])




    
        return (
            <tr >
              <td className="candle"></td> 
              <td className="name">
                  <strong>{info.name}</strong>
                  <p>{info.status.symbol}</p>
              </td>
              <td className="price">{info.status.price}</td>
              <td className="percent up">0</td>
              <td className="tradecost">0</td>
              <td className="premium">0</td>
          </tr>);
    }


export default Market_KRW;
