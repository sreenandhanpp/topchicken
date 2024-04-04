import { combineReducers } from "redux";
import { createOrderReducer } from "./reducers/createOrderReducer";
import { fetchOrderReducer } from "./reducers/fetchOrderReducer";
import { fetchAllOrdersReducer } from "./reducers/fetchAllOrderReducer";


export const rootReducers = combineReducers({
 createOrder : createOrderReducer,
 fetchOrder : fetchOrderReducer,
 fetchAllOrders: fetchAllOrdersReducer
});
