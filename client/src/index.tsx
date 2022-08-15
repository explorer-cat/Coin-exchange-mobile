import React, {useEffect, useState, useCallback, useMemo} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter ,Route, Routes} from 'react-router-dom';
import TradeView from './components/exchange/TradeView';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

console.log("load index!")

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/react" element={<App />} />
      <Route path="/react/trade" element={<TradeView />} />
    </Routes>
  </BrowserRouter>
);


