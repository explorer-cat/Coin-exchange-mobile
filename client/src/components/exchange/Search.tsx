import './Search.css';
import '../../stylesheets/initialization.css'
import { Skeleton } from '@mui/material';
import React, {useEffect, useState} from 'react';

interface SearchType {
    inputValue : any,
}

function Search({inputValue} : SearchType) {

    const handleKeyPress = (e:any) => {
        inputValue("zz")
    }


  // if(!coinList) {
  //   return (
  //     <span className = "navBar_search-box">
  //       <div className = "publicInput">
  //       <Skeleton sx={{bgcolor: "rgba(255, 255, 255, 0.13)",width : "250px",height : "60px"}}/>
  //       {/* <input className = "search-input-box" placeholder='코인명/심볼검색'/> */}
  //       </div>
  //     </span>
  // );
  // } else {
    return (
      <span className = "navBar_search-box">
        <div className = "publicInput">
          <div className = "search-icon"></div>
          <input className = "search-input-box" onChange={handleKeyPress}  placeholder='코인명/심볼검색'/>
        </div>
      </span>
  );
  // }
}

export default Search;
