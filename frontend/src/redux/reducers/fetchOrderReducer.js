import { USER } from "../constants/user";

let initialState = {
  loading: false,
  error: "",
  order: null,
};

export const fetchOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER.FETCH_ORDER_REQUEST:
      return { ...state, loading: true };
    case USER.FETCH_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case USER.FETCH_ORDER_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
