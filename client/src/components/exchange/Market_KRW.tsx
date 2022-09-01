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
    updateItem : any,
}


//pair : ExchangeMarket_KRW_Type
function Market_KRW({coinList,updateItem}: Market_KRW_Type): React.ReactElement {
    const navigate = useNavigate();
    const [priceBox, setPriceBox] = useState("")
    // const loadingBg: String = "rgba(255, 255, 255, 0.13)";
    // const [item, setItem] = useState([]);
    // const [loading, setLoading] = useState(false);

    //가격 변동에 따른 박스 생성
    const handlePriceChange = () => {
      setTimeout(()=> {
        setPriceBox("")
      },1000)
    }

    useEffect(() => {
        closeWS()
    },[])



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

            coinList.map((data: any) => {
                // console.log("data",data.updateIndex)
                if(data.market.indexOf("KRW-") !== -1) {
                    list.push(
                        <tr onClick={() => navigate("/react/trade?" + data.market)}>
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
                                </td> :
                                <td className={"price down"}>
                                    <p className={updateItem.code === data.market ? (data.ask_bid === "ASK" ? "isAsk" : "isBid") : ""}>{data.trade_price.toLocaleString()}</p>
                                </td>
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
                        <td className="volume">
                            <strong>{Number((data.acc_trade_price_24h / 1000000).toFixed(0)).toLocaleString()}</strong><p>백만</p>
                        </td>
                    </tr>)
                }
            })
            return list;
        }
        return (<>
                {/*<div className="exchange-view">*/}
                {/*    <table className="exchange-public-table">*/}
                {/*        <thead>*/}
                {/*        <tr>*/}
                {/*            <th></th>*/}
                {/*            <th className="title">가상자산명</th>*/}
                {/*            <th className="price">현재가</th>*/}
                {/*            <th className="percent">전일대비</th>*/}
                {/*            <th className="tradecost">거래대금</th>*/}
                {/*        </tr>*/}
                {/*        </thead>*/}
                {/*    </table>*/}
                    <div className="scroll-table">
                        <table className="exchange-public-table">
                            <tbody>
                            {table()}
                            </tbody>
                        </table>
                    </div>
                {/*</div>*/}
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
