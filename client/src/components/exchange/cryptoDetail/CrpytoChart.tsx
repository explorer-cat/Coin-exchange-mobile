import './CrpytoChart.css'
import '../../../stylesheets/initialization.css'
import '../../../stylesheets/palette.css'
import React, {useEffect, useState, useRef} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {useLocation} from "react-router-dom";


interface CryptoChartType {
    chartViewOption : any,
}


//pair : ExchangeMarket_KRW_Type
function CryptoChart({chartViewOption}: CryptoChartType): React.ReactElement {
    const [options,setOption] = useState({})

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
                    height:250,
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
                    lineColor: "#C0C0C0",
                    color: "#E0E0E0",
                    fillOpacity: 0.2,
                    name: '종가',
                }]
            })

        })
    }

    useEffect(() => {
        console.log("render")
        getLineChartInfo()
    }, [chartViewOption])


        return (<div>


            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />

        </div>)


}


export default CryptoChart;
