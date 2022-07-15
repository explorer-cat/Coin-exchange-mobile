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
function Market_KRW(info:any): React.ReactElement {

    // const [coinKey, setCoinKey] = useState(0);
       // setPrice(info.code)

        // if(info.code === info.pair.socketInfo.pair) {

        // }

        // useEffect(() => {
        //     console.log("렌더링이 온료될때마다 실행합니다.")
        //   });
        
        // useEffect(()=>{
        //     if(info.code === info.pair.socketInfo.pair) {
        //         setCoinKey(info.code)
        //     }
        //    });
        
     //   console.log("info",info)
        return (
            <tr >
              <td className="candle"></td> 
              <td className="name">
                  <strong>{info.name}</strong>
                  <p>{info.code}</p>
              </td>
              <td className="price">dfd</td>
              <td className="percent up">0</td>
              <td className="tradecost">0</td>
              <td className="premium">0</td>
          </tr>);
    }


export default Market_KRW;
