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
import CrpytoInfoTable from "./CrpytoInfoTable";
import {useLocation} from "react-router-dom";
import {closeWS, getSocket} from "../../../dataHandler/socket";


//pair : ExchangeMarket_KRW_Type
function DetailView(): React.ReactElement {
    // console.log("render",socket)

    useEffect(() => {
        closeWS()
    },[])

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
                <DetailHeader />
            </div>

            <div className = "ChartOptionArea">
                <ChartOption changeChartOption = {changeChartOption} />
            </div>

            <div className = "miniChart">
                <CrpytoChart  chartViewOption = {chartOption}/>
            </div>

            <div className = "crytoInfo">
                <CrpytoInfoTable />
            </div>
        </header>

    )

}


export default DetailView;
