import '../../../../stylesheets/initialization.css'
import '../../../../stylesheets/palette.css'
import './DetailContent.css'
import './InvestmentInfo.css'
import CategoryToggle from './ContentCategoryToggle'
import React, {useEffect, useState, useCallback} from 'react';


function InvestmentInfo(): React.ReactElement {
    const [loading, setLoading] = useState(false)


    return (
        <div className = "InvestInfoArea">
            <div className = "content-title">
                투자 정보
            </div>
            <div className = "content-info investContent">
                <div className = "content-full">
                    <ul>
                        <li className = "subTitle"> 1일 최고가</li>
                        <li> 27,034,300원</li>
                    </ul>
                    <ul>
                        <li className = "subTitle"> 52주 최고가</li>
                        <li> 85,200,730원<span>(2021.03.16)</span></li>
                    </ul>
                    <ul>
                        <li className = "subTitle"> 52주 최저가</li>
                        <li> 23,293,000원<span>(2022.01.22)</span></li>
                    </ul>
                    <ul>
                        <li className = "subTitle"> 24시간 거래대금</li>
                        <li> 20,123,293,000원</li>
                    </ul>
                </div>
                {/*<div className = "content-right">*/}
                {/*    <ul>*/}
                {/*        <li className = "subTitle"> 1일 최저가</li>*/}
                {/*        <li> 40,000원</li>*/}
                {/*    </ul>*/}
                {/*    <ul>*/}
                {/*        <li className = "subTitle"> 52주 최저가</li>*/}
                {/*        <li> 40,000원</li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}


export default InvestmentInfo;

