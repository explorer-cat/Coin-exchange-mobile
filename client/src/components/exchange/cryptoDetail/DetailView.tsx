// import '../../../stylesheets/initialization.css'
// import '../../../stylesheets/palette.css'
import React, {useEffect, useState, useRef} from 'react';
import '../../../stylesheets/initialization.css'
import '../../../stylesheets/palette.css'
import '../../../stylesheets/public.css'
import './DetailView.css'
import DetailHeader from "./DetailHeader";
import CrpytoChart from "./CrpytoChart";
import ChartOption from "./ChartOption"
import DetailContent from "./content/DetailContent";
import CrpytoInfoTable from "./CrpytoInfoTable";
import {useLocation} from "react-router-dom";
import {closeWS, getSocket} from "../../../dataHandler/socket";


//pair : ExchangeMarket_KRW_Type
function DetailView(): React.ReactElement {
    // console.log("render",socket)

    useEffect(() => {
        closeWS()
    },[])

    const [loading, setLoading] = useState(false);
    const [pageCrpytoInfo, setPageCrpytoInfo] = useState(null);

    const changeLoading = (loadingProps:boolean) => {
        setLoading(loadingProps)
    }

    const changeCrpytoInfo = (props:any) => {
        setPageCrpytoInfo(props)
    }

    // useEffect(() => {
    // },[pageCrpytoInfo])

    /* 현재 접속한 페이지의 코인 이름을 가져옵니다.*/


    const [chartOption, setChartOption] = useState({
        type : "24hour",
        minute : "30",
        candleCount : "200"
    })

    const changeChartOption = (type:string) => {
        console.log("type",type)
        switch(type) {
            case "1hour":
                setChartOption({
                    type : type,
                    minute: "5",
                    candleCount : "200"
                })
                break;
            case "4hour":
                setChartOption({
                    type : type,
                    minute: "15",
                    candleCount : "200"
                })
                break;
            case "24hour":
                setChartOption({
                    type : type,
                    minute: "30",
                    candleCount : "200"
                })
                break;
            case "7day":
                setChartOption({
                    type : type,
                    minute: "60",
                    candleCount : "200"
                })
                break;
            case "30day":
                setChartOption({
                    type : type,
                    minute: "240",
                    candleCount : "200"
                })
                break;
        }
        // setChartOption(type)

    }


    return (
        <header className = "DetailView_Content">
            <div className = "DetailHeader">
                <DetailHeader loadingFuc = {changeLoading} crpytoInfo = {changeCrpytoInfo}/>
            </div>

            <div className = "miniChart">
                <CrpytoChart  chartViewOption = {chartOption} crpytoInfo = {pageCrpytoInfo}/>
            </div>

            <div className = "ChartOptionArea">
                <ChartOption changeChartOption = {changeChartOption} loading = {loading} />
            </div>

            <div className = "cryptoContent">
                <DetailContent />
            </div>
        </header>

    )

}


export default DetailView;
