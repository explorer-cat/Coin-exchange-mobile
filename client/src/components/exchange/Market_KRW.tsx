import './Exchange.css';
import './Market_KRW.css'
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState} from 'react';
import connectWS from "../../dataHandler/socket";
import CoinItems from "./CoinItem"


interface ExchangeMarket_KRW_Type {
    list : any
}




function Market_KRW(list : ExchangeMarket_KRW_Type): React.ReactElement {
    const test = '';
    const [price, setPrice] = useState();

    const cryptoInfo = list.list;

    useEffect(() => {
        connectWS("upbit",(result:any) => {
            console.log("resuit.code",result)
            if(result.code.indexOf('KRW-') !== -1) {
                console.log("dfd",result.prev_closing_price)
               // return setPrice(result.prev_closing_price);
            }
        })
    },[])

    
    let dom : Object = []

    const setCryptoRow = cryptoInfo.map((info:any) => (
    <tr >
        <td className="candle"></td> 
        <td className="name">
            <strong>{info.market.name}</strong>
            <p>{info.market.code}</p>
        </td>
        <td className="price">0</td>
        <td className="percent up">0</td>
        <td className="tradecost">0</td>
        <td className="premium">0</td>
    </tr>));

    
    
    return (setCryptoRow);





}

export default Market_KRW;
