import './Exchange.css';
import './Market_KRW.css'
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../store/modules/counter";

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
    let symbol = props.symbol;
    let price = props.price.toLocaleString()//.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let percent = props.percent;
    let percent_price = props.percent_price.toLocaleString()//.toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let volume = Number(props.volume).toLocaleString()//.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let askbid = props.askbid;
    let cryptoImg = `https://static.upbit.com/logos/${symbol.replace("KRW-","")}.png`

    const [priceBox, setPriceBox] = useState("")



    //가격 변동에 따른 박스 생성
    const handlePriceChange = () => {
      if(askbid === "BID") {
        setPriceBox("isBid")
      } else {
        setPriceBox("isAsk")
      }
      setTimeout(()=> {
        setPriceBox("")
      },1000)
    }

    //price가 변경될때마다 실행
    useEffect(() => {
      handlePriceChange();
    },[price]);



    console.log("volumevolume",volume)

        return ( <tr>
            <td className="icon">
              <img src = {cryptoImg}></img>
            </td>
            <td className="name">
                <strong>{props.name}</strong>
                <p>{symbol.replace("KRW-", "")}</p>
            </td>
            {/* 가격 표시 박스 */}
            {props.percent  > 0  ?
              <td className={"price up"}>
                <p className ={priceBox}>{price}</p>
          </td> :
              <td className={"price down"}>
                <p className ={priceBox}>{price}</p>
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
