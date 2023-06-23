import { combineReducers } from "redux";

import loginSlice from "../modules/form/login.slice"
export default combineReducers({
    login: loginSlice
})