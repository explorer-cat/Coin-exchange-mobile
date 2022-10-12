import './Market_KRW.css'
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState, useRef} from 'react';
import {Link, Route, Routes, BrowserRouter, useNavigate} from 'react-router-dom'
import {Skeleton} from '@mui/material';
import {closeWS, connectWS} from "../../dataHandler/socket";
import Search from "./Search";

interface Market_KRW_Type {
    coinList: any,
    updateItem: any,
    search: any,
    binanceItem : any,
    sort: any,
    loading : any,
}



//pair : ExchangeMarket_KRW_Type
function Market_KRW({sort, coinList, updateItem, search, loading,binanceItem}: Market_KRW_Type): React.ReactElement {
    const navigate = useNavigate();
    const [kimupdown , setKimpupdown] = useState("")
    // console.log("binanceItem",binanceItem)




    const getToFixedBinance = (price : any) => {
        let krwprice = 1428;
        if((Number(price)* krwprice) >= 100) {
            return Number(price * krwprice).toFixed(0)
        }
        if((Number(price)* krwprice) < 100) {
            return Number(price * krwprice).toFixed(1)
        }
        if((Number(price)* krwprice) < 10 && (Number(price)* krwprice) >= 0) {
            return Number(price * krwprice).toFixed(2)
        }
    }

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

    // useEffect(() => {
    //     closeWS()
    // }, [])

    const getSearchCrpytoList = (korean_name: string, symbol: string) => {
        //이름 검색키워드에 포함되지않는 코인들은 숨기기.
        if (korean_name.indexOf(search) === -1 && symbol.indexOf(search.toUpperCase()) === -1) {
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


    if (loading) {
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
        return (<>
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
            const list: any = [];

            if(sort.sortTradePrice === 0 && sort.sortTradePercent === 0 && sort.sortTradeMoney === 0 && sort.default) {
                coinList.sort(function (a: any, b: any) {
                    return b.acc_trade_price_24h - a.acc_trade_price_24h
                })
            } else if(!sort.default) {
                handleSortTable(coinList);
            }
            let kimp;
                coinList.map((data: any) => {
                let binance:any = 0;
                binance = data.market.replace("KRW-", "")
                binance = binance + "USDT"
                // console.log("data",data.updateIndex)
                if (data.market.indexOf("KRW-") !== -1) {

                    let tetherPrice :any = 0;

                    if(binanceItem) {
                        binanceItem.find(function (data: any) {
                            if (data.symbol === binance) {
                                tetherPrice = data.price;
                            }
                        })
                    }

                    // binanceItem.find(function(data:any){
                    //     if(binance+'25USDT' === data.symbol) {
                    //         tetherPrice = data.price * 1400;
                    //     }
                    //
                    //     // return data;
                    // })

                    // console.log("data",data)



                    let kimp = ((data.trade_price - (Number(getToFixedBinance(tetherPrice)))) / data.trade_price * 100).toFixed(2);

                    list.push(
                        <tr className={getSearchCrpytoList(data.korean_name, data.market)}
                            onClick={() => navigate("/react/trade?" + data.market)}>
                            {/*  <tr className = {data.korean_name.indexOf(search) === -1 ? "none" : ""} onClick={() => navigate("/react/trade?" + data.market)}>*/}
                            <td className="icon">
                                <img src={data.icon}></img>
                            </td>
                            <td className="name">
                                <strong>{data.korean_name}</strong>
                                <p>{data.market.replace("KRW-", "")}</p>
                            </td>
                            {data.change === "RISE" ?
                                <td className={"price up"}>
                                    <p className={updateItem.code === data.market ? (data.ask_bid === "ASK" ? "isAsk" : "isBid") : ""}>{data.trade_price.toLocaleString()}</p>
                                    <p className= "binancePrice">{Number(tetherPrice) === 0 ? '-' : Number(tetherPrice).toLocaleString()+'$'}</p>

                                </td> :
                                <td className={"price down"}>
                                    <p className={updateItem.code === data.market ? (data.ask_bid === "ASK" ? "isAsk" : "isBid") : ""}>{data.trade_price.toLocaleString()}</p>
                                    <p className= "binancePrice">{Number(tetherPrice) === 0 ? '-' : Number(tetherPrice).toLocaleString()+'$'}</p>
                                </td>
                                // getToFixedBinance(tetherPrice)
                            }
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
                           {Number(tetherPrice) === 0 ?
                           <td className="premium">
                               <p>-</p>
                           </td>
                               :
                               <td className="premium">
                                   <p className = {Number(kimp) >= 0 ? "up" : "down"}>{((data.trade_price - (Number(getToFixedBinance(tetherPrice)))) / data.trade_price * 100).toFixed(2)}% </p>
                                   <p className = "binancePrice">{Number((Number(getToFixedBinance(tetherPrice)) - data.trade_price).toFixed(2)).toLocaleString()}</p>
                               </td>
                           }

                            <td className="volume">
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
                {/*</div>*/}
            </>)
    }
}


export default Market_KRW;
