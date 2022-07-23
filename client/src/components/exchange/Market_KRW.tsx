import './Exchange.css';
import './Market_KRW.css'
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState, useRef} from 'react';
import { CSSTransition } from "react-transition-group";

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
    let askbid = props.askbid === "ASK" ? true : false

    

    useEffect(()=>{
      //setTimeout(()=>{ setAnimation(false) }, 2000);
      
    });


        return ( <tr>
            <td className="candle"></td>
            <td className="name">
                <strong>{props.name}</strong>
                <p>{props.symbol}</p>
            </td>
            {/* 가격 표시 박스 */}
            {props.percent  > 0  ?
              <td className="price">
              <CSSTransition in = {props.askbid} classNames="wow" timeout={500}>
                <p className ="up">{price}</p>
              </CSSTransition>
          </td> :
              <td className="price">
              <CSSTransition in = {animaition} classNames="wow" timeout={1000}>
                <p className ="down">{price}</p>
              </CSSTransition>
            </td> }
             {/* 퍼센트 표시 박스 */}
            {props.percent  > 0  ?
              <td className="percent up">
                <p>{percent}%</p>
                <p>{percent_price}</p>
              </td>:
            <td className="percent down">
                <p>{percent}%</p>
                <p>{percent_price}</p>
            </td>}

            <td className="volume">
                <strong>{volume}</strong><p>백만</p>
            </td>
        </tr>)
    }


export default Market_KRW;
