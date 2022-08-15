import './Exchange.css';
import './Market_KRW.css'
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState, useRef} from 'react';
import { Link, Route, Routes, BrowserRouter,useNavigate} from 'react-router-dom'
import { Skeleton } from '@mui/material';
import TradeView from './TradeView'
import Content from "../Content";


interface Market_KRW {
    props : any,
}

const logoLoading = {
    margin: "0px 0px 0px 12px",
};

//pair : ExchangeMarket_KRW_Type
function Market_KRW(props:any): React.ReactElement {
    const navigate = useNavigate();
    const [priceBox, setPriceBox] = useState("")
    const loadingBg : String = "rgba(255, 255, 255, 0.13)";

    
    let symbol = props.symbol;
    let price = props.price.toLocaleString()//.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let percent = props.percent;
    let percent_price = props.percent_price.toLocaleString()//.toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let volume = Number(props.volume).toLocaleString()//.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let askbid = props.askbid;
    let cryptoImg = `https://static.upbit.com/logos/${symbol.replace("KRW-","")}.png`
    //loading Bg color;




    //가격 변동에 따른 박스 생성
    const handlePriceChange = () => {
      if(askbid === "BID") {
        setPriceBox("isBid")
      } else {
        setPriceBox("isAsk")
      }
      setTimeout(()=> {
        setPriceBox("")
      },2000)
    }



    //price가 변경될때마다 실행
    useEffect(() => {
      handlePriceChange();
    },[price]);

    if(props.loading) {
        return ( 
        <tr>
            <td className="icon"><Skeleton variant = "circular" sx={{
                bgcolor: "rgba(255, 255, 255, 0.13)",
                width : "24px",
                height : "24px",
                margin : "0px 0px 0px 12px"
            }}/></td>
            <td className="name">
                <Skeleton sx={{
                    bgcolor: "rgba(255, 255, 255, 0.13)",
                    width : "60px",
                    height : "40px",
                }}/>
            </td>
            {/* 가격 표시 박스 */}
                <td className={"price up"}>
                    <Skeleton sx={{
                        bgcolor: "rgba(255, 255, 255, 0.13)",
                        width : "85px",
                        height : "20px",
                    }}/>
                    <Skeleton sx={{
                        bgcolor: "rgba(255, 255, 255, 0.13)",
                        width : "45px",
                        height : "20px",
                        margin : "0px 0px 0px 40px"
                    }}/>
                </td>
            {/* 퍼센트 표시 박스 */}
                <td className="percent up">
                    <Skeleton sx={{
                        bgcolor: "rgba(255, 255, 255, 0.13)",
                        width : "55px",
                        height : "40px",
                        margin : "0px 0px 0px 12px"
                    }}/>
                </td>

            <td className="">
                <Skeleton sx={{
                    bgcolor: "rgba(255, 255, 255, 0.13)",
                    width : "80px",
                    height : "40px",
                    margin : "0px 0px 0px 0px"
                }}/>
            </td>
        </tr>)
    } else {
        return (
        <tr onClick = {() => navigate("/react/trade")}>
            <td className="icon"><img src = {cryptoImg}></img></td>
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
        </tr>
        )
    }
}


export default Market_KRW;
