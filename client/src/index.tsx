import React, {useEffect, useState, useCallback, useMemo} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

console.log("load index!")



//소켓에 연결됐다면
/*        if(socket) {
            requestData(socket,(result:any) => {

                // changeValue(result)
            })
        }*/


root.render(<App />);


