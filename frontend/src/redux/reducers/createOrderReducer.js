import { USER } from "../constants/user";

let initialState = {
  loading: false,
  error: "",
  data: "",
};

export const createOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER.CREATE_ORDER_REQUEST:
      return { ...state, loading: true };
    case USER.CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case USER.CREATE_ORDER_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
