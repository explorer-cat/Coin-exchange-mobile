import './Exchange.css';
import './Market_KRW.css'
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, {useEffect, useState} from 'react';
import connectWS from "../../dataHandler/socket";




function CoinItem(): React.ReactElement {
    
    let dom : Object = []

    useEffect(()=>{
        console.log("렌더링 되었습니다.")
        // if(info.code === info.pair.socketInfo.pair) {
        //     console.log("gdgd")
        // }
       });

    //{info.pair.socketInfo.price}
    return (<td className="price">dfd</td>);


}

export default CoinItem;
