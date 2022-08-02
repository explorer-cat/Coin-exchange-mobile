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

import setting_select from '../../images/setting_icon_select.png'
import setting from '../../images/setting_icon.png'
// import myWallet from '../../../public/images/my_wallet_icon.png'
// import nft from '../../../public/images/nft_icon.png'
// import setting from '../../../public/images/setting_icon.png'
// import trend from '../../../public/images/trend_icon.png'

function Footer():React.ReactElement {

    const footerIcon = {
        width : "18px",
        height: "18px",
        margin: "0 0 6px 0",
    }

    return (
      <footer>
          <div className = "bottom_menu-content">
            <div className = "exchange_div">
                <button className = "footer_select"><img src = {exchange_select} style={footerIcon}/>마켓</button>
            </div>
            <div>
                <button className = "my-wallet"><img src = {myWallet} style={footerIcon}/>내자산</button>
            </div>
            <div>
                <button className = "test"><img src = {news} style={footerIcon}/>뉴스</button>
            </div>
            <div>
                <button className = "test"><img src = {nft} style={footerIcon}/>NFT</button>
            </div>
            <div>
                <button className = "test2"><img src = {setting} style={footerIcon}/>내 정보</button>
            </div>
          </div>
      </footer>
    );
}

export default Footer;
