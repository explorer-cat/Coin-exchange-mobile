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
function Market_KRW(props:any): React.ReactElement {
        return ( <tr>
            <td className="candle"></td>
            <td className="name">
                <strong>{props.name}</strong>
                <p>{props.symbol}</p>
            </td>
            <td className="price">{props.price}</td>
            <td className="percent up">0</td>
            <td className="tradecost">0</td>
            <td className="premium">0</td>
        </tr>)
    }


export default Market_KRW;
