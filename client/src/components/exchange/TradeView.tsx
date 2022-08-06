// import 'TradeView.css'
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState, useRef} from 'react';
import Header from '../header/Header';
import { Skeleton } from '@mui/material';



interface TradeViewType {
    component : any,
}


//pair : ExchangeMarket_KRW_Type
function TradeView({component}:TradeViewType): React.ReactElement {
    const loadingBg : String = "rgba(255, 255, 255, 0.13)";
    return (<div>dfdf</div>)
}


export default TradeView;
