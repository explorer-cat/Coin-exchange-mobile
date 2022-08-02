import './Search.css';
import '../../stylesheets/initialization.css'
import { Skeleton } from '@mui/material';

interface SearchType {
  loading : Boolean
}

function Search({loading}:SearchType) {
  if(loading) {
    return (
      <span className = "navBar_search-box">
        <div className = "search-icon"></div>
        <input className = "search-input-box" placeholder='코인명/심볼검색'>

        </input>
      </span>
  );
  } else {
    return (
      <span className = "navBar_search-box">
        <div className = "search-icon"></div>
        <input className = "search-input-box" placeholder='코인명/심볼검색'>

        </input>
      </span>
  );
  }
}

export default Search;
