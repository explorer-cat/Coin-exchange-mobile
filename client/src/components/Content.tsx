import React, {useEffect, useState, useCallback} from 'react';
import Premium from './premium/Premium';
import "./Content.css"
import "./exchange/Search.css"
import MarketCategory from './MarketCategory';
import {Swiper, SwiperSlide} from "swiper/react";
import {getCryptoInfo} from "../cryptoInfo";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import {Pagination} from "swiper";
// import Market_BTC from "./Market_BTC";
import {closeWS, connectWS, connectBinaceSocket} from "../dataHandler/socket";
import Market_KRW from "./exchange/Market_KRW";
import Market_BTC from "./exchange/Market_BTC";
import Market_BookMark from "./exchange/Market_BookMark";
import Search from "./exchange/Search";
import md5 from "md5";

interface ContentViewType {
    changeCurrent: any,
    search: any,
}


function Content({changeCurrent, search}: ContentViewType): React.ReactElement {
    const [item, setItem] = useState([]);
    const [updateItem, setUpdateItem] = useState();
    const [selectCategory, setSelectCategory] = useState(0)
    const [sort, setSort] = useState({
        sortTradeMoney: 0, //기본 정렬 거래대금순
        sortTradePrice: 0,
        sortTradePercent: 0,
        sortTradeKimp: 0,
        default: true,
    });
    const [loading, setLoading] = useState(true)
    const [usdtPrice, setUsdtPrice] = useState(0);
    const [binanceInfo, setBinanceInfo] = useState([]);

    const [upbitCall, setUpbitCall] = useState(false);


    const handleSortTable = (e: any) => {
        switch (e.target.className) {
            case "price":
                if (sort.sortTradePrice === 2) {
                    setSort({
                        sortTradeMoney: 0,
                        sortTradePrice: 0,
                        sortTradePercent: 0,
                        sortTradeKimp: 0,
                        default: true,
                    })
                } else if (sort.sortTradePrice === 0) {
                    setSort({
                        sortTradeMoney: 0,
                        sortTradePrice: 1,
                        sortTradePercent: 0,
                        sortTradeKimp: 0,
                        default: false,
                    })
                } else if (sort.sortTradePrice === 1) {
                    setSort({
                        sortTradeMoney: 0,
                        sortTradePrice: 2,
                        sortTradePercent: 0,
                        sortTradeKimp: 0,
                        default: false,
                    })
                }
                break;

            case "percent":
                if (sort.sortTradePercent === 2) {
                    setSort({
                        sortTradeMoney: 0,
                        sortTradePrice: 0,
                        sortTradePercent: 0,
                        sortTradeKimp: 0,
                        default: true,
                    })
                } else if (sort.sortTradePercent === 0) {
                    setSort({
                        sortTradeMoney: 0,
                        sortTradePrice: 0,
                        sortTradePercent: 1,
                        sortTradeKimp: 0,
                        default: false,
                    })
                } else if (sort.sortTradePercent === 1) {
                    setSort({
                        sortTradeMoney: 0,
                        sortTradePrice: 0,
                        sortTradePercent: 2,
                        sortTradeKimp: 0,
                        default: false,
                    })
                }
                break;


            case "tradecost":
                if (sort.sortTradeMoney === 2) {
                    setSort({
                        sortTradeMoney: 0,
                        sortTradePrice: 0,
                        sortTradePercent: 0,
                        sortTradeKimp: 0,
                        default: true,
                    })
                } else if (sort.sortTradeMoney === 0) {
                    setSort({
                        sortTradeMoney: 1,
                        sortTradePrice: 0,
                        sortTradePercent: 0,
                        sortTradeKimp: 0,
                        default: false,
                    })
                } else if (sort.sortTradeMoney === 1) {
                    setSort({
                        sortTradeMoney: 2,
                        sortTradePrice: 0,
                        sortTradePercent: 0,
                        sortTradeKimp: 0,
                        default: false,
                    })
                }
                break;
            case "kimp":
                if (sort.sortTradeKimp === 2) {
                    setSort({
                        sortTradeMoney: 0,
                        sortTradePrice: 0,
                        sortTradePercent: 0,
                        sortTradeKimp: 0,
                        default: true,
                    })
                } else if (sort.sortTradeKimp === 0) {
                    setSort({
                        sortTradeMoney: 0,
                        sortTradePrice: 0,
                        sortTradePercent: 0,
                        sortTradeKimp: 1,
                        default: false,
                    })
                } else if (sort.sortTradeKimp === 1) {
                    setSort({
                        sortTradeMoney: 0,
                        sortTradePrice: 0,
                        sortTradePercent: 0,
                        sortTradeKimp: 2,
                        default: false,
                    })
                }
                break;
        }

    }

    // //검색 키워드 props
    // const setCrpytoSearch = (search: any) => {
    //     setSearchKeyword(search);
    // }

    const handleClickCategory = (e: any) => {
        // console.log("ezsdsds", e.target.key)
    }


    //업비트 전체 자산 정보 가져오기
    const getAllUpbitCryptoList = (callback: any) => {
        let allSymbol: any = []
        fetch("https://api.upbit.com/v1/market/all").then((response) => response.json()).then(result => {
            result.map((info: any) => {
                allSymbol.push(info.market);
            })
            return callback(result, allSymbol);
        })
    }


//업비트 전체 자산 정보 가져오기
    const getUsdtPrice = (callback: any) => {
        // let allSymbol: any = []
        // fetch("https://www.coinbase.com/graphql/query?&operationName=assetInfoQuery&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2244310d9858595955724c80df81269f4e6c9ae8c1e87a42245fe3da4386dc82b9%22%7D%7D&variables=%7B%22baseSymbol%22%3A%22USDT%22%2C%22targetCurrency%22%3A%22KRW%22%2C%22assetSearchString%22%3A%22%22%7D").then((response) => response.json()).then(result => {

        return callback(true);
        // })
    }


    const getBinanceUpbitCryptoInfo = async () => {
        return new Promise((resolve) => {
            let data: any = ["BTCUSDT", "MTLUSDT", "ETHUSDT", "NEOUSDT", "XRPUSDT", "ETCUSDT", "OMGUSDT",
                "WAVESUSDT", "XEMUSDT", "QTUMUSDT", "LSKUSDT", "STEEMUSDT", "XLMUSDT", "ARDRUSDT", "STORJUSDT",
                "REPUSDT", "ADAUSDT", "POWRUSDT", "BTGUSDT", "ICXUSDT", "EOSUSDT", "TRXUSDT", "SCUSDT", "ONTUSDT",
                "ZILUSDT", "POLYUSDT", "ZRXUSDT", "BCHUSDT", "BATUSDT", "IOSTUSDT", "CVCUSDT", "IOTAUSDT", "MFTUSDT",
                "ONGUSDT", "ELFUSDT", "KNCUSDT", "THETAUSDT", "BTTUSDT", "ENJUSDT", "TFUELUSDT", "MANAUSDT", "ANKRUSDT",
                "ATOMUSDT", "MBLUSDT", "WAXPUSDT", "HBARUSDT", "STPTUSDT", "VETUSDT", "CHZUSDT", "STMXUSDT", "HIVEUSDT",
                "KAVAUSDT", "LINKUSDT", "XTZUSDT", "JSTUSDT", "SXPUSDT", "PLAUSDT", "DOTUSDT", "SRMUSDT", "STRAXUSDT",
                "SANDUSDT", "DOGEUSDT", "PUNDIXUSDT", "XECUSDT", "FLOWUSDT", "AXSUSDT", "STXUSDT", "SOLUSDT", "NUUSDT",
                "MATICUSDT", "AAVEUSDT", "ALGOUSDT", "NEARUSDT", "1INCHUSDT", "AVAXUSDT", "TUSDT", "CELOUSDT",
                "GMTUSDT","LRCUSDT","CTXCUSDT","CHRUSDT","COSUSDT","ARPAUSDT",

                "CKBUSDT",
                "UNIUSDT",
                "YFIUSDT",
                "UMAUSDT",
                "COMPUSDT",
                "RENUSDT",
                "BALUSDT",
                "RSRUSDT",
                "NMRUSDT",
                "RLCUSDT",
                "BELUSDT",
                "GRTUSDT",
                "XNOUSDT",
                "SNXUSDT",
                "OXTUSDT",
                "LINAUSDT",
                "CTSIUSDT",
                "LPTUSDT",
                "MKRUSDT",
                "SUSHIUSDT",
                "FRONTUSDT",
                "OCEANUSDT",
                "ALICEUSDT"]
                // "OGNUSDT",
                // "COTIUSDT",
                // "CAKEUSDT",
                // "BNTUSDT",
                // "DAIUSDT",
                // "CTKUSDT",
                // "BNBUSDT",
                // "SOLUSDT",
                // "EGLDUSDT",
                // "GALAUSDT",
                // "JASMYUSDT",
                // "REQUSDT",
                // "KLAYUSDT",
                // "WOOUSDT",
                // "KSMUSDT",
                // "SUNUSDT",
                // "C98USDT",
                // "REIUSDT",
                // "TUSDT",
                // "GMTUSDT",
                // "XVSUSDT",
                //"ACHUSDT"]

            fetch(`https://www.binance.me/api/v3/ticker/price?symbols=${JSON.stringify(data)}`).then((response) => response.json()).then(result => {
                let data = result.data;
                let key: any;
                if (result) {
                    resolve(result)
                }
            })
        })
    }


    const getBinanceBithumbCryptoInfo = async (symbol: any) => {
        return new Promise((resolve) => {
            // symbol = symbol.replaceAll("_KRW", "");
            let data: any = [
                "ETHUSDT",
                "BTCUSDT",
                "ETCUSDT",
                "XRPUSDT",
                "BCHUSDT",
                "QTUMUSDT",
                "BTGUSDT",
                "EOSUSDT",
                "ICXUSDT",
                "TRXUSDT",
                "ELFUSDT",
                "OMGUSDT",
                "KNCUSDT",
                "ZILUSDT",
                "WAXPUSDT",
                "POWRUSDT",
                "LRCUSDT",
                "STEEMUSDT",
                "ZRXUSDT",
                "STRAXUSDT",
                "REPUSDT",
                "ADAUSDT",
                "CTXCUSDT",
                "BATUSDT",
                "THETAUSDT",
                "WAVESUSDT",
                "LINKUSDT",
                "ENJUSDT",
                "VETUSDT",
                "MTLUSDT",
                "IOSTUSDT",
                "TFUELUSDT",
                "ANKRUSDT",
                "CHRUSDT",
                "MBLUSDT",
                "SXPUSDT",
                "COSUSDT",
                "HIVEUSDT",
                "ARPAUSDT",
                "CKBUSDT",
                "SRMUSDT",
                "UNIUSDT",
                "YFIUSDT",
                "UMAUSDT",
                "AAVEUSDT",
                "COMPUSDT",
                "RENUSDT",
                "BALUSDT",
                "RSRUSDT",
                "NMRUSDT",
                "RLCUSDT",
                "SANDUSDT",
                "BELUSDT",
                "GRTUSDT",
                "XNOUSDT",
                "SNXUSDT",
                "OXTUSDT",
                "LINAUSDT",
                "PLAUSDT",
                "CTSIUSDT",
                "LPTUSDT",
                "MANAUSDT",
                "MKRUSDT",
                "SUSHIUSDT",
                "PUNDIXUSDT",
                "CELRUSDT",
                "FRONTUSDT",
                "OCEANUSDT",
                "ALICEUSDT",
                "OGNUSDT",
                "COTIUSDT",
                "CAKEUSDT",
                "BNTUSDT",
                "CHZUSDT",
                "AXSUSDT",
                "DAIUSDT",
                "ALGOUSDT",
                "JSTUSDT",
                "XTZUSDT",
                "DOTUSDT",
                "ATOMUSDT",
                "DOGEUSDT",
                "CTKUSDT",
                "BNBUSDT",
                "XECUSDT",
                "SOLUSDT",
                "EGLDUSDT",
                "1INCHUSDT",
                "GALAUSDT",
                "BTTUSDT",
                "JASMYUSDT",
                "REQUSDT",
                "AVAXUSDT",
                "ONGUSDT",
                "KLAYUSDT",
                "MATICUSDT",
                "WOOUSDT",
                "XLMUSDT",
                "ONTUSDT",
                "KSMUSDT",
                "SUNUSDT",
                "C98USDT",
                "REIUSDT",
                "TUSDT",
                "GMTUSDT",
                "XVSUSDT",
                "ACHUSDT"]
            fetch(`https://www.binance.me/api/v3/ticker/price?symbols=${JSON.stringify(data)}`).then((response) => response.json()).then(result => {
                let data = result.data;
                let key: any;
                if (result) {
                    resolve(result)
                }
            })
        })
    }


    const getAllBithumbKRWCryptoList = async (callback: any) => {
        let allSymbol: any = []
        let allData: any = [];
        fetch(`https://api.bithumb.com/public/ticker/ALL_KRW`).then((response) => response.json()).then(result => {
            let data = result.data;
            let key: any;
            for (key in data) {
                // console.log("eky",data[key])
                if (key !== "date") {
                    data[key]['market'] = "KRW-" + key;
                    data[key]['icon'] = `https://content.bithumb.com/resources/img/coin/coin-${md5(key)}.png`
                    data[key]['symbol'] = key + "_KRW";
                    data[key]['korean_name'] = getCryptoInfo(key).name;
                    data[key]['trade_price'] = Number(data[key].closing_price);
                    data[key]['acc_trade_price_24h'] = data[key].acc_trade_value_24H;
                    data[key]['signed_change_rate'] = Number(data[key].fluctate_rate_24H) / 100;
                    data[key]['ask_bid'] = Number(data[key].fluctate_rate_24H) > 0 ? "ASK" : "BID"
                    data[key]['change'] = Number(data[key].fluctate_rate_24H) > 0 ? "ASK" : "BID"
                    allSymbol.push(key + '_KRW')
                    allData.push(data[key]);
                }
            }

            console.log("allData", allData)
            return callback(allData, allSymbol);
        })
    }

    let krwMarketList: any = []
    let btcMarketList: any = []
    let interval: any;

    useEffect(() => {
        setLoading(true)
        getUsdtPrice((price: any) => {
            setUsdtPrice(1425.3)
        })


        setInterval(() => {
            getBinanceUpbitCryptoInfo().then((result: any) => {
                setBinanceInfo(result)
            })
        }, 1400)

        if (changeCurrent === "20") {
            //연결되있는 소켓 해제.

            getAllBithumbKRWCryptoList(async (coinItem: any, symbol: any) => {

                connectWS(symbol, "bithumb", (result: any) => {
                    result = JSON.parse(result);
                    // console.log("result",result)
                    if (result.content) {

                        // console.log("exchang",exchange)
                        setLoading(false)
                        // console.log("result.content.symbol",result.content)
                        let findIndex = coinItem.findIndex((data: any) => data.symbol === result.content.symbol)
                        let copyArray: any = [...coinItem];

                        if (findIndex !== -1) {
                            let target = copyArray[findIndex];
                            //현재 가격
                            target.trade_price = Number(result.content.closePrice);
                            // target.korean_name = result.market;
                            //등락률
                            target.signed_change_rate = Number(result.content.chgRate) / 100;
                            //24시간 거래량
                            target.acc_trade_price_24h = result.content.value;
                            //단기 상승 하락
                            target.ask_bid = result.content.chgRate > 0 ? "ASK" : "BID";
                            //금일 상승 하락
                            target.change = result.content.chgRate > 0 ? "ASK" : "BID";
                            target.updateIndex = result.code;
                            copyArray[findIndex] = target;
                            // console.log("copyArray", copyArray)
                            setItem(copyArray)
                        } else {

                        }
                    }
                })
            })
        } else if (changeCurrent === "10") {
            let binanceSymbol: any = [];


            getAllUpbitCryptoList(async (coinItem: any, symbol: any) => {

                //모든 심볼 기준 restApi 요청해서 테이블 세팅 시키기
                fetch(`https://api.upbit.com/v1/ticker?markets=${symbol}`).then((response) => response.json()).then(async result => {

                    result.map((item: any, index: any) => {
                        //원화 usdt btc 구분해서 push
                        if (result[index].market.indexOf("KRW-") !== -1) {
                            let initData = result[index]["market"].replace("KRW-", "")
                            binanceSymbol.push((initData + "USDT").toUpperCase())
                            result[index]["icon"] = `https://static.upbit.com/logos/${result[index].market.replace("KRW-", "")}.png`
                        }
                        if (result[index].market.indexOf("BTC-") !== -1) {
                            result[index]["icon"] = `https://static.upbit.com/logos/${result[index].market.replace("BTC-", "")}.png`
                        }
                        krwMarketList.push(Object.assign(result[index], coinItem[index]))
                        // }
                    })

                    setLoading(false)

                    connectWS(symbol, "upbit", (result: any) => {
                        if (result) {
                            let requestList = []
                            setUpdateItem(result);

                            let findIndex = krwMarketList.findIndex((data: any) => data.market === result.code)
                            let copyArray: any = [...krwMarketList];
                            // console.log("bibbb",binanceInfo)
                            //
                            if (findIndex !== -1) {
                                let target = copyArray[findIndex];
                                //현재 가격
                                target.trade_price = result.trade_price;
                                //등락률
                                target.signed_change_rate = result.signed_change_rate;
                                //24시간 거래량
                                target.acc_trade_price_24h = result.acc_trade_price_24h;
                                //단기 상승 하락
                                target.ask_bid = result.ask_bid;
                                //금일 상승 하락
                                target.change = result.change;
                                target.updateIndex = result.code;
                                target.socketType = "upbit";
                                copyArray[findIndex] = target;
                                setItem(copyArray)
                            }
                        }
                    })
                })
            });
        }

    }, [changeCurrent])


    return (
        <main>
            <div className="content-view">
                <div className="exchange-view">
                    <table className="exchange-public-table">
                        <thead>
                        <tr>
                            <th className="defalut_th"></th>
                            <th className="title">
                                가상자산명
                                <div className="table_sort_btn_group">
                                    {/*<img className="table_sort_up"/>*/}
                                    {/*<img className="table_sort_down"/>*/}
                                </div>
                            </th>
                            <th className="price" onClick={handleSortTable}>현재가
                                <div className="table_sort_btn_group">
                                    <img
                                        className={sort.sortTradePrice !== 1 ? "table_sort_up" : "table_select_sort_up"}/>
                                    <img
                                        className={sort.sortTradePrice !== 2 ? "table_sort_down" : "table_select_sort_down"}/>
                                </div>
                            </th>
                            <th className="percent" onClick={handleSortTable}>전일대비
                                <div className="table_sort_btn_group">
                                    <img
                                        className={sort.sortTradePercent !== 1 ? "table_sort_up" : "table_select_sort_up"}/>
                                    <img
                                        className={sort.sortTradePercent !== 2 ? "table_sort_down" : "table_select_sort_down"}/>
                                </div>
                            </th>
                            <th className="kimp" onClick={handleSortTable}>프리미엄
                                {/*<div className="table_sort_btn_group">*/}
                                {/*    <img*/}
                                {/*        className={sort.sortTradeKimp !== 1 ? "table_sort_up" : "table_select_sort_up"}/>*/}
                                {/*    <img*/}
                                {/*        className={sort.sortTradeKimp !== 2 ? "table_sort_down" : "table_select_sort_down"}/>*/}
                                {/*</div>*/}
                            </th>
                            <th className="tradecost" onClick={handleSortTable}>거래대금
                                <div className="table_sort_btn_group">
                                    <img
                                        className={sort.sortTradeMoney !== 1 ? "table_sort_up" : "table_select_sort_up"}/>
                                    <img
                                        className={sort.sortTradeMoney !== 2 ? "table_sort_down" : "table_select_sort_down"}/>
                                </div>
                            </th>
                        </tr>
                        </thead>
                    </table>

                    <Swiper
                        // slidesPerView={1}
                        // spaceBetween={30}
                        touchRatio={0}
                        speed={200}
                        // initialSlide = {0}
                        initialSlide={sessionStorage.getItem("current_category") ? Number(sessionStorage.getItem("current_category")) : selectCategory}
                        onSlideChange={(swiper: any) => {
                            sessionStorage.setItem("current_category", swiper.activeIndex)
                            setSelectCategory(swiper.activeIndex);
                        }}
                        pagination={{
                            clickable: true,
                            renderBullet: function (index, className) {

                                if (index === 3) {
                                    return '<span class="' + className + '"><strong>트렌드</strong></span>';
                                } else {
                                    return '<span class="' + className + '"><strong>시세</strong></span>';
                                }
                            },
                        }}

                        modules={[Pagination]}
                        className="mySwiper"

                    >
                        <SwiperSlide key="KRW_Makret" onClick={handleClickCategory}><Market_KRW sort={sort}
                                                                                                coinList={item}
                                                                                                updateItem={updateItem}
                                                                                                binanceItem={binanceInfo}
                                                                                                loading={loading}
                                                                                                search={search}/></SwiperSlide>
                        <SwiperSlide><Market_BTC sort={sort} coinList={item} updateItem={updateItem}
                                                 search={search}/></SwiperSlide>
                        <SwiperSlide><Market_BookMark sort={sort} coinList={item} updateItem={updateItem}
                                                      search={search}/></SwiperSlide>
                        {/*<SwiperSlide><Premium/></SwiperSlide>*/}
                        {/*<SwiperSlide><Premium/></SwiperSlide>*/}
                    </Swiper>
                </div>
            </div>
        </main>

    );
}

export default Content;


// let azzz : any =[]
// for await (const symbol of binanceSymbol) {
// getBinanceCryptoInfo(symbol).then((result:any) => {
//     console.log("result",result)
//  azzz.push(result)
// })
// }