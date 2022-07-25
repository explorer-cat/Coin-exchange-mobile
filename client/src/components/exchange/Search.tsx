import './Search.css';
import '../../stylesheets/initialization.css'

function Search() {
  return (
      <span className = "navBar_search-box">
        <div className = "search-icon"></div>
        <input className = "search-input-box" placeholder='코인명/심볼검색'>

        </input>
      </span>
  );
}

export default Search;
