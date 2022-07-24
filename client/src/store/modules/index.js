import { combineReducers } from "redux";
import counter from "./counter";

// import한 리듀서 이름을 그대로 사용하는 경우
export default combineReducers({
  counter,
});
