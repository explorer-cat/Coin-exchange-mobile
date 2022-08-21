// import '../../../stylesheets/initialization.css'
// import '../../../stylesheets/palette.css'
import React, {useEffect, useState, useRef} from 'react';
import '../../../stylesheets/initialization.css'
import '../../../stylesheets/palette.css'
import '../../../stylesheets/public.css'
import './DetailView.css'
import DetailHeader from "./DetailHeader";
import CrpytoChart from "./CrpytoChart";
import {useLocation} from "react-router-dom";
interface DetailViewType {
    socket:any,
}

//pair : ExchangeMarket_KRW_Type
function DetailView({socket} :DetailViewType): React.ReactElement {
    // console.log("render",socket)




    return (
        <header className = "DetailView_Content">
            <div className = "DetailHeader">
                <DetailHeader />
            </div>

            <div className = "miniChart">
                <CrpytoChart  socket = {socket}/>
            </div>

            <div className = "crytoInfo">
                THIS IS INFO
            </div>
        </header>

    )

}


export default DetailView;
