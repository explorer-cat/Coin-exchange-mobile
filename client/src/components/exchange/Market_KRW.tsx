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
    let price = props.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let percent = props.percent;
    let percent_price = props.percent_price.toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let volume = props.volume.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        return ( <tr>
            <td className="candle"></td>
            <td className="name">
                <strong>{props.name}</strong>
                <p>{props.symbol}</p>
            </td>
            <td className="price">
                <p>{price}</p>
            </td>
            <td className="percent">
                <p>{percent}</p>
                <p>{percent_price}</p>
            </td>
            <td className="volume">
                <p>{volume}백만</p>
            </td>
        </tr>)
    }


export default Market_KRW;
