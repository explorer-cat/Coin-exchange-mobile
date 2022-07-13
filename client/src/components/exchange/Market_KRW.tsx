import './Exchange.css';
import './Market_KRW.css'
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState} from 'react';
import connectWS from "../../dataHandler/socket";
import CoinItems from "./CoinItem"


interface ExchangeMarket_KRW_Type {
    // name : any,
    // code :any,
    // price :any,
    // percent:any,
    // tradecost :any,
    // premium : any,
}



//pair : ExchangeMarket_KRW_Type
function Market_KRW(info:any): React.ReactElement {
    const [price, setPrice] = useState(0);


    
     //console.log("ddd",info.pair)
    //  if(info.pair.socketInfo.pair === "KRW-BTC") {
        if(info.code === info.pair.socketInfo.pair) {
            console.log(info.pair.socketInfo.price)
          //  setPrice(info.pair.socketInfo.pair)
        } else {

         //   console.log("다름1", info.code)
        //  console.log("다름2",info.pair.socketInfo.pair)
        }

        
        return (
            <tr >
              <td className="candle"></td> 
              <td className="name">
                  <strong>{info.name}</strong>
                  <p>{info.code}</p>
              </td>
              
              <td className="price">{info.code === info.pair.socketInfo.pair && info.pair.socketInfo.price}</td>
              <td className="percent up">0</td>
              <td className="tradecost">0</td>
              <td className="premium">0</td>
          </tr>);
        // console.log("state!!",info.pair.socketInfo.price)
        // setPrice(info.pair.socketInfo.price)
    //  }
    }

    // useEffect(() => {        
    //     console.log("key",key)
    //     c

    //     // connectWS("upbit",(result:any) => {
    //     // //    console.log("resuit.code",result)
    //     //     if(result.code.indexOf('KRW-') !== -1) {
    //     //         return setPrice(result.prev_closing_price)
    //     //     }
    //     // })
    // },[])


    // return (
    //   <tr >
    //     <td className="candle"></td> 
    //     <td className="name">
    //         <strong>{info.name}</strong>
    //         <p>{info.code}</p>
    //     </td>
    //     <td className="price">{price}</td>
    //     <td className="percent up">0</td>
    //     <td className="tradecost">0</td>
    //     <td className="premium">0</td>
    // </tr>);

//}

export default Market_KRW;
