import './Exchange.css';
import './Market_KRW.css'
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState, useRef} from 'react';
import {Link, Route, Routes, BrowserRouter, useNavigate} from 'react-router-dom'
import {Skeleton} from '@mui/material';
import {connectWS} from "../../dataHandler/socket";


interface Market_KRW_Type {
    coinList: any,
}


//pair : ExchangeMarket_KRW_Type
function Market_KRW({coinList}: Market_KRW_Type): React.ReactElement {
    const navigate = useNavigate();
    const [priceBox, setPriceBox] = useState("")
    const loadingBg: String = "rgba(255, 255, 255, 0.13)";
    const [item, setItem] = useState([]);


    console.log("initCoinList", coinList)

    // const changeValue = ((value: any) => {
    //     console.log("value ",value)
    //     if (value && value.code.indexOf('KRW-') !== -1) {
    //         const findIndex = coinList.findIndex((temp: any) => value.code === temp.symbol);
    //         let copyArray:any = [...coinList];
    //         if (findIndex != -1) {
    //             let target = copyArray[findIndex];
    //             target['cryptoImg'] = `https://static.upbit.com/logos/${value.replace("KRW-", "")}.png`
    //             target['name'] = "비트딱"
    //             target['price'] = value.trade_price;
    //             target['percent'] = ((value.trade_price - value.opening_price) / value.opening_price * 100).toFixed(2)
    //             target['percent_price'] = value.trade_price - value.opening_price
    //             target['volume'] = (value.acc_trade_price_24h / 1000000).toFixed(0);
    //             target['askbid'] = value.ask_bid;
    //             copyArray[findIndex] = target;
    //             setItem(copyArray)
    //         }
    //     }
    // })
    //
    //
    // useEffect(() => {
    //     if(item.length > 0) {
    //         console.log("테이블 세팅 완료!")
    //     }

    // setItem(coinList)
    // if(item.length > 1) {
    // setItem(item)
    //
    // connectWS("upbit", (result: any) => {
    //     if (result) {
    //         changeValue(result)
    //     }
    //
    //     //consol
    //     // coinList.filter((number:any,index:any,src:any) => {
    //     //     console.log("number",number)
    //     //     console.log("index",index)
    //     //     console.log("src", src)
    //     // })
    // })
    // }
    // }
    // }, [item])

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
    if (!coinList || coinList === []) {
        return (
            <tr>
                <td className="icon"><Skeleton variant="circular" sx={{
                    bgcolor: "rgba(255, 255, 255, 0.13)",
                    width: "24px",
                    height: "24px",
                    margin: "0px 0px 0px 12px"
                }}/></td>
                <td className="name">
                    <Skeleton sx={{
                        bgcolor: "rgba(255, 255, 255, 0.13)",
                        width: "60px",
                        height: "40px",
                    }}/>
                </td>
                {/* 가격 표시 박스 */}
                <td className={"price up"}>
                    <Skeleton sx={{
                        bgcolor: "rgba(255, 255, 255, 0.13)",
                        width: "85px",
                        height: "20px",
                    }}/>
                    <Skeleton sx={{
                        bgcolor: "rgba(255, 255, 255, 0.13)",
                        width: "45px",
                        height: "20px",
                        margin: "0px 0px 0px 40px"
                    }}/>
                </td>
                {/* 퍼센트 표시 박스 */}
                <td className="percent up">
                    <Skeleton sx={{
                        bgcolor: "rgba(255, 255, 255, 0.13)",
                        width: "55px",
                        height: "40px",
                        margin: "0px 0px 0px 12px"
                    }}/>
                </td>

                <td className="">
                    <Skeleton sx={{
                        bgcolor: "rgba(255, 255, 255, 0.13)",
                        width: "80px",
                        height: "40px",
                        margin: "0px 0px 0px 0px"
                    }}/>
                </td>
            </tr>)
    } else {


        const table = coinList.map((data: any) => (
            <tr onClick = {() => navigate("/react/trade?"+data.market)}>
                <td className="icon">
                    <img src={data.icon}></img>
                </td>
                <td className="name">
                    <strong>{data.korean_name}</strong>
                    <p>{data.market.replace("KRW-", "")}</p>
                </td>
                <td>
                    <p className = "price">{data.trade_price.toLocaleString()}원</p>
                </td>
                <td className="percent up">
                    <p>{(data.signed_change_rate * 100).toFixed(2)}%</p>
                    <p>{(data.trade_price - data.opening_price).toLocaleString()}</p>
                </td>
                <td className="volume">
                    <strong>{((data.acc_trade_price_24h / 1000000).toFixed(0)).toLocaleString()}</strong><p>백만</p>
                </td>
            </tr>))

        // <tr>
        //     <td className="icon"><img src={data.cryptoImg}></img></td>
        //     <td className="name">
        //         <strong>{data.name}</strong>
        //         <p>{data.symbol.replace("KRW-", "")}</p>
        //     </td>
        //     {/* 가격 표시 박스 */}
        //     {data.percent > 0 ?
        //         <td className={"price up"}>
        //             <p className={priceBox}>{data.price}</p>
        //         </td> :
        //         <td className={"price down"}>
        //             <p className={priceBox}>{data.price}</p>
        //         </td>
        //     }
        //     {/* 퍼센트 표시 박스 */}
        //     {data.percent > 0 ?
        //         <td className="percent up">
        //             <p>{data.percent}%</p>
        //             <p>{data.percent_price}</p>
        //         </td> :
        //         <td className="percent down">
        //             <p>{data.percent}%</p><p>{data.percent_price}</p>
        //         </td>}
        //
        //     <td className="volume">
        //         <strong>{data.volume}</strong><p>백만</p>
        //     </td>
        // </tr>


        return (
            <>
                {table}
            </>

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
