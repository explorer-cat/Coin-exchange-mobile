import '../../../../stylesheets/initialization.css'
import '../../../../stylesheets/palette.css'
import './DetailContent.css'
import './InvestmentInfo.css'
import '../DetailView.css'
import './CryptoInfo.css'
import '../DetailHeader.css'
import CategoryToggle from './ContentCategoryToggle'
import React, {useEffect, useState, useCallback} from 'react';
import {useLocation} from "react-router-dom";

interface CryptoInfoType {
    props : any,
}

function CryptoInfo({props}:CryptoInfoType): React.ReactElement {

    const [loading, setLoading] = useState(false)
    const [detailToggle, setDetailToggle] = useState(false)

    const location = useLocation().search
    let tradeCode = location.replace("?", "")


    const handleViewDetailInfo = () => {
        let target = document.querySelector(".cryptoContent > div");
        let viewBtn = document.querySelector(".detailMore");
        let toggleBtn = document.querySelector(".MuiTabs-root");

        if(target && viewBtn && toggleBtn) {
            target.classList.add("setDetailPage");
             toggleBtn.classList.add("display_none");

            setDetailToggle(true)
        }
    }

    const closeDetailView = () => {
        let target = document.querySelector(".cryptoContent > div");
        let toggleBtn = document.querySelector(".MuiTabs-root");

        if(target && toggleBtn) {
            target.classList.remove("setDetailPage");
            toggleBtn.classList.remove("display_none");
            setDetailToggle(false)
        }
    }
console.log("props",props)

    return (
        <>
            {detailToggle ?
                <div className = "detailMoreViewHeader">
                    <div className="backToHome">
                        <img className="arrow_back" onClick={closeDetailView}/>
                    </div>
                </div> : null}

        <div className = "InvestInfoArea">
            <div className = "content-title">
                자산 정보
            </div>
            <div className = "content-info investContent subTitle">
                <div className = "content-full">
                    <ul>
                        <li className = "subTitle">영문명</li>
                        <li className = "subTitle">{props.cryptoinfo.english_name}({props.cryptoinfo.symbol})</li>
                    </ul>
                    <ul>
                        <li className = "subTitle">최초발행</li>
                        <li className = "subTitle">{props.cryptoinfo.header_key_values.initial_release_at.value}</li>
                    </ul>
                    <ul>
                        <li className = "subTitle">시가총액</li>
                    </ul>
                    <div className = "categoryTable">
                        <div className ="categoryRow">
                            <div className = "subTitle">프로젝트팀 제공</div>
                            <div className = "subTitle">{props.cryptoinfo.market_data.project_team.market_cap === '' ? "제공안함" : `${props.cryptoinfo.market_data.project_team.market_cap}(${props.cryptoinfo.market_data.project_team.date})` } </div>
                        </div>
                        <div className ="categoryRow">
                            <div className = "subTitle">코인게코</div>
                            <div className = "subTitle">{props.cryptoinfo.market_data.coin_gecko.market_cap} ({props.cryptoinfo.market_data.coin_gecko.date})</div>
                        </div>
                        <div className ="categoryRow">
                            <div className = "subTitle">코인마켓캡</div>
                            <div className = "subTitle">{props.cryptoinfo.market_data.coin_market_cap.market_cap} ({props.cryptoinfo.market_data.coin_market_cap.date})</div>
                        </div>
                    </div>
                    {detailToggle ?
                        <>
                            <ul>
                                <li className = "subTitle">현재 유통량</li>
                            </ul>
                            <div className = "categoryTable">
                                <div className ="categoryRow">
                                    <div className = "subTitle">프로젝트팀 제공</div>
                                    <div className = "subTitle">{props.cryptoinfo.market_data.project_team.circulating_supply === '' ? "제공안함": `${props.cryptoinfo.market_data.project_team.circulating_supply}`}</div>
                                </div>
                                <div className ="categoryRow">
                                    <div className = "subTitle">코인게코</div>
                                    <div className = "subTitle">{props.cryptoinfo.market_data.coin_gecko.circulating_supply}</div>
                                </div>
                                <div className ="categoryRow">
                                    <div className = "subTitle">코인마켓캡</div>
                                    <div className = "subTitle">{props.cryptoinfo.market_data.coin_market_cap.circulating_supply}</div>
                                </div>
                            </div>
                        <ul>
                            <li className = "subTitle">블록 생성주기</li>
                            <li className = "subTitle">{props.cryptoinfo.header_key_values.block_creation_period.value  === '' ? '없음' : props.cryptoinfo.header_key_values.block_creation_period.value}</li>
                        </ul>
                        <ul>
                            <li className = "subTitle">프로토콜</li>
                            <li className = "subTitle">{props.cryptoinfo.header_key_values.protocol.value === '' ? '-' : props.cryptoinfo.header_key_values.protocol.value}</li>
                        </ul>
                        <ul>
                        <li className = "subTitle">총 발행량</li>
                        <li className = "subTitle">{props.cryptoinfo.header_key_values.total_mining_limit.value === '' ? '-': props.cryptoinfo.header_key_values.total_mining_limit.value}</li>
                        </ul>
                            <ul>
                                <li className = "subTitle">프로젝트 연락처</li>
                                <li className = "subTitle">{props.cryptoinfo.market_data.project_team.contact === '' ? '-' : props.cryptoinfo.market_data.project_team.contact}</li>
                            </ul>
                            <ul>
                                <li className = "subTitle">{props.cryptoinfo.main_components[0].detail.subtitle}</li>
                            </ul>
                        <div className = "categoryTable">
                            <div className ="mainComponent">
                                <div className = "subTitle">{props.cryptoinfo.main_components[0].detail.content}</div>
                             </div>
                        </div>
                            <ul>
                                <li className = "subTitle">{props.cryptoinfo.main_components[1].detail.subtitle}</li>
                            </ul>
                            <div className = "categoryTable">
                                <div className ="mainComponent">
                                    <div className = "subTitle">{props.cryptoinfo.main_components[1].detail.content}</div>
                                </div>
                            </div>
                            <ul>
                                <li className = "subTitle">{props.cryptoinfo.main_components[2].detail.subtitle}</li>
                            </ul>
                            <div className = "categoryTable">
                                <div className ="mainComponent">
                                    <div className = "subTitle">{props.cryptoinfo.main_components[2].detail.content}</div>
                                </div>
                            </div>
                        </> : null}
                </div>
            </div>
        </div>
            {!detailToggle ?  <div className = "detailMore" onClick={handleViewDetailInfo}>더보기</div> : null}
        </>
    );
}


export default CryptoInfo;

