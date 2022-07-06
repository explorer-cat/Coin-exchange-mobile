import './Footer.css';
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, { useEffect } from 'react';


function Footer():React.ReactElement {
    return (
      <footer>
          <div className = "bottom_menu-content">
              <button className = "exchange">거래소</button>
              <button className = "my-wallet">자산현황</button>
              <button className = "test">자산연동</button>
              <button className = "test1">프리미엄</button>
              <button className = "test2">더보기</button>
          </div>
      </footer>
    );
}

export default Footer;
