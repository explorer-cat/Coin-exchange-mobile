import './Exchange.css';
import './Market_KRW.css'
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState, useRef} from 'react';

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
    let askbid = props.askbid;

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
    

        return ( <tr>
            <td className="candle"></td>
            <td className="name">
                <strong>{props.name}</strong>
                <p>{props.symbol}</p>
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
