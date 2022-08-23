import './Exchange.css';
import './Market_KRW.css'
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState, useRef} from 'react';
import { Link, Route, Routes, BrowserRouter,useNavigate} from 'react-router-dom'
import { Skeleton } from '@mui/material';
import {connectWS} from "../../dataHandler/socket";


interface Market_KRW_Type {
    coinList : any,
}



//pair : ExchangeMarket_KRW_Type
function Market_KRW({coinList} : Market_KRW_Type): React.ReactElement {
    console.log("info",coinList)
    const navigate = useNavigate();
    const [priceBox, setPriceBox] = useState("")
    const loadingBg : String = "rgba(255, 255, 255, 0.13)";
    const [allCoinList, setAllCoinList] = useState([]);



    //업비트 전체 자산 정보 가져오기
    // const getAllUpbitCryptoList = (callback:any) => {
    //     let allSymbol:any = []
    //     fetch("https://api.upbit.com/v1/market/all").then((response) => response.json()).then(result => {
    //
    //         result.map((info: any) => {
    //             allSymbol.push(info.market);
    //         })
    //         return callback(allSymbol)
    //     })
    // }

    // let symbol = props.symbol;
    // let price = props.price.toLocaleString()//.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    // let percent = props.percent;
    // let percent_price = props.percent_price.toLocaleString()//.toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    // let volume = Number(props.volume).toLocaleString()//.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    // let askbid = props.askbid;
    // let cryptoImg = `https://static.upbit.com/logos/${symbol.replace("KRW-","")}.png`
    // //loading Bg color;
    //
    //
    //
    //
    // const changeValue = ((value: any) => {
    //     // console.log("value ",value)
    //     if (value && value.code.indexOf('KRW-') !== -1) {
    //         const findIndex = coinItem.findIndex((temp: any) => value.code === temp.symbol);
    //         let copyArray = [...coinItem];
    //         if (findIndex != -1) {
    //             let target = copyArray[findIndex];
    //             target['price'] = value.trade_price;
    //             target['percent'] = ((value.trade_price - value.opening_price) / value.opening_price * 100).toFixed(2)
    //             target['percent_price'] = value.trade_price - value.opening_price
    //             target['volume'] = (value.acc_trade_price_24h / 1000000).toFixed(0);
    //             target['askbid'] = value.ask_bid;
    //             copyArray[findIndex] = target;
    //             setCoinItem(copyArray)
    //         }
    //     }
    // })
    //
    //
    useEffect(() => {
        connectWS("upbit", (result: any) => {
            // console.log("result",result)
        })
    }, [])

    // //가격 변동에 따른 박스 생성
    // const handlePriceChange = () => {
    //   if(askbid === "BID") {
    //     setPriceBox("isBid")
    //   } else {
    //     setPriceBox("isAsk")
    //   }
    //   setTimeout(()=> {
    //     setPriceBox("")
    //   },2000)
    // }
    //


    //price가 변경될때마다 실행
    // useEffect(() => {
    //   handlePriceChange();
    // },[price]);

    // console.log("props.loadingprops.loading",props.loading)

    console.log("coinList",coinList)
    if(coinList.length <= 0) {
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
            // {
            // <>
                <tr>
                    <td>dfdfdf</td>
                    <td>dfdfdf</td>
                    <td>dfdfdf</td>
                    <td>dfdfdf</td>
                    <td>dfdfdf</td>
                </tr>
            // </>

            // {
            //         <tr onClick = {() => navigate("/react/trade?"+symbol)}>
            //             <td className="icon"><img src = {cryptoImg}></img></td>
            //             <td className="name">
            //                 <strong>{props.name}</strong>
            //                 <p>{symbol.replace("KRW-", "")}</p>
            //             </td>
            //             {/* 가격 표시 박스 */}
            //             {props.percent  > 0  ?
            //                 <td className={"price up"}>
            //                     <p className ={priceBox}>{price}</p>
            //                 </td> :
            //                 <td className={"price down"}>
            //                     <p className ={priceBox}>{price}</p>
            //                 </td> }
            //             {/* 퍼센트 표시 박스 */}
            //             {props.percent  > 0  ?
            //                 <td className="percent up">
            //                     <p>{percent}%</p>
            //                     <p>{percent_price}</p>
            //                 </td>:
            //                 <td className="percent down">
            //                     <p>{percent}%</p>
            //                     <p>{percent_price}</p>
            //                 </td>}
            //
            //             <td className="volume">
            //                 <strong>{volume}</strong><p>백만</p>
            //             </td>
            //         </tr>
            //    }


        )
    }
}


export default Market_KRW;
