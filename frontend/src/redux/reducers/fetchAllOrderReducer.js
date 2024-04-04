import { USER } from "../constants/user";

const initialState = {
  loading: false,
  error: "",
  orders: [],
};

export const fetchAllOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER.FETCH_ALL_ORDERS_REQUEST:
      return { ...state, loading: true };
    case USER.FETCH_ALL_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case USER.FETCH_ALL_ORDERS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
