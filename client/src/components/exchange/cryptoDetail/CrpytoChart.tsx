import './CrpytoChart.css'
import '../../../stylesheets/initialization.css'
import '../../../stylesheets/palette.css'
import React, {useEffect, useState, useRef} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {useLocation} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface CryptoChartType {
    chartViewOption : any,
}


let chartLoading = {
    width : "100%",
    height : "270px"
}




//pair : ExchangeMarket_KRW_Type
function CryptoChart({chartViewOption}: CryptoChartType): React.ReactElement {
    const [loading,setLoading] = useState(false)
    const [options,setOption] = useState({})
    const [theme, setTheme] = useState(localStorage.getItem("theme"))

    console.log("chartViewOption",chartViewOption)

    const location = useLocation().search
    let tradeCode = location.replace("?", "")

    let min: Number = 0;
    let max: Number = 0;
    let priceData: any = [];
    let low_price: any = []
    let high_price: any = []


    //24시간 차트
    const getLineChartInfo = () => {
        let allSymbol: any = []
        let minute : String;
        let count : String;

        minute = chartViewOption.minute
        count = chartViewOption.candleCount


        fetch(`https://api.upbit.com/v1/candles/minutes/${minute}?market=${tradeCode}&count=${count}`).then((response) => response.json()).then(result => {


            result.map((info: any) => {
                //최저가와 최저가를 찾아보자
                low_price.unshift(info.low_price)
                high_price.unshift(info.high_price)
                priceData.unshift(info.opening_price);
            })

            min = Math.min.apply(null, low_price)
            max = Math.max.apply(null, high_price)
            //옵션 세팅
            setOption({
                exporting: {
                    enabled: false
                },
                chart: {
                    type: 'area',
                    zoomType: 'x',
                    panning: true,
                    panKey: 'shift',
                    margin: [0, 0, 0, 0],
                    width: 400,
                    height:250,
                    backgroundColor: theme === "light" ? "#ffffff" : "#15181a",
                    scrollablePlotArea: {
                        minWidth: 10
                    }
                },

                title: {
                    text: ''
                },

                credits: {
                    enabled: false
                },
                xAxis: {
                    categories: 1,
                    //tickPositions: [0,1,2,3,4,5,6,7],
                    visible: false,
                },

                yAxis: {
                    min: min,
                    max: max,
                    startOnTick: true,
                    endOnTick: true,
                    // maxPadding: 0.35,
                    title: {
                        text: null
                    },
                    labels: {
                        format: '{value} m'
                    },
                    visible: false
                },

                legend: {
                    enabled: false
                },

                tooltip: {
                    enabled: false,
                    formatter: function () {
                        // return `<b>${this.x}</b><br>${numberToKorean(this.y)}원`
                        return <b>11</b>
                    },
                    shared: true
                },
                series: [{
                    data: priceData,
                    lineColor: theme === "light" ? "#C0C0C0" : "rgb(255, 108, 71)",
                    color: theme === "light" ? "#ffffff" : "#15181a",
                    // fillOpacity: 0.2,
                    name: '종가',
                }]
            })
        })
    }


    //옵션이 변경되었다면 로딩창 제거
    useEffect(() => {
        if(options.hasOwnProperty("chart")) {
            //차트 생성 요청 한 뒤에 0.3초에 한번씩 차트가 그려졌는지 체크해서 로딩창 유지할지 결정함
            setLoading(true)
        }
    },[options])

    //차트 세팅 시작!
    useEffect( () => {
         getLineChartInfo()
    }, [chartViewOption])


    if(!loading) {
        return (<div>
            <Box sx={{ display: 'flex', width: '100%',  height : '270px', justifyContent: "center", alignItems : "center"}}>
                <CircularProgress />
            </Box>
        </div>)
    } else {
        return (<div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />

        </div>)
    }
}


export default CryptoChart;
