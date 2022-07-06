import './Exchange.css';
import './Market_KRW.css'
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState} from 'react';
import connectWS from "../../dataHandler/socket";


interface ExchangeMarket_KRW_Type {
    list : any
}




function Market_KRW(list : ExchangeMarket_KRW_Type): React.ReactElement {
    const [price, setPrice] = useState(0);
    const [percent, setPercent] = useState(0);
    const [tradecost, setTradeCost] = useState(0); 
    const [premium, setPremium] = useState(0)
    
    let res;
    const cryptoInfo = list.list;



    useEffect(() => {
        connectWS("upbit",(result:any) => {
            if(result.code === 'KRW-BTC') {
                console.log("dfd",result.prev_closing_price)
                setPrice(1)
            }
        })
    })

    
    let dom : Object = []

    const setCryptoRow = cryptoInfo.map((info:any) => (
    <tr>
        <td className="candle"></td>
        <td className="name">
            <strong>{info.market.name}</strong>
            <p>{info.market.code}</p>
        </td>
        {/* <td className="price">{price}</td>
        <td className="percent up">{percent}%</td>
        <td className="tradecost">{tradecost}</td>
        <td className="premium">{premium}</td> */}
    </tr>));

    
    
    return (setCryptoRow);





}

export default Market_KRW;
