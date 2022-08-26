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
function Market_KRW(): React.ReactElement {
    // console.log("info", coinList)
    const navigate = useNavigate();
    const [priceBox, setPriceBox] = useState("")
    const loadingBg: String = "rgba(255, 255, 255, 0.13)";
    const [item, setItem] = useState([]);


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

    // let symbol = coinList.symbol;
    // // let price = coinList.price//.toLocaleString()//.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    // let percent = coinList.percent;
    // let percent_price = coinList.percent_price//.toLocaleString()//.toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    // let volume = Number(coinList.volume)//.toLocaleString()//.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    // let askbid = coinList.askbid;
    // let cryptoImg:string
    // symbol ? cryptoImg = `https://static.upbit.com/logos/${symbol.replace("KRW-", "")}.png` : cryptoImg = ""


    let [price,setPrice] = useState(0);
    // //loading Bg color;
    //
    //
    //
    //

    //업비트 전체 자산 정보 가져오기
    const getAllUpbitCryptoList = (callback:any) => {
        let allSymbol:any = []
        fetch("https://api.upbit.com/v1/market/all").then((response) => response.json()).then(result => {
            result.map((info: any) => {
               // if(info.market.indexOf("KRW-") >= 1) {
                    allSymbol.push(info.market);
               // }
            })
            return callback(result,allSymbol);
        })
    }
    let initCoinList:any = []

    useEffect(() => {
        //업비트 전체 정보를 불러옵니다.
        getAllUpbitCryptoList((coinItem:any,symbol:any) => {
            //모든 심볼 기준 restApi 요청해서 테이블 세팅 시키기
            fetch(`https://api.upbit.com/v1/ticker?markets=${symbol}`).then((response) => response.json()).then(result => {

                result.map((item:any,index:any) => {
                    initCoinList.push(Object.assign(result[index],coinItem[index]))
                })

                setItem(initCoinList)
                console.log("result",initCoinList)
                //setItem(result);
                //새팅완료돠ㅣ면 소켓 연결 요청해서 실시간
            })
        });
    },[])


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
    useEffect(() => {
        if(item.length > 0) {
            console.log("테이블 세팅 완료!")
        }

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
    }, [item])

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
    if (!item || item === []) {
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

        const table = item.map((data: any) => (
            <tr>
                <td>{data.korean_name}</td>
            </tr>

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
        ))


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
