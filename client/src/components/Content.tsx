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
import {closeWS, connectWS} from "../dataHandler/socket";
import Market_KRW from "./exchange/Market_KRW";
import Market_BTC from "./exchange/Market_BTC";
import Market_BookMark from "./exchange/Market_BookMark";
import Search from "./exchange/Search";
import md5 from "md5";

interface ContentViewType {
    exchange: any,
}


function Content({exchange}: ContentViewType): React.ReactElement {
    const [item, setItem] = useState([]);
    const [updateItem, setUpdateItem] = useState();
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectCategory, setSelectCategory] = useState(0)
    const [sort, setSort] = useState({
        sortTradeMoney: 0, //기본 정렬 거래대금순
        sortTradePrice: 0,
        sortTradePercent: 0,
        default: true,
    });

    const handleSortTable = (e: any) => {
        switch (e.target.className) {
            case "price":
                if (sort.sortTradePrice === 2) {
                    setSort({
                        sortTradeMoney: 0,
                        sortTradePrice: 0,
                        sortTradePercent: 0,
                        default: true,
                    })
                } else if (sort.sortTradePrice === 0) {
                    setSort({
                        sortTradeMoney: 0,
                        sortTradePrice: 1,
                        sortTradePercent: 0,
                        default: false,
                    })
                } else if (sort.sortTradePrice === 1) {
                    setSort({
                        sortTradeMoney: 0,
                        sortTradePrice: 2,
                        sortTradePercent: 0,
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
                        default: true,
                    })
                } else if (sort.sortTradePercent === 0) {
                    setSort({
                        sortTradeMoney: 0,
                        sortTradePrice: 0,
                        sortTradePercent: 1,
                        default: false,
                    })
                } else if (sort.sortTradePercent === 1) {
                    setSort({
                        sortTradeMoney: 0,
                        sortTradePrice: 0,
                        sortTradePercent: 2,
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
                        default: true,
                    })
                } else if (sort.sortTradeMoney === 0) {
                    setSort({
                        sortTradeMoney: 1,
                        sortTradePrice: 0,
                        sortTradePercent: 0,
                        default: false,
                    })
                } else if (sort.sortTradeMoney === 1) {
                    setSort({
                        sortTradeMoney: 2,
                        sortTradePrice: 0,
                        sortTradePercent: 0,
                        default: false,
                    })
                }
                break;
        }

    }

    //검색 키워드 props
    const setCrpytoSearch = (search: any) => {
        setSearchKeyword(search);
    }

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

    const getAllBithumbKRWCryptoList = async (callback: any) => {
        let allSymbol: any = []
        let allData : any = [];
        fetch(`https://api.bithumb.com/public/ticker/ALL_KRW`).then((response) => response.json()).then(result => {
            let data = result.data;
            let key: any;
            for (key in data) {
                console.log("eky",data[key])
                if (key !== "date") {
                    data[key]['market'] = "KRW-"+key;
                    data[key]['icon'] = `https://content.bithumb.com/resources/img/coin/coin-${md5(key)}.png`
                    data[key]['symbol'] = key+"_KRW";
                    data[key]['korean_name'] = getCryptoInfo(key).name;
                    data[key]['trade_price'] = Number(data[key].closing_price);
                    data[key]['acc_trade_price_24h'] = data[key].acc_trade_value_24H;
                    data[key]['signed_change_rate'] = Number(data[key].fluctate_rate_24H) / 100;
                    data[key]['ask_bid'] = Number(data[key].fluctate_rate_24H) > 0 ? "ASK" : "BID"
                    data[key]['change'] = Number(data[key].fluctate_rate_24H) > 0 ? "ASK" : "BID"
                    allSymbol.push(key+'_KRW')
                    allData.push(data[key]);
                }
            }

            console.log("allData",allData)
            return callback(allData, allSymbol);
        })
    }

    let krwMarketList: any = []
    let btcMarketList: any = []

    useEffect(() => {
        if (exchange === "bithumb") {
            //연결되있는 소켓 해제.
            getAllBithumbKRWCryptoList((coinItem: any, symbol: any) => {

                connectWS(symbol, "bithumb", (result: any) => {
                    result = JSON.parse(result);
                    if(result.content) {
                        // console.log("result.content.symbol",result.content)
                        let findIndex = coinItem.findIndex((data: any) => data.symbol === result.content.symbol)
                        let copyArray: any = [...coinItem];

                         // console.log("result", result)
                        // console.log("findIndex",findIndex)
                        // console.log("result.content.chgRate",result.content.chgRate)
                        console.log("result.content",result.content)
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
                            console.log("copyArray", copyArray)
                            setItem(copyArray)
                        } else {

                        }
                    }
                })
            })
        } else {
            getAllUpbitCryptoList((coinItem: any, symbol: any) => {
                //모든 심볼 기준 restApi 요청해서 테이블 세팅 시키기
                fetch(`https://api.upbit.com/v1/ticker?markets=${symbol}`).then((response) => response.json()).then(result => {

                    result.map((item: any, index: any) => {
                        //원화 usdt btc 구분해서 push
                        if (result[index].market.indexOf("KRW-") !== -1) {
                            result[index]["icon"] = `https://static.upbit.com/logos/${result[index].market.replace("KRW-", "")}.png`
                        }
                        if (result[index].market.indexOf("BTC-") !== -1) {
                            result[index]["icon"] = `https://static.upbit.com/logos/${result[index].market.replace("BTC-", "")}.png`
                        }
                        krwMarketList.push(Object.assign(result[index], coinItem[index]))
                        // }
                    })

                    connectWS(symbol, "upbit" ,(result: any) => {
                         // console.log("result",result)
                        if (result) {
                            setUpdateItem(result);

                            let findIndex = krwMarketList.findIndex((data: any) => data.market === result.code)
                            let copyArray: any = [...krwMarketList];

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
                                copyArray[findIndex] = target;
                                setItem(copyArray)
                            }
                        }
                    })
                })
            });
        }

    }, [exchange])

    return (
        <main>
            {/* 카테고리 */}
            <div className="category-view">
                <MarketCategory/>
            </div>
            <div className="exchange-search">
                <Search inputValue={setCrpytoSearch}/>
            </div>
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
                            <th className="premium" onClick={handleSortTable}>김프
                                <div className="table_sort_btn_group">
                                    <img
                                        className={sort.sortTradePercent !== 1 ? "table_sort_up" : "table_select_sort_up"}/>
                                    <img
                                        className={sort.sortTradePercent !== 2 ? "table_sort_down" : "table_select_sort_down"}/>
                                </div>
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
                                                                                                search={searchKeyword}/></SwiperSlide>
                        <SwiperSlide><Market_BTC sort={sort} coinList={item} updateItem={updateItem}
                                                 search={searchKeyword}/></SwiperSlide>
                        <SwiperSlide><Market_BookMark sort={sort} coinList={item} updateItem={updateItem}
                                                      search={searchKeyword}/></SwiperSlide>
                        {/*<SwiperSlide><Premium/></SwiperSlide>*/}
                        {/*<SwiperSlide><Premium/></SwiperSlide>*/}
                    </Swiper>
                </div>
            </div>
        </main>

    );
}

export default Content;

