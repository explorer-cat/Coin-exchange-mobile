import './MarketCategory.css';
import './Header.css'
import Search from './Search'
import React from 'react';
import {useState} from 'react'
import { tab } from '@testing-library/user-event/dist/tab';
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../store/modules/counter";

//Header 컴포넌트 메게변수 타입을 직접 선언합니다.
interface MarketCategoryType {
    viewType : Number,
    name : String
}

function MarketCategory() {
    const [exchangeView, setExchangeView] = useState(true);
    const [issueView, setIssueView] = useState(false);
    const [premiumView, setPremiumView] = useState(false);

    const dispatch = useDispatch();
    const count = useSelector((state:any) => state.counter.number);

    

    const handleClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    
        const target: any = event.currentTarget.classList.value;

        console.log("target", target)
        //setClickedButton(button.name);
        switch(target) {
            case "exchange":
                    dispatch(increment())
                  //  setExchangeView(true)
                break;
            case "issue":
                    dispatch(increment())
                // !issueView ? setIssueView(true) : null
                break;
        }
      };

    const category = ["시세", "이슈", "김프", "트렌드", "선물"]
    const categoryKey = ["exchange", "issue", "premium", "trend", "ddd"]
    let tabCount = 0;

    const categoryList = category.map((menu) => {
        if(menu === "시세") {
            return(<span onClick={handleClickCategory} className={categoryKey[tabCount]}><strong className = "select" >{count}</strong></span>)
        }
        tabCount ++;
        return(<span onClick={handleClickCategory} className={categoryKey[tabCount]}><strong>{menu}</strong></span>)
    });

  return (
        <div className = "market-category-div">
            {categoryList}
        </div>
  );
}

export default MarketCategory;
