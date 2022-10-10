
import './Market_BTC.css'
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState, useRef} from 'react';
import {Link, Route, Routes, BrowserRouter, useNavigate} from 'react-router-dom'
import {Skeleton} from '@mui/material';
import {connectWS} from "../../dataHandler/socket";
import Search from "./Search";



interface Market_BTC_Type {
    coinList: any,
    updateItem : any,
    search : any,
    sort : any,
}


//pair : ExchangeMarket_KRW_Type
function Market_BTC({sort, coinList, updateItem, search}: Market_BTC_Type): React.ReactElement {
    const navigate = useNavigate();
    const [priceBox, setPriceBox] = useState("")
    // const loadingBg: String = "rgba(255, 255, 255, 0.13)";
    // const [item, setItem] = useState([]);
    // const [loading, setLoading] = useState(false);



    const convertToNumber = (obj:any) => {
        if(obj){
            const formatter = Intl.NumberFormat();
            if(obj > 99999999999) {
                let jo:any = String(obj).slice(0,-12);
                obj = (obj % 1000000000000);
                var eok:any = (obj / 100000000).toFixed(0);
                // console.log("jo",jo)
                if(jo) {
                    return formatter.format(jo) + '조 ' + formatter.format(eok) + '억';
                } else {
                    return formatter.format(eok) + '억';
                }
            } else if (obj > 99999999) {
                obj = (obj / 100000000).toFixed(0);
                return formatter.format(obj) + '억';
            } else {
                return formatter.format(obj);
            }
        }
        return obj;
    }

    const getSearchCrpytoList = (korean_name:string,symbol:string) => {
        //이름 검색키워드에 포함되지않는 코인들은 숨기기.
        if(korean_name.indexOf(search) === -1 && symbol.indexOf(search.toUpperCase()) === -1) {
            return "none"
        }
        return ""
    }

    const handleSortTable = (coinList:any) => {
        coinList.sort(function (a: any, b: any) {
            if (sort.sortTradePrice === 1) {
                return a.trade_price - b.trade_price
            } else if(sort.sortTradePrice === 2){
                return b.trade_price - a.trade_price
            }

            if (sort.sortTradePercent === 1) {
                return a.signed_change_rate - b.signed_change_rate
            } else if(sort.sortTradePercent === 2){
                return b.signed_change_rate - a.signed_change_rate
            }

            if (sort.sortTradeMoney === 1) {
                return a.acc_trade_price_24h - b.acc_trade_price_24h
            } else if(sort.sortTradeMoney === 2){
                return b.acc_trade_price_24h - a.acc_trade_price_24h
            }
        })
    }


    // console.log("initCoinList", coinList)

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

    //가격 변동에 따른 박스 생성
    // const handlePriceChange = () => {
    //   if(coinList.ask_bid === "BID") {
    //     setPriceBox("isBid")
    //   } else {
    //     setPriceBox("isAsk")
    //   }
    //   setTimeout(()=> {
    //     setPriceBox("")
    //   },2000)
    // }
    //
    //
    // //price가 변경될때마다 실행
    // useEffect(() => {
    //   handlePriceChange();
    // },[coinList]);


    //  console.log("props.loadingprops.loading", coinList)


    if (coinList.length === 0) {
        const rendering = () => {
            const temp = [];
            for (let i = 0; i < 20; i++) {
                temp.push(<tr>

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
                    </tr>
                )
            }
            return temp;
        };
        return(<>
                <div className="scroll-table">
                    <table className="exchange-public-table">
                        <tbody>
                        {rendering()}
                        </tbody>
                    </table>
                </div>
            {/*{rendering()}*/}
        </>)

    } else {

        const table = () => {
            const list:any = [];
            let btcPrice = 0;

            if(sort.sortTradePrice === 0 && sort.sortTradePercent === 0 && sort.sortTradeMoney === 0 && sort.default) {
                coinList.sort(function (a: any, b: any) {
                    return b.acc_trade_price_24h - a.acc_trade_price_24h
                })
            } else if(!sort.default) {
                handleSortTable(coinList);
            }


            coinList.map((data: any) => {
                if(data.market === "KRW-BTC") {
                    btcPrice = data.trade_price;
                }




                if(data.market.indexOf("BTC-") !== -1) {
                 //   console.log("DATA",data);
                    list.push(
                        <tr className = {getSearchCrpytoList(data.korean_name,data.market)}onClick={() => navigate("/react/trade?" + data.market)}>
                            <td className="icon">
                                <img src={data.icon}></img>
                            </td>
                            <td className="name">
                                <strong>{data.korean_name}</strong>
                                <p>{data.market.replace("BTC-", "")}</p>
                            </td>
                            {data.change === "RISE" ?
                                <td className={"price up btc_price"}>
                                    <p className={updateItem.code === data.market ? (data.ask_bid === "ASK" ? "isAsk" : "isBid") : ""}>{data.trade_price}</p>
                                    <p className="btcToKRW_Volume">{Number((btcPrice * data.trade_price).toFixed()).toLocaleString()}KRW</p>
                                </td> :
                                <td className={"price down btc_price"}>
                                    <p className={updateItem.code === data.market ? (data.ask_bid === "ASK" ? "isAsk" : "isBid") : ""}>{data.trade_price}</p>
                                    <p className="btcToKRW_Volume">{Number((btcPrice * data.trade_price).toFixed()).toLocaleString()}KRW</p>
                                </td>}
                            {data.signed_change_rate * 100 > 0 ?
                                <td className="percent up">
                                    <p>{(data.signed_change_rate * 100).toFixed(2)}%</p>
                                    <p>{(data.trade_price - data.opening_price).toLocaleString()}</p>
                                </td> :
                                <td className="percent down">
                                    <p>{(data.signed_change_rate * 100).toFixed(2)}%</p>
                                    <p>{(data.trade_price - data.opening_price).toLocaleString()}</p>
                                </td>
                            }

                            <td className="premium">
                                <p>{(data.signed_change_rate * 100).toFixed(2)}%</p>
                                <p>{(data.trade_price - data.opening_price).toLocaleString()}</p>
                            </td>
                            <td className="volume btc_volume">
                                <strong>{convertToNumber(Number(data.acc_trade_price_24h).toFixed(0))}</strong>
                                {/*<strong>{Number((data.acc_trade_price_24h / 1000000).toFixed(0)).toLocaleString()}억</strong>*/}
                            </td>
                        </tr>)
                }
            })
            return list;
        }
        return (<>
                    <div className="scroll-table">
                        <table className="exchange-public-table">
                            <tbody>
                            {table()}
                            </tbody>
                        </table>
                    </div>
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


export default Market_BTC;
