import '../../../../stylesheets/initialization.css'
import '../../../../stylesheets/palette.css'
import '../../../../stylesheets/public.css'
import './DetailContent.css'
// import './InvestmentInfo.css'
import '../DetailView.css'
import './CryptoInfo.css'
import './DailyCandleTable.css'
import '../DetailHeader.css'
import CategoryToggle from './ContentCategoryToggle'
import React, {useEffect, useState, useCallback} from 'react';
import {useLocation} from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface DailyCandleTableType {
    props: any,
}


function DailyCandleTable({props}: DailyCandleTableType): React.ReactElement {
    const [loading, setLoading] = useState(false)

    const location = useLocation().search
    let tradeCode = location.replace("?", "")
    const [detailToggle, setDetailToggle] = useState(false)


    const closeDetailView = () => {
        let target = document.querySelector(".DailyInfoArea");
        let toggleBtn = document.querySelector(".MuiTabs-root");

        if(target && toggleBtn) {
            target.classList.remove("setDetailPageCandle");
            toggleBtn.classList.remove("display_none");
            setDetailToggle(false)
        }
    }

    const handleViewDetailInfo = () => {
        let target = document.querySelector(".DailyInfoArea");
        let viewBtn = document.querySelector(".DailyInfoArea .detailMore");
        let toggleBtn = document.querySelector(".MuiTabs-root");

        if(target && viewBtn && toggleBtn) {
            target.classList.add("setDetailPageCandle");
            toggleBtn.classList.add("display_none");

            setDetailToggle(true)
        }
    }


    function createData(
        date: string,
        price: number,
        percent: number,
        volume: any,
    ) {
        return {date, price, percent, volume};
    }


    // let rows = [];
    //
    // for (let i = 0; i < 7; i++) {
    //     createData(data[i].tradeDate, data[i].tradePrice,data[i].tradePrice - data[i].prevClosingPrice , data[i].accTradeVolume)
    // }
    //


    useEffect(() => {
        if (props.tickerinfo) {
            setLoading(true)
        }
    }, [props])


    if (loading) {
        let rows : any = []
        if(!detailToggle) {
            rows = [
                createData(props.tickerinfo[0].tradeDate, props.tickerinfo[0].tradePrice, (props.tickerinfo[0].tradePrice - props.tickerinfo[0].prevClosingPrice) / props.tickerinfo[0].prevClosingPrice * 100 , props.tickerinfo[0].accTradeVolume),
                createData(props.tickerinfo[1].tradeDate, props.tickerinfo[1].tradePrice, (props.tickerinfo[1].tradePrice - props.tickerinfo[1].prevClosingPrice) / props.tickerinfo[1].prevClosingPrice * 100 , props.tickerinfo[1].accTradeVolume),
                createData(props.tickerinfo[2].tradeDate, props.tickerinfo[2].tradePrice, (props.tickerinfo[2].tradePrice - props.tickerinfo[2].prevClosingPrice) / props.tickerinfo[2].prevClosingPrice * 100 , props.tickerinfo[2].accTradeVolume),
                createData(props.tickerinfo[3].tradeDate, props.tickerinfo[3].tradePrice, (props.tickerinfo[3].tradePrice - props.tickerinfo[3].prevClosingPrice) / props.tickerinfo[3].prevClosingPrice * 100 , props.tickerinfo[3].accTradeVolume),
                createData(props.tickerinfo[4].tradeDate, props.tickerinfo[4].tradePrice, (props.tickerinfo[4].tradePrice - props.tickerinfo[4].prevClosingPrice) / props.tickerinfo[4].prevClosingPrice * 100 ,props.tickerinfo[4].accTradeVolume),
                createData(props.tickerinfo[5].tradeDate, props.tickerinfo[5].tradePrice, (props.tickerinfo[5].tradePrice - props.tickerinfo[5].prevClosingPrice) / props.tickerinfo[5].prevClosingPrice * 100 , props.tickerinfo[5].accTradeVolume),
            ];
        } else {
            for(let i = 0; i < props.tickerinfo.length; i++) {
                rows.push(createData(props.tickerinfo[i].tradeDate, props.tickerinfo[i].tradePrice, (props.tickerinfo[i].tradePrice - props.tickerinfo[i].prevClosingPrice) / props.tickerinfo[i].prevClosingPrice * 100 , props.tickerinfo[i].accTradeVolume));
            }
            // rows = [
            //
            //     createData(props.tickerinfo[1].tradeDate, props.tickerinfo[1].tradePrice, (props.tickerinfo[1].tradePrice - props.tickerinfo[1].prevClosingPrice) / props.tickerinfo[1].prevClosingPrice * 100 , props.tickerinfo[1].accTradeVolume),
            //     createData(props.tickerinfo[2].tradeDate, props.tickerinfo[2].tradePrice, (props.tickerinfo[2].tradePrice - props.tickerinfo[2].prevClosingPrice) / props.tickerinfo[2].prevClosingPrice * 100 , props.tickerinfo[2].accTradeVolume),
            //     createData(props.tickerinfo[3].tradeDate, props.tickerinfo[3].tradePrice, (props.tickerinfo[3].tradePrice - props.tickerinfo[3].prevClosingPrice) / props.tickerinfo[3].prevClosingPrice * 100 , props.tickerinfo[3].accTradeVolume),
            //     createData(props.tickerinfo[4].tradeDate, props.tickerinfo[4].tradePrice, (props.tickerinfo[4].tradePrice - props.tickerinfo[4].prevClosingPrice) / props.tickerinfo[4].prevClosingPrice * 100 ,props.tickerinfo[4].accTradeVolume),
            //     createData(props.tickerinfo[5].tradeDate, props.tickerinfo[5].tradePrice, (props.tickerinfo[5].tradePrice - props.tickerinfo[5].prevClosingPrice) / props.tickerinfo[5].prevClosingPrice * 100 , props.tickerinfo[5].accTradeVolume),
            // ];
        }
        return (
            <>
                <div className="DailyInfoArea">
                    {detailToggle ?
                        <div className = "detailMoreViewHeader"
                             style={{
                                 paddingLeft: "0px"
                             }}>
                         <div className="backToHome">
                                <img className="arrow_back" onClick={closeDetailView}/>
                            </div>
                        </div> : null}
                    <div className="content-title">
                        자산 시세
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 200}} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>일자</TableCell>
                                    <TableCell align="right">종가</TableCell>
                                    <TableCell align="right">전일대비</TableCell>
                                    <TableCell align="right">거래량</TableCell>
                                    {/*<TableCell align="right">Protein&nbsp;(g)</TableCell>*/}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row: any) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.date.replace("2022-","")}
                                        </TableCell>
                                        <TableCell align="right">{row.price.toLocaleString()}</TableCell>
                                        <TableCell align="right">{row.percent.toFixed(2)}%</TableCell>
                                        <TableCell align="right">{Number(row.volume.toFixed(0)).toLocaleString()}</TableCell>
                                        {/*<TableCell align="right">{row.protein}</TableCell>*/}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {!detailToggle ?  <div className = "detailMore" onClick={handleViewDetailInfo}>더보기</div> : null}
                </div>
            </>
        );
    } else {
        return (<></>)
    }
}


export default DailyCandleTable;

