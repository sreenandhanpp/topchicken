import { combineReducers } from "redux";
import { createOrderReducer } from "./reducers/createOrderReducer";


export const rootReducers = combineReducers({
 createOrder : createOrderReducer
});
