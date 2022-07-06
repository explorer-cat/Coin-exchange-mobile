import './Exchange.css';
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, { useEffect } from 'react';




function Exchange():React.ReactElement {
    return (
      <main>
          <div className = "exchange-view">
            <table className = "exchange-publie-table">
                <thead>
                    <tr>
                        <th></th>
                        <th className ="title">가상자산명</th>
                        <th className ="price">현재가</th>
                        <th className ="percent">전일대비</th>
                        <th className ="tradecost">거래대금</th>
                        <th className ="premium">프리미엄</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className ="candle"></td>
                        <td className ="name">
                            <strong>비트코인</strong>
                            <p>BTC/KRW</p>
                        </td>
                        <td className ="price">23,201,000</td>
                        <td className ="percent">3.2%</td>
                        <td className ="tradecost">123,290만</td>
                        <td className ="premium">+0.32%</td>
                    </tr>
                </tbody>
         
            </table>
          </div>
      </main>
    );
}

export default Exchange;
