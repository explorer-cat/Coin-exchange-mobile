import React, {useEffect, useState, useCallback, useMemo} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter ,Route, Routes} from 'react-router-dom';
import TradeView from './components/exchange/TradeView';
import {connectWS, requestData} from "./dataHandler/socket";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

console.log("load index!")



//소켓에 연결됐다면
/*        if(socket) {
            requestData(socket,(result:any) => {

                // changeValue(result)
            })
        }*/


root.render(<App />);


