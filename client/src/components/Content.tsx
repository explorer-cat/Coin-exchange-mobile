import React, {useEffect, useState, useCallback} from 'react';
import Premium from './premium/Premium';
import "./Content.css"
import "./exchange/Search.css"
import MarketCategory from './MarketCategory';
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import {Pagination} from "swiper";
// import Market_BTC from "./Market_BTC";
import {connectWS} from "../dataHandler/socket";
import Market_KRW from "./exchange/Market_KRW";
import Market_BTC from "./exchange/Market_BTC";
import Search from "./exchange/Search";

interface ContentViewType {
    coinList: any,
}


function Content(): React.ReactElement {
    const [item, setItem] = useState([]);
    const [updateItem,setUpdateItem] = useState();
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleTableSort = (e: React.MouseEvent) => {

    }

    //검색 키워드 props
    const setCrpytoSearch = (e:any) => {
        setSearchKeyword(searchKeyword);
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

    let krwMarketList: any = []
    let btcMarketList: any = []

    useEffect(() => {
        //업비트 전체 정보를 불러옵니다.
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
                connectWS(symbol, (result: any) => {
                    // console.log("result",result)
                    if(result) {
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
                // setItem(krwMarketList)
            })
        });
    }, [])

    return (
        <main>
            {/* 카테고리 */}
            <div className="category-view">
                <MarketCategory/>
            </div>
            <div className="exchange-search">
                <Search inputValue = {setCrpytoSearch} />
            </div>
            <div className="content-view">
                <div className="exchange-view">
                    <table className="exchange-public-table">
                        <thead>
                        <tr>
                            <th className="defalut_th"></th>
                            <th className="title" onClick={handleTableSort}>
                                가상자산명
                                <div className="table_sort_btn_group">
                                    <img className="table_sort_up"/>
                                    <img className="table_sort_down"/>
                                </div>
                            </th>
                            <th className="price" onClick={handleTableSort}>현재가
                                <div className="table_sort_btn_group">
                                    <img className="table_sort_up"/>
                                    <img className="table_sort_down"/>
                                </div>
                            </th>
                            <th className="percent" onClick={handleTableSort}>전일대비
                                <div className="table_sort_btn_group">
                                    <img className="table_sort_up"/>
                                    <img className="table_sort_down"/>
                                </div>
                            </th>
                            <th className="tradecost" onClick={handleTableSort}>거래대금
                                <div className="table_sort_btn_group">
                                    <img className="table_sort_up"/>
                                    <img className="table_sort_down"/>
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
                        pagination={{
                            clickable: true,
                            renderBullet: function (index, className) {
                                console.log("index", index)
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
                        <SwiperSlide><Market_KRW coinList={item} updateItem = {updateItem} search = {searchKeyword}/></SwiperSlide>
                        <SwiperSlide><Market_BTC coinList={item} updateItem = {updateItem} search = {searchKeyword}/></SwiperSlide>
                        <SwiperSlide><Premium/></SwiperSlide>
                        <SwiperSlide><Premium/></SwiperSlide>
                        <SwiperSlide><Premium/></SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </main>

    );
}

export default Content;

