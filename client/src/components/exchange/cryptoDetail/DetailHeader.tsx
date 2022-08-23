import './DetailHeader.css';
import '../../../stylesheets/initialization.css'
import '../../../stylesheets/palette.css'
import '../../../stylesheets/public.css'
import React, {useEffect} from 'react';
import {Link, Route, Routes, BrowserRouter, useNavigate, useLocation} from 'react-router-dom'

//Header 컴포넌트 메게변수 타입을 직접 선언합니다.
interface HeaderProps {

}

//뒤로가기 버튼


function DetailHeader() {
    const location = useLocation().search
    let tradeCode = location.replace("?", "")

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
    <header>
        <div className = "detailView_Header">
            <div className = "backToHome">
                <img className = "arrow_back" onClick = {handleGoBack}/>
            </div>

            <div className = "detailTitle">
                <span>{tradeCode}</span>
                {/*<span>tradeCode/KRW</span>*/}
            </div>

            <div className = "favoriteCrpyto">
                <img className="bookMark"/>
            </div>
        </div>
    </header>
  );
}

export default DetailHeader;
