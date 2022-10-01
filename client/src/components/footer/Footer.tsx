import './Footer.css';
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, { useEffect } from 'react';
import exchange_select from '../../images/exchange_icon_select.png'
import exchange from '../../images/exchange_icon.png'

import myWallect_select from '../../images/my_wallet_icon_select.png'
import myWallet from '../../images/my_wallet_icon.png'

import news_select from '../../images/news_icon_select.png'
import news from '../../images/news_icon.png'

import nft_select from '../../images/nft_icon_select.png'
import nft from '../../images/nft_icon.png'
import upbitIcon from '../../images/upbit_logo.svg'
import bithumbIcon from '../../images/bithumb_icon.png'
import setting_select from '../../images/setting_icon_select.png'
import setting from '../../images/setting_icon.png'
// import myWallet from '../../../public/images/my_wallet_icon.png'
// import nft from '../../../public/images/nft_icon.png'
// import setting from '../../../public/images/setting_icon.png'
// import trend from '../../../public/images/trend_icon.png'

//Header 컴포넌트 메게변수 타입을 직접 선언합니다.
interface FooterType {
    exchangeFuc : any,
}

function Footer({exchangeFuc} : FooterType):React.ReactElement {

    const upbitStyle = {
        width : "45px",
        height: "18px",
        margin: "0 0 6px 0",
    }
    const bithumbStyle = {
        width : "65px",
        height: "18px",
        margin: "0 0 6px 0",
    }

    const changeExchange = (e:any) =>{
        exchangeFuc(e.target)
    }

    return (
      <footer>
          <div className = "bottom_menu-content">
            <div className = "exchange_div">
                <button className = "footer_select" id = "upbit" onClick={changeExchange}><img src = {upbitIcon} style={upbitStyle}/>업비트</button>
            </div>
            <div>
                <button className = "my-wallet" id = "bithumb" onClick={changeExchange}><img src = {bithumbIcon} style={bithumbStyle}/>빗썸</button>
            </div>
            <div>
                <button className = "test">코인원</button>
            </div>
            <div>
                <button className = "test">바이낸스</button>
            </div>
            <div>
                <button className = "test2">내정보</button>
            </div>
          </div>
      </footer>
    );
}

export default Footer;
